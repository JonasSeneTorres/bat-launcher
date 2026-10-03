const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');

// Executaveis que apenas abrem um shell/terminal e nao representam o servico em si.
const LAUNCHER_EXECUTABLES = new Set(['cmd.exe', 'powershell.exe', 'pwsh.exe', 'wt.exe', 'wsl.exe', 'explorer.exe', 'conhost.exe', 'timeout.exe']);

const scriptCache = new Map();

const unquote = (match) => (match[1] ?? match[2] ?? match[3] ?? '').trim();

const readScript = async (scriptPath) => {
  if (!scriptPath) return '';
  try {
    const stats = await fs.stat(scriptPath);
    const cached = scriptCache.get(scriptPath);
    if (cached && cached.mtimeMs === stats.mtimeMs) return cached.text;
    const text = await fs.readFile(scriptPath, 'utf8');
    scriptCache.set(scriptPath, { mtimeMs: stats.mtimeMs, text });
    return text;
  } catch {
    return '';
  }
};

// Remove comentarios e echos e expande variaveis definidas com "set" no proprio script.
const prepareScript = (text) => {
  const variables = new Map();
  const lines = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim().replace(/^@/, '');
    if (!line || /^(rem\b|::|echo\b)/i.test(line)) continue;
    const assignment = line.match(/^set\s+"?([A-Za-z_][\w]*)=([^"]*)"?\s*$/i);
    if (assignment) {
      variables.set(assignment[1].toLowerCase(), assignment[2]);
      continue;
    }
    lines.push(line.replace(/%([A-Za-z_][\w]*)%/g, (whole, name) => variables.get(name.toLowerCase()) ?? whole));
  }
  return lines.join('\n');
};

const isUsable = (value) => Boolean(value) && !value.includes('%');

const DETECTORS = [
  (text) => /\bdocker\s+desktop\s+(?:start|stop|restart)\b|Docker Desktop\.exe/i.test(text)
    ? { kind: 'docker', target: '', label: 'Docker Desktop' }
    : null,
  (text) => {
    const match = text.match(/\bwsl(?:\.exe)?\b[^\n]*?\s(?:-d|--distribution|-t|--terminate)\s+(?:"([^"]+)"|(\S+))/i);
    const distro = match ? unquote(match) : '';
    return isUsable(distro) ? { kind: 'wsl', target: distro, label: `WSL · ${distro}` } : null;
  },
  (text) => /(?:^|[\s&|(])wsl(?:\.exe)?\b/im.test(text)
    ? { kind: 'wsl', target: '', label: 'WSL' }
    : null,
  (text) => {
    const match = text.match(/\b(?:net|sc(?:\.exe)?)\s+(?:start|stop)\s+(?:"([^"]+)"|(\S+))/i)
      || text.match(/\b(?:Start|Stop|Restart)-Service\s+(?:-Name\s+)?(?:"([^"]+)"|'([^']+)'|(\S+))/i);
    const name = match ? unquote(match) : '';
    return isUsable(name) ? { kind: 'service', target: name, label: `Serviço · ${name}` } : null;
  },
  (text) => {
    const match = text.match(/\btaskkill(?:\.exe)?\b[^\n]*?\/im\s+(?:"([^"]+)"|(\S+))/i);
    const image = match ? unquote(match) : '';
    return isUsable(image) && !image.includes('*') ? { kind: 'process', target: image, label: `Processo · ${image}` } : null;
  },
  (text) => {
    const pattern = /\bstart\s+(?:"[^"]*"\s+)?(?:\/\w+\s+)*(?:"([^"]+\.exe)"|(\S+\.exe))/gi;
    for (const match of text.matchAll(pattern)) {
      const image = path.win32.basename(unquote(match));
      if (isUsable(image) && !LAUNCHER_EXECUTABLES.has(image.toLowerCase())) {
        return { kind: 'process', target: image, label: `Processo · ${image}` };
      }
    }
    return null;
  }
];

const detectTarget = async (startScriptPath, stopScriptPath) => {
  const text = prepareScript(`${await readScript(startScriptPath)}\n${await readScript(stopScriptPath)}`);
  for (const detector of DETECTORS) {
    const target = detector(text);
    if (target) return target;
  }
  return null;
};

const run = (file, args, env) => new Promise((resolve) => {
  execFile(file, args, { windowsHide: true, timeout: 10000, encoding: 'utf8', env: env ? { ...process.env, ...env } : process.env }, (error, stdout) => {
    resolve({
      started: !error || typeof error.code === 'number',
      exitCode: error ? error.code : 0,
      stdout: String(stdout || '').replace(/\0/g, '')
    });
  });
});

// Cada verificacao retorna true (ligado), false (desligado) ou null (nao foi possivel verificar).
const CHECKS = {
  wsl: async (distro) => {
    const result = await run('wsl.exe', ['--list', '--running', '--quiet'], { WSL_UTF8: '1' });
    if (!result.started) return null;
    if (result.exitCode !== 0) return false;
    const running = result.stdout.split(/\r?\n/).map((line) => line.trim().toLowerCase()).filter(Boolean);
    return distro ? running.includes(distro.toLowerCase()) : running.length > 0;
  },
  docker: async () => {
    // Com o Docker Desktop fechado o "docker desktop status" leva ~16s para desistir; o processo responde na hora.
    const backend = await run('tasklist.exe', ['/fi', 'imagename eq com.docker.backend.exe', '/fo', 'csv', '/nh']);
    if (backend.started && backend.exitCode === 0 && !backend.stdout.toLowerCase().includes('"com.docker.backend.exe"')) return false;
    const result = await run('docker', ['desktop', 'status', '--format', 'json']);
    if (!result.started) return null;
    try {
      return String(JSON.parse(result.stdout).Status).toLowerCase() === 'running';
    } catch {
      return result.exitCode === 0 ? null : false;
    }
  },
  service: async (name) => {
    const result = await run('sc.exe', ['query', name]);
    if (!result.started) return null;
    const state = result.stdout.match(/:\s*(\d)\s+(?:STOPPED|START_PENDING|STOP_PENDING|RUNNING|CONTINUE_PENDING|PAUSE_PENDING|PAUSED)\b/);
    if (!state) return null;
    return ['2', '4'].includes(state[1]);
  },
  process: async (image) => {
    const result = await run('tasklist.exe', ['/fi', `imagename eq ${image}`, '/fo', 'csv', '/nh']);
    if (!result.started || result.exitCode !== 0) return null;
    return result.stdout.toLowerCase().includes(`"${image.toLowerCase()}"`);
  }
};

const checkTargets = async (targets) => {
  const pending = new Map();
  for (const target of targets) {
    const key = `${target.kind}:${target.target.toLowerCase()}`;
    if (!pending.has(key)) pending.set(key, CHECKS[target.kind](target.target).catch(() => null));
  }
  const results = new Map();
  for (const [key, promise] of pending) results.set(key, await promise);
  return (target) => results.get(`${target.kind}:${target.target.toLowerCase()}`) ?? null;
};

const SERVICE_STATES = { 1: 'stopped', 2: 'starting', 3: 'stopping', 4: 'running', 5: 'starting', 6: 'stopping', 7: 'paused' };

// Estado de um servico do Windows pelo sc.exe; null quando o servico nao existe ou nao pode ser consultado.
const queryServiceState = async (name) => {
  const result = await run('sc.exe', ['query', name]);
  if (!result.started) return null;
  const state = result.stdout.match(/:\s*(\d)\s+(?:STOPPED|START_PENDING|STOP_PENDING|RUNNING|CONTINUE_PENDING|PAUSE_PENDING|PAUSED)\b/);
  return state ? SERVICE_STATES[state[1]] ?? null : null;
};

const queryServiceStates = async (names) => {
  const unique = [...new Set(names)];
  const states = await Promise.all(unique.map((name) => queryServiceState(name).catch(() => null)));
  return Object.fromEntries(unique.map((name, index) => [name, states[index]]));
};

module.exports = { detectTarget, checkTargets, queryServiceStates };
