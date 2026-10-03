const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const { randomUUID } = require('node:crypto');
const fs = require('node:fs/promises');
const net = require('node:net');
const path = require('node:path');
const { spawn, execFile } = require('node:child_process');
const os = require('node:os');
const { detectTarget, checkTargets, queryServiceStates } = require('./service-monitor');

const powershellPath = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');

let mainWindow = null;
let configPath = '';
let configDirectory = '';
let runnerScriptPath = '';

const buttonStates = new Map();
const processes = new Map();
const busyButtons = new Set();
const serviceStates = new Map();
let windowsServiceStates = {};
const busyWindowsServices = new Set();

const SERVICE_POLL_INTERVAL = 5000;
let servicePollTimer = null;
let serviceRefreshRunning = false;
let serviceRefreshQueued = false;
let windowsRefreshRunning = false;
let windowsRefreshQueued = false;

const defaultConfig = () => ({
  version: 1,
  settings: {
    accent: '#7c5cff',
    darkMode: true
  },
  buttons: [],
  groups: [],
  services: []
});

// Nomes de servico do Windows: letras, numeros e alguns simbolos; nunca aspas ou separadores de comando.
const isServiceName = (value) => typeof value === 'string' && /^[\w .@$+()#-]{1,256}$/.test(value);

const normalizeServices = (value) => {
  const seen = new Set();
  return (Array.isArray(value) ? value : []).flatMap((item) => {
    const name = typeof item?.name === 'string' ? item.name.trim() : '';
    if (!isServiceName(name) || seen.has(name.toLowerCase())) return [];
    seen.add(name.toLowerCase());
    return [{ name, displayName: typeof item.displayName === 'string' && item.displayName.trim() ? item.displayName.trim() : name }];
  });
};

const isHexColor = (value) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);

const normalizeButton = (button, index) => {
  const source = button && typeof button === 'object' ? button : {};
  const dualAction = source.dualAction === undefined
    ? source.type === 'toggle'
    : source.dualAction === true;
  const type = dualAction ? 'toggle' : 'single';
  return {
    id: typeof source.id === 'string' && source.id.trim() ? source.id : `button-${index}-${randomUUID()}`,
    alias: typeof source.alias === 'string' ? source.alias : '',
    description: typeof source.description === 'string' ? source.description : '',
    type,
    dualAction,
    admin: source.admin === true,
    showPrompt: source.showPrompt !== false,
    background: source.background === true,
    icon: typeof source.icon === 'string' && source.icon.trim() ? source.icon : 'bolt',
    color: isHexColor(source.color) ? source.color : '#7c5cff',
    startScript: typeof source.startScript === 'string' ? source.startScript : '',
    stopScript: dualAction && typeof source.stopScript === 'string' ? source.stopScript : '',
    groups: Array.isArray(source.groups) ? [...new Set(source.groups.filter((id) => typeof id === 'string' && id.trim()))] : []
  };
};

const normalizeGroups = (value) => {
  const seen = new Set();
  return (Array.isArray(value) ? value : []).flatMap((item, index) => {
    const source = item && typeof item === 'object' ? item : {};
    let id = typeof source.id === 'string' && source.id.trim() ? source.id : `group-${index}-${randomUUID()}`;
    while (seen.has(id)) id = `${id}-${randomUUID().slice(0, 8)}`;
    seen.add(id);
    return [{
      id,
      name: typeof source.name === 'string' ? source.name : '',
      description: typeof source.description === 'string' ? source.description : '',
      icon: typeof source.icon === 'string' && source.icon.trim() ? source.icon : 'layers',
      color: isHexColor(source.color) ? source.color : '#7c5cff'
    }];
  });
};

const normalizeConfig = (value) => {
  const source = value && typeof value === 'object' ? value : {};
  const sourceSettings = source.settings && typeof source.settings === 'object' ? source.settings : {};
  const seenIds = new Set();
  const buttons = (Array.isArray(source.buttons) ? source.buttons : []).map((button, index) => {
    const normalized = normalizeButton(button, index);
    while (seenIds.has(normalized.id)) {
      normalized.id = `${normalized.id}-${randomUUID().slice(0, 8)}`;
    }
    seenIds.add(normalized.id);
    return normalized;
  });
  const groups = normalizeGroups(source.groups);
  // Descarta vinculos com grupos que nao existem mais.
  const groupIds = new Set(groups.map((group) => group.id));
  for (const button of buttons) {
    button.groups = button.groups.filter((id) => groupIds.has(id));
  }
  return {
    version: 1,
    settings: {
      accent: isHexColor(sourceSettings.accent) ? sourceSettings.accent : '#7c5cff',
      darkMode: sourceSettings.darkMode !== false
    },
    buttons,
    groups,
    services: normalizeServices(source.services)
  };
};

const executingAction = (id) => {
  const context = processes.get(id);
  return context && !context.finished ? context.action : '';
};

const setButtonState = (id, status, action = '', message = '', runId = '') => {
  buttonStates.set(id, { id, status, action, message, runId });
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('button:status', {
      id,
      status,
      action,
      message,
      runId,
      executing: executingAction(id),
      at: Date.now()
    });
  }
};

const serializeServiceStates = () => Object.fromEntries(serviceStates);

const readConfigFile = async () => normalizeConfig(JSON.parse(await fs.readFile(configPath, 'utf8')));

// Estado dos servicos do Windows escolhidos no card "Servicos". Ciclo proprio para nao esperar as
// verificacoes dos botoes, que podem ser lentas.
const refreshWindowsServiceStates = async () => {
  if (windowsRefreshRunning) {
    windowsRefreshQueued = true;
    return;
  }
  windowsRefreshRunning = true;
  try {
    const config = await readConfigFile().catch(() => null);
    if (!config) return;
    const next = await queryServiceStates(config.services.map((service) => service.name));
    if (JSON.stringify(next) === JSON.stringify(windowsServiceStates)) return;
    windowsServiceStates = next;
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('winservice:status', windowsServiceStates);
    }
  } finally {
    windowsRefreshRunning = false;
    if (windowsRefreshQueued) {
      windowsRefreshQueued = false;
      refreshWindowsServiceStates();
    }
  }
};

// Detecta pelo conteudo dos BATs qual servico cada botao de dupla acao controla e verifica se esta ligado.
const refreshServiceStates = async () => {
  refreshWindowsServiceStates();
  if (serviceRefreshRunning) {
    serviceRefreshQueued = true;
    return;
  }
  serviceRefreshRunning = true;
  try {
    let config;
    try {
      config = await readConfigFile();
    } catch {
      return;
    }
    const detected = [];
    for (const button of config.buttons) {
      if (!button.dualAction) continue;
      const target = await detectTarget(resolveScriptPath(button.startScript.trim()), resolveScriptPath(button.stopScript.trim()));
      if (target) detected.push({ id: button.id, target });
    }
    const runningOf = await checkTargets(detected.map((item) => item.target));
    const next = new Map(detected.map(({ id, target }) => [id, { kind: target.kind, label: target.label, running: runningOf(target) }]));
    const changed = next.size !== serviceStates.size
      || [...next].some(([id, value]) => JSON.stringify(serviceStates.get(id)) !== JSON.stringify(value));
    if (!changed) return;
    serviceStates.clear();
    for (const [id, value] of next) serviceStates.set(id, value);
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('service:status', serializeServiceStates());
    }
  } finally {
    serviceRefreshRunning = false;
    if (serviceRefreshQueued) {
      serviceRefreshQueued = false;
      refreshServiceStates();
    }
  }
};

const startServiceMonitor = () => {
  if (servicePollTimer) return;
  refreshServiceStates();
  servicePollTimer = setInterval(refreshServiceStates, SERVICE_POLL_INTERVAL);
};

const sendScriptOutput = (id, action, stream, text, runId) => {
  if (!text) return;
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('button:output', {
      id,
      action,
      stream,
      text: String(text),
      runId,
      at: Date.now()
    });
  }
};

const quotePowerShell = (value) => `'${String(value).replace(/'/g, "''")}'`;

const initializeRunner = async () => {
  if (runnerScriptPath) return;
  const sourcePath = path.join(__dirname, 'script-runner.ps1');
  const temporaryDirectory = app.getPath('temp');
  await fs.mkdir(temporaryDirectory, { recursive: true });
  runnerScriptPath = path.join(temporaryDirectory, `bat-launcher-runner-${randomUUID()}.ps1`);
  const source = await fs.readFile(sourcePath, 'utf8');
  await fs.writeFile(runnerScriptPath, source, 'utf8');
};

const resolveScriptPath = (scriptPath) => path.isAbsolute(scriptPath)
  ? scriptPath
  : path.resolve(configDirectory, scriptPath);

const validateScriptPath = async (scriptPath) => {
  if (!scriptPath || !scriptPath.trim()) {
    throw new Error('Selecione um arquivo BAT.');
  }
  const resolvedPath = resolveScriptPath(scriptPath.trim());
  if (path.extname(resolvedPath).toLowerCase() !== '.bat') {
    throw new Error('O arquivo selecionado precisa ter a extensão .bat.');
  }
  try {
    const stats = await fs.stat(resolvedPath);
    if (!stats.isFile()) {
      throw new Error('O caminho selecionado não é um arquivo.');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Arquivo BAT não encontrado: ${resolvedPath}`);
    }
    throw error;
  }
  return resolvedPath;
};

const completeScript = (context, code, signal, error) => {
  const { id, action, type, runId } = context;
  if (context.finished) {
    return;
  }
  context.finished = true;
  if (context.elevationTimer) {
    clearTimeout(context.elevationTimer);
  }
  if (processes.get(id) === context) {
    processes.delete(id);
  }
  const currentState = buttonStates.get(id);
  const isCurrentAction = currentState?.action === action;
  const isCurrentRun = currentState?.runId === runId;
  const cancelled = context.cancelled === true;
  if (cancelled) {
    sendScriptOutput(id, action, 'system', '\n[PROCESSO] Interrompido pelo usuário.\n', runId);
  } else if (error) {
    sendScriptOutput(id, action, 'stderr', `\n[ERRO] ${error.message}\n`, runId);
  } else {
    const exitCode = code ?? (signal || 'indisponível');
    sendScriptOutput(id, action, 'system', `\n[PROCESSO] Encerrado com código ${exitCode}.\n`, runId);
  }
  if (cancelled) {
    if (isCurrentRun && action === 'stop' && context.previousState && ['starting', 'running'].includes(context.previousState.status)) {
      setButtonState(id, context.previousState.status, 'start', 'Encerramento interrompido.', context.previousState.runId);
    } else if (isCurrentRun) {
      setButtonState(id, 'idle', action, 'Processo interrompido.', runId);
    }
  } else if (error) {
    if (action === 'stop' && isCurrentRun && currentState?.status === 'stopping') {
      setButtonState(id, 'running', 'start', error.message, runId);
    } else if ((isCurrentAction && isCurrentRun) || !currentState) {
      setButtonState(id, 'error', action, error.message, runId);
    }
  } else if (action === 'stop') {
    if (isCurrentRun && currentState?.status === 'stopping') {
      setButtonState(id, 'idle', 'stop', '', runId);
    }
  } else if (type === 'toggle') {
    if (isCurrentAction && isCurrentRun && ['starting', 'running'].includes(currentState?.status)) {
      if (code === 0) {
        setButtonState(id, 'running', 'start', '', runId);
      } else {
        const suffix = signal ? ` (${signal})` : '';
        setButtonState(id, 'error', action, `O script encerrou com código ${code ?? 'desconhecido'}${suffix}.`, runId);
      }
    }
  } else if (isCurrentAction && isCurrentRun) {
    if (code === 0) {
      setButtonState(id, 'idle', action, 'Ação concluída.', runId);
    } else {
      const suffix = signal ? ` (${signal})` : '';
      setButtonState(id, 'error', action, `O script encerrou com código ${code ?? 'desconhecido'}${suffix}.`, runId);
    }
  }
  if (context.server) {
    try {
      context.server.close();
    } catch {
      
    }
  }
  if (context.socket) {
    try {
      context.socket.end();
      context.socket.destroy();
    } catch {
      
    }
  }
  if (context.child?.stdin && !context.child.stdin.destroyed) {
    try {
      context.child.stdin.end();
    } catch {
      
    }
  }
  if ((error || cancelled) && context.outer && context.outer.exitCode === null) {
    try {
      context.outer.kill();
    } catch {

    }
  }
  setTimeout(refreshServiceStates, 300);
};

const forwardProcessOutput = (context, stream) => (chunk) => {
  const text = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
  sendScriptOutput(context.id, context.action, stream, text, context.runId);
};

const launchDirectScript = (id, scriptPath, action, type, runId = randomUUID()) => {
  const resolvedPath = resolveScriptPath(scriptPath.trim());
  const command = `chcp 65001 >nul & call "${resolvedPath}"`;
  const child = spawn('cmd.exe', ['/d', '/s', '/c', command], {
    cwd: path.dirname(resolvedPath),
    windowsHide: true,
    windowsVerbatimArguments: true,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  const context = { id, action, type, runId, child, finished: false, cancelled: false, previousState: null };
  processes.set(id, context);
  const actionLabel = action === 'stop' ? 'Encerrando' : 'Executando';
  sendScriptOutput(id, action, 'system', `\n> ${actionLabel}: ${resolvedPath}\n`, runId);
  child.stdout?.on('data', forwardProcessOutput(context, 'stdout'));
  child.stderr?.on('data', forwardProcessOutput(context, 'stderr'));
  child.stdin?.on('error', (error) => completeScript(context, null, null, error));
  child.once('error', (error) => completeScript(context, null, null, error));
  child.once('close', (code, signal) => completeScript(context, code, signal));
  return context;
};

const launchElevatedScript = (id, scriptPath, action, type, runId = randomUUID()) => {
  if (!runnerScriptPath) {
    throw new Error('O executor de scripts não foi inicializado.');
  }
  const resolvedPath = resolveScriptPath(scriptPath.trim());
  const pipeName = `bat-launcher-${runId.replace(/-/g, '')}`;
  const pipePath = `\\\\.\\pipe\\${pipeName}`;
  const context = {
    id,
    action,
    type,
    runId,
    finished: false,
    cancelled: false,
    previousState: null,
    server: null,
    socket: null,
    outer: null,
    inputQueue: [],
    outerError: '',
    authToken: randomUUID(),
    authenticated: false,
    pendingCancel: false,
    waitsForElevation: true,
    runnerConnected: false,
    runnerCompleted: false
  };
  processes.set(id, context);
  const actionLabel = action === 'stop' ? 'Encerrando' : 'Executando';
  sendScriptOutput(id, action, 'system', `\n> ${actionLabel}: ${resolvedPath}\n`, runId);
  sendScriptOutput(id, action, 'system', '\n> Solicitando permissões de administrador...\n', runId);

  const handleMessage = (message) => {
    if (!message || typeof message !== 'object') return;
    const text = typeof message.text === 'string' ? message.text : '';
    if (!context.authenticated) {
      if (message.type !== 'auth' || text !== context.authToken) {
        context.socket?.destroy();
        completeScript(context, null, null, new Error('Falha na autenticação do executor elevado.'));
        return;
      }
      context.authenticated = true;
      if (context.pendingCancel) {
        context.pendingCancel = false;
        try {
          context.socket.write(`${JSON.stringify({ type: 'cancel' })}\n`, 'utf8');
        } catch {
          
        }
      }
      return;
    }
    if (message.type === 'ready') {
      const currentState = buttonStates.get(id);
      if (action === 'start' && currentState?.status === 'starting') {
        setButtonState(id, 'running', 'start', '', runId);
      }
      sendScriptOutput(id, action, 'system', '\n> Permissão administrativa concedida.\n', runId);
      return;
    }
    if (message.type === 'stdout' || message.type === 'stderr') {
      sendScriptOutput(id, action, message.type, text, runId);
      return;
    }
    if (message.type === 'exit') {
      const code = Number.parseInt(text, 10);
      context.runnerCompleted = true;
      completeScript(context, Number.isNaN(code) ? null : code);
      return;
    }
    if (message.type === 'error') {
      completeScript(context, null, null, new Error(text || 'O processo elevado falhou.'));
    }
  };

  const server = net.createServer((socket) => {
    if (context.socket || context.finished) {
      socket.destroy();
      return;
    }
    context.socket = socket;
    context.runnerConnected = true;
    socket.setEncoding('utf8');
    let buffer = '';
    const flushQueuedInput = () => {
      if (!context.authenticated || context.finished || !context.socket || context.socket.destroyed) return;
      for (const queuedInput of context.inputQueue.splice(0)) {
        try {
          context.socket.write(`${JSON.stringify({ type: 'input', text: queuedInput })}\n`, 'utf8');
        } catch (error) {
          completeScript(context, null, null, error);
          return;
        }
      }
    };
    socket.on('data', (chunk) => {
      if (context.finished) return;
      buffer += chunk;
      if (buffer.length > 1024 * 1024) {
        completeScript(context, null, null, new Error('Resposta do executor excedeu o limite.'));
        return;
      }
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (!line) continue;
        try {
          handleMessage(JSON.parse(line));
        } catch {
          sendScriptOutput(id, action, 'stderr', `\n[ERRO] Resposta inválida do executor: ${line}\n`, runId);
        }
      }
      flushQueuedInput();
    });
    socket.on('error', (error) => completeScript(context, null, null, error));
    socket.on('close', () => {
      if (!context.finished && !context.runnerCompleted) {
        completeScript(context, null, null, new Error('O executor elevado encerrou a conexão antes de concluir.'));
      }
    });
  });
  context.server = server;
  server.on('error', (error) => completeScript(context, null, null, error));
  server.listen({ path: pipePath, readableAll: true, writableAll: true }, () => {
    if (context.finished) return;
    const outerScript = [
      "$ErrorActionPreference = 'Stop'",
      "$ProgressPreference = 'SilentlyContinue'",
      `$env:BAT_LAUNCHER_PIPE = ${quotePowerShell(pipeName)}`,
      `$env:BAT_LAUNCHER_SCRIPT = ${quotePowerShell(resolvedPath)}`,
      `$env:BAT_LAUNCHER_CWD = ${quotePowerShell(path.dirname(resolvedPath))}`,
      `$env:BAT_LAUNCHER_TOKEN = ${quotePowerShell(context.authToken)}`,
      `$helper = ${quotePowerShell(runnerScriptPath)}`,
      // O processo elevado nao herda o ambiente do wrapper, entao os dados viajam por argumento.
      '$arguments = \'-NoLogo -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "\' + $helper + \'" -PipeName "\' + $env:BAT_LAUNCHER_PIPE + \'" -Script "\' + $env:BAT_LAUNCHER_SCRIPT + \'" -Cwd "\' + $env:BAT_LAUNCHER_CWD + \'" -Token "\' + $env:BAT_LAUNCHER_TOKEN + \'"\'',
      '$process = $null',
      'try { $process = Start-Process -FilePath "$env:SystemRoot\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -ArgumentList $arguments -Verb RunAs -WindowStyle Hidden -PassThru -Wait -ErrorAction Stop } catch { Write-Output ("ERRO_ELEVACAO: " + $_.Exception.Message); exit 1 }',
      'exit $process.ExitCode'
    ].join('; ');
    const encodedScript = Buffer.from(outerScript, 'utf16le').toString('base64');
    const outer = spawn(powershellPath, ['-NoLogo', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', encodedScript], {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    context.outer = outer;
    outer.stdout?.on('data', (chunk) => {
      context.outerError += Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
    });
    outer.stderr?.on('data', (chunk) => {
      context.outerError += Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
    });
    outer.once('error', (error) => completeScript(context, null, null, error));
    outer.once('close', (code) => {
      if (context.finished || context.runnerConnected) return;
      const rawDetail = context.outerError.trim();
      const elevationDetail = rawDetail.includes('ERRO_ELEVACAO: ')
        ? rawDetail.slice(rawDetail.indexOf('ERRO_ELEVACAO: ') + 'ERRO_ELEVACAO: '.length).split(/\r?\n/)[0].trim()
        : '';
      const detail = rawDetail.includes('<Objs') ? '' : rawDetail;
      const reason = elevationDetail || detail;
      completeScript(context, null, null, new Error(reason || `Não foi possível iniciar o processo elevado${code ? ` (código ${code})` : ''}. Verifique a solicitação de administrador.`));
    });
  });
  context.elevationTimer = setTimeout(() => {
    completeScript(context, null, null, new Error('Tempo limite aguardando a permissão de administrador.'));
  }, 60000);
  return context;
};

const sendScriptInput = (id, text) => {
  const context = processes.get(id);
  if (!context || context.finished) {
    throw new Error('A execução não está mais ativa.');
  }
  const normalizedText = String(text ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').slice(0, 32768);
  if (context.inputQueue && !context.authenticated) {
    context.inputQueue.push(normalizedText);
    return { ok: true, queued: true };
  }
  if (context.socket && !context.socket.destroyed) {
    try {
      context.socket.write(`${JSON.stringify({ type: 'input', text: normalizedText })}\n`, 'utf8');
      return { ok: true };
    } catch {
      throw new Error('Não foi possível enviar a entrada para o executor.');
    }
  }
  if (context.child?.stdin && !context.child.stdin.destroyed) {
    try {
      context.child.stdin.write(`${normalizedText}\n`, 'utf8');
      return { ok: true };
    } catch {
      throw new Error('Não foi possível enviar a entrada para o processo.');
    }
  }
  if (context.inputQueue) {
    context.inputQueue.push(normalizedText);
    return { ok: true, queued: true };
  }
  throw new Error('O processo ainda não está pronto para receber entrada.');
};

const killProcessTree = (child) => {
  if (!child || child.exitCode !== null || !child.pid) {
    return;
  }
  if (process.platform === 'win32') {
    try {
      const killer = spawn('taskkill.exe', ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true, stdio: 'ignore' });
      killer.on('error', () => {
        try {
          child.kill();
        } catch {
          
        }
      });
      return;
    } catch {
      
    }
  }
  try {
    child.kill();
  } catch {
    
  }
};

const waitForRunnerExit = (context, timeout) => new Promise((resolve) => {
  if (context.runnerCompleted || context.finished) {
    resolve(true);
    return;
  }
  let poll = null;
  const timer = setTimeout(() => {
    if (poll) clearInterval(poll);
    resolve(context.runnerCompleted === true || context.finished === true);
  }, timeout);
  poll = setInterval(() => {
    if (!context.runnerCompleted && !context.finished) return;
    clearInterval(poll);
    clearTimeout(timer);
    resolve(true);
  }, 50);
});

const requestRunnerCancel = (context) => new Promise((resolve) => {
  if (!context.inputQueue || !context.socket || context.socket.destroyed) {
    resolve();
    return;
  }
  if (!context.authenticated) {
    context.pendingCancel = true;
    resolve();
    return;
  }
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    resolve();
  };
  try {
    context.socket.write(`${JSON.stringify({ type: 'cancel' })}\n`, 'utf8', finish);
  } catch {
    finish();
  }
  setTimeout(finish, 300);
});

const interruptScript = async (id) => {
  const context = processes.get(id);
  if (!context || context.finished) {
    const currentState = buttonStates.get(id);
    if (currentState && ['running', 'starting', 'stopping'].includes(currentState.status)) {
      setButtonState(id, 'idle', currentState.action === 'stop' ? 'start' : currentState.action, 'Processo interrompido.', currentState.runId);
    }
    return { ok: true, interrupted: false };
  }
  context.cancelled = true;
  await requestRunnerCancel(context);
  let runnerStopped = true;
  if (context.waitsForElevation && context.authenticated) {
    runnerStopped = await waitForRunnerExit(context, 8000);
  }
  killProcessTree(context.child);
  if (!runnerStopped && context.outer && context.outer.exitCode === null) {
    try {
      context.outer.kill();
    } catch {
      
    }
  }
  completeScript(context, null, 'interrompido');
  return { ok: true, interrupted: true };
};

const launchScript = (id, scriptPath, action, type, admin, runId = randomUUID(), previousState = null) => {
  const context = process.platform === 'win32' && admin
    ? launchElevatedScript(id, scriptPath, action, type, runId)
    : launchDirectScript(id, scriptPath, action, type, runId);
  context.previousState = previousState;
  return context;
};

const saveConfig = async (value) => {
  const config = normalizeConfig(value);
  if (!Array.isArray(value?.buttons)) {
    throw new Error('A lista de comandos é inválida.');
  }
  for (const button of config.buttons) {
    if (!button.alias.trim()) {
      throw new Error('Informe um alias para todos os comandos.');
    }
    if (!button.startScript.trim()) {
      throw new Error(`Informe o arquivo de inicialização para “${button.alias}”.`);
    }
    if (button.dualAction && !button.stopScript.trim()) {
      throw new Error(`Informe o arquivo de encerramento para “${button.alias}”.`);
    }
  }
  for (const group of config.groups) {
    if (!group.name.trim()) {
      throw new Error('Informe um nome para todos os grupos.');
    }
  }
  await fs.mkdir(configDirectory, { recursive: true });
  const temporaryPath = `${configPath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  try {
    await fs.rename(temporaryPath, configPath);
  } catch {
    await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
    await fs.rm(temporaryPath, { force: true });
  }
  return { config, configPath };
};

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#0b0c12',
    title: 'Bat Launcher',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  await mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
};

ipcMain.handle('config:load', async () => {
  try {
    const raw = await fs.readFile(configPath, 'utf8');
    return { config: normalizeConfig(JSON.parse(raw)), configPath, warning: '' };
  } catch (error) {
    if (error.code === 'ENOENT') {
      const config = defaultConfig();
      await fs.mkdir(configDirectory, { recursive: true });
      await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
      return { config, configPath, warning: '' };
    }
    const config = defaultConfig();
    return {
      config,
      configPath,
      warning: `Não foi possível ler ${configPath}. Verifique se o JSON é válido.`
    };
  }
});

ipcMain.handle('config:save', async (_event, value) => {
  const result = await saveConfig(value);
  refreshServiceStates();
  return result;
});

ipcMain.handle('service:list', () => serializeServiceStates());

const runPowerShell = (script, timeout = 30000) => new Promise((resolve) => {
  const encoded = Buffer.from(script, 'utf16le').toString('base64');
  execFile(powershellPath, ['-NoLogo', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', encoded], {
    windowsHide: true,
    timeout,
    maxBuffer: 16 * 1024 * 1024,
    encoding: 'utf8'
  }, (error, stdout, stderr) => resolve({ code: error ? (typeof error.code === 'number' ? error.code : -1) : 0, stdout: String(stdout || ''), stderr: String(stderr || '') }));
});

ipcMain.handle('winservice:catalog', async () => {
  const result = await runPowerShell([
    '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8',
    'Get-CimInstance -ClassName Win32_Service | Select-Object Name, DisplayName, Description, State, StartMode | ConvertTo-Json -Compress'
  ].join('; '), 60000);
  if (result.code !== 0) {
    throw new Error('Não foi possível listar os serviços do Windows.');
  }
  const parsed = JSON.parse(result.stdout.trim() || '[]');
  return (Array.isArray(parsed) ? parsed : [parsed])
    .filter((item) => isServiceName(item?.Name))
    .map((item) => ({
      name: item.Name,
      displayName: item.DisplayName || item.Name,
      description: item.Description || '',
      state: String(item.State || '').toLowerCase(),
      startMode: String(item.StartMode || '')
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
});

ipcMain.handle('winservice:states', () => windowsServiceStates);

// Liga ou desliga um servico do Windows. Exige administrador, entao cada acao passa pelo UAC.
ipcMain.handle('winservice:control', async (_event, name, action) => {
  if (!isServiceName(name) || !['start', 'stop'].includes(action)) {
    throw new Error('Serviço ou ação inválida.');
  }
  const config = await readConfigFile();
  if (!config.services.some((service) => service.name === name)) {
    throw new Error('Este serviço não está na sua lista.');
  }
  if (busyWindowsServices.has(name)) {
    return { ok: true, busy: true };
  }
  busyWindowsServices.add(name);
  const errorFile = path.join(os.tmpdir(), `bat-launcher-service-${randomUUID()}.txt`);
  const command = action === 'start'
    ? `Start-Service -Name ${quotePowerShell(name)} -ErrorAction Stop; (Get-Service -Name ${quotePowerShell(name)}).WaitForStatus('Running', '00:00:30')`
    : `Stop-Service -Name ${quotePowerShell(name)} -Force -ErrorAction Stop; (Get-Service -Name ${quotePowerShell(name)}).WaitForStatus('Stopped', '00:00:30')`;
  const elevated = `try { ${command}; exit 0 } catch { [System.IO.File]::WriteAllText(${quotePowerShell(errorFile)}, $_.Exception.Message); exit 1 }`;
  const elevatedEncoded = Buffer.from(elevated, 'utf16le').toString('base64');
  try {
    const result = await runPowerShell([
      "$ErrorActionPreference = 'Stop'",
      `try { $process = Start-Process -FilePath "$env:SystemRoot\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -ArgumentList '-NoLogo','-NoProfile','-NonInteractive','-EncodedCommand','${elevatedEncoded}' -Verb RunAs -WindowStyle Hidden -Wait -PassThru } catch { exit 1223 }`,
      'exit $process.ExitCode'
    ].join('; '), 90000);
    if (result.code === 1223) {
      throw new Error('A permissão de administrador foi negada.');
    }
    if (result.code !== 0) {
      const detail = await fs.readFile(errorFile, 'utf8').catch(() => '');
      throw new Error(detail.trim() || `Não foi possível ${action === 'start' ? 'iniciar' : 'parar'} o serviço.`);
    }
    return { ok: true };
  } finally {
    busyWindowsServices.delete(name);
    fs.rm(errorFile, { force: true }).catch(() => {});
    refreshServiceStates();
  }
});

ipcMain.handle('file:select-bat', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Selecionar arquivo BAT',
    properties: ['openFile'],
    filters: [
      { name: 'Arquivos BAT', extensions: ['bat'] },
      { name: 'Todos os arquivos', extensions: ['*'] }
    ]
  });
  return result.canceled ? null : result.filePaths[0] ?? null;
});

ipcMain.handle('button:invoke', async (_event, id, requestedAction = '') => {
  const raw = await fs.readFile(configPath, 'utf8');
  const config = normalizeConfig(JSON.parse(raw));
  const button = config.buttons.find((item) => item.id === id);
  if (!button) {
    throw new Error('Comando não encontrado.');
  }
  if (busyButtons.has(id)) {
    return { ok: true, action: 'busy' };
  }

  const state = buttonStates.get(id);
  const active = ['running', 'starting', 'stopping'].includes(state?.status);
  const requested = typeof requestedAction === 'string' ? requestedAction : '';
  let action;
  if (button.dualAction) {
    const service = serviceStates.get(id);
    const isOn = typeof service?.running === 'boolean' ? service.running : active;
    if (requested === 'stop') {
      action = 'stop';
    } else if (requested === 'start') {
      action = 'start';
    } else {
      action = isOn ? 'stop' : 'start';
    }
    // Os dois lados ficam livres; so evita disparar o mesmo script enquanto ele ainda executa.
    if (['starting', 'stopping'].includes(state?.status) || executingAction(id) === action) {
      return { ok: true, action: 'busy' };
    }
  } else {
    if (requested === 'stop') {
      throw new Error('Este comando não possui ação de encerramento.');
    }
    if (active) {
      return { ok: true, action: 'busy' };
    }
    action = 'start';
  }

  const previousState = state ? { ...state } : null;
  const scriptPath = action === 'stop' ? button.stopScript : button.startScript;
  const runId = randomUUID();
  busyButtons.add(id);

  try {
    await validateScriptPath(scriptPath);
    setButtonState(id, action === 'stop' ? 'stopping' : 'starting', action, '', runId);
    const context = launchScript(id, scriptPath, action, button.dualAction ? 'toggle' : 'single', button.admin, runId, previousState);
    const currentState = buttonStates.get(id);
    if (action === 'start' && !context.waitsForElevation && currentState?.runId === runId && currentState.status === 'starting') {
      setButtonState(id, 'running', 'start', '', runId);
    }
    return { ok: true, action };
  } catch (error) {
    if (action === 'stop' && previousState && ['starting', 'running'].includes(previousState.status)) {
      setButtonState(id, previousState.status, 'start', error.message, previousState.runId);
    } else {
      setButtonState(id, 'error', action, error.message, runId);
    }
    throw error;
  } finally {
    busyButtons.delete(id);
  }
});

ipcMain.handle('button:kill', (_event, id) => interruptScript(id));

ipcMain.handle('button:input', (_event, id, text) => {
  if (typeof text !== 'string') {
    throw new Error('Entrada inválida.');
  }
  return sendScriptInput(id, text);
});

ipcMain.handle('app:open-data-folder', async () => shell.openPath(configDirectory));

app.whenReady().then(async () => {
  configDirectory = app.isPackaged ? app.getPath('userData') : path.join(__dirname, 'data');
  configPath = path.join(configDirectory, 'buttons.json');
  await initializeRunner();
  await createWindow();
  startServiceMonitor();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (servicePollTimer) clearInterval(servicePollTimer);
  for (const context of processes.values()) {
    if (context.socket) {
      try {
        context.socket.destroy();
      } catch {
        
      }
    }
    if (context.child) {
      try {
        context.child.kill();
      } catch {
        
      }
    }
    if (context.outer) {
      try {
        context.outer.kill();
      } catch {
        
      }
    }
  }
  if (runnerScriptPath) {
    fs.rm(runnerScriptPath, { force: true }).catch(() => {});
  }
});
