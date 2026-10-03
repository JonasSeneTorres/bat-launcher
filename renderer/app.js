const ICONS = {
  bolt: '<path d="M13 2 4.8 13.1c-.7.9.1 2.2 1.3 2.2h4.4L9.8 22l8.4-11.5c.7-1-.1-2.2-1.3-2.2h-4.5L13 2Z" fill="currentColor" stroke="none"/>',
  zap: '<path d="M13 2 4.8 13.1c-.7.9.1 2.2 1.3 2.2h4.4L9.8 22l8.4-11.5c.7-1-.1-2.2-1.3-2.2h-4.5L13 2Z" fill="currentColor" stroke="none"/>',
  folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  sliders: '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="6" r="2" fill="var(--surface)" stroke="currentColor" stroke-width="1.8"/><circle cx="15" cy="12" r="2" fill="var(--surface)" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="18" r="2" fill="var(--surface)" stroke="currentColor" stroke-width="1.8"/>',
  settings: '<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" stroke-width="1.7"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-1.3-3.1h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 1.3-3.1l-.1-.1A1.8 1.8 0 0 1 6.9 2.6l.1.1a1.8 1.8 0 0 0 3.1-1.3v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 1.3 3.1h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-1.3 3.1Z" transform="scale(.82) translate(2.6 2.6)" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  'arrow-rotate-right': '<path d="M20 11a8 8 0 1 0-2.3 5.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 4.5V11h-6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  'paper-plane': '<path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  'arrow-left': '<path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="m7 9 3 3-3 3m5 0h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  layers: '<path d="m12 3 8 4.3-8 4.2-8-4.2L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m4 12 8 4.3 8-4.3M4 16.7l8 4.3 8-4.3" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  'mouse-pointer': '<path d="m5 3 4.1 17 2.8-6.1L18 11 5 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  'folder-open': '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M3.5 10h17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  trash: '<path d="M4 7h16M10 11v5m4-5v5M6 7l1 13h10l1-13M9 7V4h6v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  check: '<path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  alert: '<path d="M12 8v5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M12 16.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20.2h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  close: '<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  'external-link': '<path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="1.5" fill="currentColor" stroke="none"/>',
  server: '<rect x="4" y="3.5" width="16" height="7" rx="2" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="13.5" width="16" height="7" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="3" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" stroke="currentColor" stroke-width="1.7"/>',
  globe: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5s-1.1 6.2-3.2 8.5c-2.1-2.3-3.2-5.1-3.2-8.5S9.9 5.8 12 3.5Z" stroke="currentColor" stroke-width="1.7"/>',
  coffee: '<path d="M5 8h12v5.5A4.5 4.5 0 0 1 12.5 18h-3A4.5 4.5 0 0 1 5 13.5V8Zm12 1h1.5a2.5 2.5 0 0 1 0 5H17M8 4c0 1 1 1 1 2M12 4c0 1 1 1 1 2M5 21h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  tools: '<path d="m14.5 6.5 3-3a4.3 4.3 0 0 0-5.1 5.1L4 17a2.1 2.1 0 1 0 3 3l8.4-8.4a4.3 4.3 0 0 0 5.1-5.1l-3 3-3-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  music: '<path d="M9 18V5l10-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm10-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  monitor: '<rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  shield: '<path d="M12 3 19 6v5c0 4.4-2.8 8.3-7 10-4.2-1.7-7-5.6-7-10V6l7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  power: '<path d="M12 3v9M6.2 6.2a8 8 0 1 0 11.6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  activity: '<path d="M3 12h4l2.2-6 4.1 12 2.2-6H21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  edit: '<path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5 4 16.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m13.8 6.7 3.5 3.5" stroke="currentColor" stroke-width="1.7"/>',
  grip: '<circle cx="8" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="17" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="1" fill="currentColor" stroke="none"/>',
  'chevron-up': '<path d="m6 14 6-6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  'chevron-down': '<path d="m6 10 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  more: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>'
};

const ICON_LABELS = {
  bolt: 'Raio',
  power: 'Energia',
  server: 'Servidor',
  database: 'Banco de dados',
  globe: 'Internet',
  coffee: 'Café',
  tools: 'Ferramentas',
  music: 'Música',
  monitor: 'Monitor',
  shield: 'Segurança',
  terminal: 'Terminal',
  activity: 'Atividade',
  folder: 'Pasta',
  layers: 'Camadas'
};

const defaultConfig = () => ({
  version: 1,
  settings: { accent: '#7c5cff', darkMode: true },
  buttons: [],
  groups: [],
  services: []
});

const state = {
  config: defaultConfig(),
  statuses: new Map(),
  services: {},
  windowsServices: {},
  windowsServiceBusy: new Map(),
  serviceCatalog: [],
  serviceCatalogLoading: false,
  serviceSelection: new Set(),
  serviceCatalogCounts: { shown: 0, total: 0 },
  openGroupId: null,
  editorGroups: new Set(),
  groupEditingId: null,
  groupEditFromEditor: false,
  groupDeleteArmed: false,
  activity: [],
  view: 'home',
  editingId: null,
  isCreating: false,
  pendingDeleteId: null,
  draggedId: null,
  configPath: '',
  terminalLogs: new Map(),
  terminalRunIds: new Map(),
  notifiedRuns: new Set(),
  openCardMenuId: null,
  pendingTerminalId: null,
  terminalId: null,
  activityLogKey: null
};

const $ = (id) => document.getElementById(id);
const elements = {
  body: document.body,
  homeView: $('home-view'),
  homeHead: $('home-head'),
  manageView: $('manage-view'),
  manageHead: $('manage-head'),
  buttonGrid: $('button-grid'),
  emptyState: $('empty-state'),
  buttonSummary: $('button-summary'),
  activeCount: $('active-count'),
  activityList: $('activity-list'),
  groupModal: $('group-modal'),
  groupModalGrid: $('group-modal-grid'),
  groupModalTitle: $('group-modal-title'),
  groupModalDescription: $('group-modal-description'),
  groupModalIcon: $('group-modal-icon'),
  groupEditModal: $('group-edit-modal'),
  groupEditTitle: $('group-edit-title'),
  groupNameInput: $('group-name-input'),
  groupDescriptionInput: $('group-description-input'),
  groupIconInput: $('group-icon-input'),
  groupIconPreview: $('group-icon-preview'),
  groupColorInput: $('group-color-input'),
  groupColorValue: $('group-color-value'),
  groupFormError: $('group-form-error'),
  deleteGroupButton: $('delete-group-button'),
  groupsList: $('groups-list'),
  groupsCount: $('groups-count'),
  groupSelectToggle: $('group-select-toggle'),
  groupSelectValue: $('group-select-value'),
  groupSelectPopover: $('group-select-popover'),
  groupSelectOptions: $('group-select-options'),
  servicesList: $('services-list'),
  servicesEmpty: $('services-empty'),
  servicesCount: $('services-count'),
  servicesModal: $('services-modal'),
  servicesCatalog: $('services-catalog'),
  servicesSearchInput: $('services-search-input'),
  servicesSummary: $('services-summary'),
  activityCount: $('activity-count'),
  activityLogModal: $('activity-log-modal'),
  activityLogTitle: $('activity-log-title'),
  activityLogSubtitle: $('activity-log-subtitle'),
  activityLogOutput: $('activity-log-output'),
  manageList: $('manage-list'),
  manageEmpty: $('manage-empty'),
  manageEmptyAdd: $('manage-empty-add'),
  manageAddButton: $('manage-add-button'),
  manageCount: $('manage-count'),
  editorPanel: $('editor-panel'),
  editorPlaceholder: $('editor-placeholder'),
  buttonForm: $('button-form'),
  buttonId: $('button-id'),
  aliasInput: $('alias-input'),
  descriptionInput: $('description-input'),
  iconInput: $('icon-input'),
  dualActionInput: $('dual-action-input'),
  adminInput: $('admin-input'),
  showPromptInput: $('show-prompt-input'),
  backgroundInput: $('background-input'),
  colorInput: $('color-input'),
  colorValue: $('color-value'),
  selectedIconPreview: $('selected-icon-preview'),
  startScriptInput: $('start-script-input'),
  stopScriptInput: $('stop-script-input'),
  stopScriptGroup: $('stop-script-group'),
  formError: $('form-error'),
  editorTitle: $('editor-title'),
  deleteButton: $('delete-button'),
  settingsModal: $('settings-modal'),
  settingsForm: $('settings-form'),
  accentInput: $('accent-input'),
  accentValue: $('accent-value'),
  darkModeInput: $('dark-mode-input'),
  configPath: $('config-path'),
  terminalModal: $('terminal-modal'),
  terminalTitle: $('terminal-title'),
  terminalPath: $('terminal-path'),
  terminalStatus: $('terminal-status'),
  terminalOutput: $('terminal-output'),
  terminalInputForm: $('terminal-input-form'),
  terminalInput: $('terminal-input'),
  terminalSendButton: $('terminal-send-button'),
  terminalClearButton: $('terminal-clear-button'),
  terminalInterruptButton: $('terminal-interrupt-button'),
  terminalActionButton: $('terminal-action-button'),
  terminalActionIcon: $('terminal-action-icon'),
  terminalConfirmModal: $('terminal-confirm-modal'),
  terminalConfirmCopy: $('terminal-confirm-copy'),
  terminalConfirmCancel: $('terminal-confirm-cancel'),
  terminalConfirmButton: $('terminal-confirm-button'),
  confirmModal: $('confirm-modal'),
  confirmCopy: $('confirm-copy'),
  toastContainer: $('toast-container')
};

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const safeColor = (value, fallback = '#7c5cff') => /^#[0-9a-f]{6}$/i.test(String(value ?? '')) ? value : fallback;
const colorToRgb = (value) => {
  const color = safeColor(value).slice(1);
  return [0, 2, 4].map((index) => Number.parseInt(color.slice(index, index + 2), 16)).join(', ');
};
const hexToChannels = (value) => colorToRgb(value).split(', ').map(Number);
const channelsToHex = (channels) => `#${channels.map((value) => Math.round(value).toString(16).padStart(2, '0')).join('')}`;
const relativeLuminance = (channels) => {
  const linear = channels.map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrastRatio = (first, second) => {
  const [light, dark] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
};
const mixChannels = (from, to, amount) => from.map((value, index) => value + (to[index] - value) * amount);
// Aproxima a cor do preto ou do branco (o que se afastar dos fundos) ate atingir o contraste minimo
// do WCAG contra todos eles. Cores ja conformes voltam inalteradas.
const ensureContrast = (color, backgrounds, minimum) => {
  const base = hexToChannels(color);
  const surfaces = backgrounds.map(hexToChannels);
  const averageLuminance = surfaces.reduce((sum, channels) => sum + relativeLuminance(channels), 0) / surfaces.length;
  const target = averageLuminance > 0.4 ? [0, 0, 0] : [255, 255, 255];
  for (let step = 0; step <= 100; step += 2) {
    const candidate = mixChannels(base, target, step / 100);
    if (surfaces.every((surface) => contrastRatio(candidate, surface) >= minimum)) return channelsToHex(candidate);
  }
  return channelsToHex(target);
};
const tintOver = (surface, color, alpha) => channelsToHex(mixChannels(hexToChannels(surface), hexToChannels(color), alpha));
const themeColor = (name, fallback) => safeColor(getComputedStyle(document.body).getPropertyValue(name).trim(), fallback);
// Variantes das cores escolhidas pelo usuario que garantem WCAG AA no tema atual.
const accessibleAccent = (color) => {
  const surface = themeColor('--surface', '#151824');
  return {
    ink: ensureContrast(color, [tintOver(surface, color, 0.25)], 3),
    solid: ensureContrast(color, ['#ffffff'], 3)
  };
};
const fileName = (value) => String(value ?? '').split(/[\\/]/).filter(Boolean).pop() || 'arquivo.bat';
const newId = () => globalThis.crypto?.randomUUID?.() || `button-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const iconSvg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.bolt}</svg>`;
const renderIcons = () => {
  document.querySelectorAll('[data-icon]').forEach((node) => {
    node.innerHTML = iconSvg(node.dataset.icon);
  });
};
const findButton = (id) => state.config.buttons.find((button) => button.id === id);
const getStatus = (id) => state.statuses.get(id) || { status: 'idle', action: '', message: '', executing: '' };
const isBusy = (status) => ['starting', 'stopping'].includes(status.status);
const isActiveStatus = (status) => ['running', 'starting', 'stopping'].includes(status);
const isDualAction = (button) => button.dualAction === undefined ? button.type === 'toggle' : button.dualAction === true;
const typeLabel = (button) => isDualAction(button) ? 'Dupla ação' : 'Ação única';
const getService = (button) => isDualAction(button) ? state.services[button.id] || null : null;
// true/false quando o servico controlado pelos BATs foi detectado e verificado; null quando nao se sabe.
const serviceRunning = (button) => {
  const service = getService(button);
  return typeof service?.running === 'boolean' ? service.running : null;
};
const isCardActive = (button) => {
  const current = getStatus(button.id);
  const running = serviceRunning(button);
  return running === null ? isActiveStatus(current.status) : running || isBusy(current) || Boolean(current.executing);
};

const statusMeta = (button) => {
  const current = getStatus(button.id);
  const running = serviceRunning(button);
  if (current.status === 'starting') return { label: 'Iniciando', className: 'status-starting' };
  if (current.status === 'stopping') return { label: 'Encerrando', className: 'status-stopping' };
  if (current.status === 'error') return { label: 'Erro', className: 'status-error' };
  if (running === null && current.status === 'running') return { label: isDualAction(button) ? 'Ativo' : 'Executando', className: 'status-running' };
  if (running === false && current.executing) return { label: current.executing === 'stop' ? 'Encerrando' : 'Iniciando', className: current.executing === 'stop' ? 'status-stopping' : 'status-starting' };
  if (running === true) return { label: 'Ligado', className: 'status-running' };
  if (running === false) return { label: 'Desligado', className: 'status-idle' };
  return { label: 'Pronto', className: 'status-idle' };
};

const commandActionMeta = (button, action) => {
  const current = getStatus(button.id);
  const meta = action === 'stop'
    ? { action: 'stop', label: 'Encerrar', icon: 'stop' }
    : { action: 'start', label: 'Iniciar', icon: 'play' };
  if (!isDualAction(button)) {
    return { ...meta, hidden: action === 'stop', disabled: action === 'stop' || isActiveStatus(current.status) };
  }
  const running = serviceRunning(button);
  const transitioning = isBusy(current) || Boolean(current.executing);
  if (running === null) {
    // Servico nao identificado: os dois botoes ficam livres, exceto enquanto o proprio script executa.
    const ownScriptBusy = current.status === (action === 'stop' ? 'stopping' : 'starting') || current.executing === action;
    return { ...meta, hidden: false, disabled: ownScriptBusy };
  }
  // Servico identificado: mostra apenas o botao que faz sentido para o estado atual.
  const visibleAction = running ? 'stop' : transitioning ? current.executing || current.action || 'start' : 'start';
  return {
    ...meta,
    hidden: action !== visibleAction,
    disabled: action === 'stop' ? current.status === 'stopping' || current.executing === 'stop' : transitioning
  };
};

const actionMeta = (button) => {
  const running = serviceRunning(button);
  const shouldStop = isDualAction(button) && (running ?? isActiveStatus(getStatus(button.id).status));
  return commandActionMeta(button, shouldStop ? 'stop' : 'start');
};

const applySettings = () => {
  const settings = state.config.settings || {};
  const accent = safeColor(settings.accent);
  document.body.dataset.theme = settings.darkMode === false ? 'light' : 'dark';
  const textBackgrounds = ['--bg', '--surface', '--surface-soft', '--surface-hover', '--surface-raised'].map((name) => themeColor(name, '#151824'));
  // --accent: fundo de botao com texto branco; --accent-strong: texto/icone de destaque sobre os fundos do tema.
  document.documentElement.style.setProperty('--accent', ensureContrast(accent, ['#ffffff'], 4.5));
  document.documentElement.style.setProperty('--accent-rgb', colorToRgb(accent));
  document.documentElement.style.setProperty('--accent-strong', ensureContrast(accent, [...textBackgrounds, ...textBackgrounds.map((surface) => tintOver(surface, accent, 0.16))], 4.5));
};

const formatTime = (timestamp) => {
  try {
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
  } catch {
    return 'agora';
  }
};

const MAX_TERMINAL_CHARS = 50000;

const updateTerminalMeta = (button) => {
  const current = getStatus(button.id);
  const status = statusMeta(button);
  const action = actionMeta(button);
  const selectedScript = action.action === 'stop' ? button.stopScript : button.startScript;
  elements.terminalTitle.textContent = button.alias;
  elements.terminalPath.textContent = selectedScript || 'Nenhum script selecionado';
  elements.terminalStatus.className = `status-pill ${status.className}`;
  elements.terminalStatus.textContent = status.label;
  elements.terminalStatus.title = current.message || status.label;
  elements.terminalActionButton.disabled = action.disabled;
  elements.terminalActionButton.classList.toggle('is-stop', action.action === 'stop');
  const actionLabel = action.action === 'stop'
    ? 'Encerrar execução'
    : isDualAction(button) ? 'Iniciar execução' : 'Executar novamente';
  elements.terminalActionButton.dataset.tooltip = actionLabel;
  elements.terminalActionButton.setAttribute('aria-label', actionLabel);
  const canSendInput = ['starting', 'running', 'stopping'].includes(current.status);
  elements.terminalInterruptButton.hidden = !(button.background === true && canSendInput);
  elements.terminalInput.disabled = !canSendInput;
  elements.terminalSendButton.disabled = !canSendInput;
  elements.terminalInput.placeholder = canSendInput ? 'Digite a entrada e pressione Enter' : 'A entrada fica disponível durante a execução';
  const actionIcon = action.action === 'stop' ? 'stop' : 'arrow-rotate-right';
  if (elements.terminalActionIcon.dataset.icon !== actionIcon) {
    elements.terminalActionIcon.dataset.icon = actionIcon;
    elements.terminalActionIcon.innerHTML = iconSvg(actionIcon);
  }
};

const renderTerminal = () => {
  if (!state.terminalId) {
    if (!elements.terminalModal.hidden) {
      elements.terminalOutput.textContent = 'Selecione uma ação para visualizar a saída.';
    }
    return;
  }
  const button = findButton(state.terminalId);
  if (!button) {
    elements.terminalOutput.textContent = 'Selecione uma ação para visualizar a saída.';
    return;
  }
  const entries = state.terminalLogs.get(button.id) || [];
  elements.terminalOutput.replaceChildren();
  if (!entries.length) {
    const current = getStatus(button.id);
    elements.terminalOutput.textContent = isActiveStatus(current.status)
      ? 'Aguardando saída do script...'
      : 'Nenhuma saída registrada para este script.';
  } else {
    entries.forEach((entry) => {
      const line = document.createElement('span');
      line.className = `terminal-entry terminal-entry-${entry.stream}`;
      line.textContent = entry.text;
      elements.terminalOutput.append(line);
    });
  }
  elements.terminalOutput.scrollTop = elements.terminalOutput.scrollHeight;
  updateTerminalMeta(button);
};

const appendTerminalEntry = (id, stream, text) => {
  if (!id || !text) return;
  const entries = state.terminalLogs.get(id) || [];
  const safeStream = ['stdout', 'stderr', 'system'].includes(stream) ? stream : 'stdout';
  entries.push({ stream: safeStream, text: String(text).slice(0, MAX_TERMINAL_CHARS) });
  let total = entries.reduce((sum, entry) => sum + entry.text.length, 0);
  while (entries.length > 1 && total > MAX_TERMINAL_CHARS) {
    total -= entries.shift().text.length;
  }
  state.terminalLogs.set(id, entries);
  if (state.terminalId === id) renderTerminal();
};

const openTerminal = (id, action = 'start', preserveLog = false) => {
  const button = findButton(id);
  if (!button) return;
  const current = getStatus(id);
  const shouldReset = !preserveLog && action === 'start'
    && (state.terminalId !== id || !(isDualAction(button) && isActiveStatus(current.status)));
  if (shouldReset) {
    state.terminalLogs.set(id, []);
    elements.terminalInput.value = '';
  }
  state.terminalId = id;
  elements.terminalModal.hidden = false;
  renderTerminal();
  setTimeout(() => {
    if (!elements.terminalInput.disabled) {
      elements.terminalInput.focus();
    } else {
      elements.terminalOutput.focus();
    }
  }, 0);
};

const closeTerminal = () => {
  elements.terminalModal.hidden = true;
  state.terminalId = null;
};

const requestCloseTerminal = () => {
  const id = state.terminalId;
  if (!id) return;
  const button = findButton(id);
  const current = getStatus(id);
  const executing = isDualAction(button || {}) ? isBusy(current) || Boolean(current.executing) : isActiveStatus(current.status);
  if (!button || !executing || button.background === true) {
    closeTerminal();
    return;
  }
  state.pendingTerminalId = id;
  elements.terminalConfirmCopy.textContent = `A execução de “${button.alias}” será interrompida imediatamente.`;
  elements.terminalConfirmModal.hidden = false;
};

const cancelTerminalClose = () => {
  state.pendingTerminalId = null;
  elements.terminalConfirmModal.hidden = true;
};

const confirmTerminalClose = async () => {
  const id = state.pendingTerminalId;
  if (!id) return;
  try {
    await window.launcher.killButton(id);
  } catch (error) {
    showToast(error.message || 'Não foi possível interromper o processo.', 'error');
    return;
  }
  cancelTerminalClose();
  if (state.terminalId === id) closeTerminal();
};

const interruptTerminal = async () => {
  const id = state.terminalId;
  if (!id) return;
  const button = findButton(id);
  if (!button || !isActiveStatus(getStatus(id).status)) return;
  elements.terminalInterruptButton.disabled = true;
  try {
    await window.launcher.killButton(id);
  } catch (error) {
    showToast(error.message || 'Não foi possível interromper o processo.', 'error');
  } finally {
    elements.terminalInterruptButton.disabled = false;
  }
};

const clearTerminal = () => {
  if (!state.terminalId) return;
  state.terminalLogs.set(state.terminalId, []);
  renderTerminal();
};

const submitTerminalInput = async (event) => {
  event.preventDefault();
  if (!state.terminalId || elements.terminalInput.disabled) return;
  const id = state.terminalId;
  const text = elements.terminalInput.value;
  try {
    await window.launcher.sendScriptInput(id, text);
    elements.terminalInput.value = '';
    elements.terminalInput.focus();
  } catch (error) {
    const message = error.message || 'Não foi possível enviar a entrada.';
    appendTerminalEntry(id, 'stderr', `\n[ERRO] ${message}\n`);
    showToast(message, 'error');
  }
};

const collectLogText = (id, limit = 12000) => {
  const entries = state.terminalLogs.get(id) || [];
  const text = entries.map((entry) => entry.text).join('');
  return text.length > limit ? text.slice(text.length - limit) : text;
};

const ACTIVITY_STORAGE_KEY = 'bat-launcher:activity';
const ACTIVITY_LIMIT = 8;

const saveActivity = () => {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(state.activity));
  } catch {
    // Sem armazenamento disponivel a atividade continua so em memoria.
  }
};

const loadActivity = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(ACTIVITY_STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string' && typeof item.status === 'string')
      .map((item) => ({
        id: item.id,
        name: item.name,
        action: item.action === 'stop' ? 'stop' : 'start',
        status: item.status,
        message: typeof item.message === 'string' ? item.message : '',
        time: Number.isFinite(item.time) ? item.time : Date.now(),
        log: typeof item.log === 'string' ? item.log : ''
      }))
      .slice(0, ACTIVITY_LIMIT);
  } catch {
    return [];
  }
};

const recordActivity = (payload) => {
  const button = findButton(payload.id);
  if (!button) return;
  const shouldRecord = payload.status === 'error'
    || (payload.status === 'running' && payload.action === 'start')
    || (payload.status === 'stopping' && payload.action === 'stop')
    || (payload.status === 'idle' && payload.action === 'stop')
    || (payload.status === 'idle' && payload.action === 'start' && !isDualAction(button));
  if (!shouldRecord) return;
  const existing = state.activity.find((item) => item.id === payload.id && item.action === payload.action);
  const isError = payload.status === 'error';
  const entry = {
    id: button.id,
    name: button.alias,
    action: payload.action || 'start',
    status: payload.status,
    message: payload.message || (payload.action === 'stop' ? 'Encerramento solicitado.' : 'Script executado.'),
    time: payload.at || Date.now(),
    log: isError ? collectLogText(button.id) : ''
  };
  if (existing) {
    Object.assign(existing, entry);
  } else {
    state.activity.unshift(entry);
  }
  state.activity = state.activity.slice(0, ACTIVITY_LIMIT);
  saveActivity();
};

const openActivityLog = (id, action) => {
  const entry = state.activity.find((item) => item.id === id && item.action === action);
  if (!entry) return;
  state.activityLogKey = `${id}::${action}`;
  const button = findButton(id);
  const detail = entry.action === 'stop'
    ? entry.status === 'idle' ? 'Encerrado com sucesso' : 'Encerramento solicitado'
    : entry.status === 'error' ? entry.message : 'Script executado com sucesso';
  elements.activityLogTitle.textContent = entry.name;
  elements.activityLogSubtitle.textContent = `${button ? button.startScript : ''}${detail ? ` — ${detail}` : ''}`;
  const log = entry.log || collectLogText(id) || 'Nenhuma saída foi registrada para esta execução.';
  elements.activityLogOutput.textContent = entry.status === 'error' ? `[ERRO] ${entry.message}\n\n${log}` : log;
  elements.activityLogOutput.scrollTop = 0;
  elements.activityLogModal.hidden = false;
};

const closeActivityLog = () => {
  state.activityLogKey = null;
  elements.activityLogModal.hidden = true;
};

const renderActivity = () => {
  elements.activityCount.textContent = String(state.activity.length);
  if (!state.activity.length) {
    elements.activityList.innerHTML = '<div class="activity-empty">As execuções aparecerão aqui.</div>';
    return;
  }
  elements.activityList.innerHTML = state.activity.map((item) => {
    const isError = item.status === 'error';
    const detail = item.action === 'stop'
      ? item.status === 'idle' ? 'Encerrado com sucesso' : 'Encerramento solicitado'
      : isError ? item.message : 'Script executado com sucesso';
    const attributes = isError
      ? `data-activity-log="${escapeHtml(item.id)}" data-activity-action="${escapeHtml(item.action)}" data-tooltip="Ver log do erro" aria-label="Ver log do erro em ${escapeHtml(item.name)}"`
      : '';
    const tag = isError ? 'button' : 'div';
    return `<${tag} class="activity-item ${isError ? 'is-error' : 'is-success'}" ${attributes} type="${isError ? 'button' : 'text'}">
      <span class="activity-item-icon" data-icon="${isError ? 'close' : 'check'}"></span>
      <div class="activity-item-copy">
        <span class="activity-item-name">${escapeHtml(item.name)}</span>
        <span class="activity-item-detail">${escapeHtml(detail)}</span>
      </div>
      <span class="activity-item-time">${escapeHtml(formatTime(item.time))}</span>
    </${tag}>`;
  }).join('');
};

const closeCardMenu = () => {
  if (state.openCardMenuId === null) return;
  state.openCardMenuId = null;
  renderHome();
};

const toggleCardMenu = (id) => {
  state.openCardMenuId = state.openCardMenuId === id ? null : id;
  renderHome();
};

const handleCardAction = (id, action) => {
  state.openCardMenuId = null;
  if (action === 'edit' && state.openGroupId) closeGroupModal();
  renderHome();
  if (action === 'prompt') openTerminal(id, 'view', true);
  if (action === 'edit') openEdit(id);
  if (action === 'delete') openDeleteConfirm(id);
};

const renderLauncherCard = (button) => {
  const current = getStatus(button.id);
  const status = statusMeta(button);
  const startAction = commandActionMeta(button, 'start');
  const stopAction = commandActionMeta(button, 'stop');
  const color = safeColor(button.color);
  const description = button.description || 'Script configurado para executar rapidamente.';
  const menuOpen = state.openCardMenuId === button.id;
  const showPromptFlag = button.showPrompt === false
    ? '<span class="card-flag" title="A saída não abre o terminal"><span data-icon="terminal"></span>Sem prompt</span>'
    : '';
  const service = getService(button);
  const serviceFlag = service
    ? `<span class="card-flag" title="${service.running === null ? 'Não foi possível verificar o estado' : 'Estado detectado automaticamente'}"><span data-icon="activity"></span>${escapeHtml(service.label)}</span>`
    : '';
  const actionButtons = isDualAction(button)
    ? `<div class="card-actions">
        ${startAction.hidden ? '' : `<button class="action-button" data-invoke="${escapeHtml(button.id)}" data-command-action="start" data-tooltip="Iniciar: ${escapeHtml(button.alias)}" type="button" ${startAction.disabled ? 'disabled' : ''} aria-label="Iniciar ${escapeHtml(button.alias)}"><span data-icon="play"></span></button>`}
        ${stopAction.hidden ? '' : `<button class="action-button is-stop" data-invoke="${escapeHtml(button.id)}" data-command-action="stop" data-tooltip="Encerrar: ${escapeHtml(button.alias)}" type="button" ${stopAction.disabled ? 'disabled' : ''} aria-label="Encerrar ${escapeHtml(button.alias)}"><span data-icon="stop"></span></button>`}
      </div>`
    : `<div class="card-actions"><button class="action-button" data-invoke="${escapeHtml(button.id)}" data-command-action="start" data-tooltip="Executar: ${escapeHtml(button.alias)}" type="button" ${startAction.disabled ? 'disabled' : ''} aria-label="Executar ${escapeHtml(button.alias)}"><span data-icon="play"></span></button></div>`;
  const cardMenu = `<div class="card-menu">
    <button class="card-menu-toggle" data-card-menu-toggle="${escapeHtml(button.id)}" data-tooltip="Mais opções" type="button" aria-label="Mais opções para ${escapeHtml(button.alias)}" aria-haspopup="menu" aria-expanded="${menuOpen ? 'true' : 'false'}"><span data-icon="more"></span></button>
    ${menuOpen ? `<div class="card-menu-popover" role="menu">
      <button type="button" role="menuitem" data-card-action="prompt" data-command-id="${escapeHtml(button.id)}"><span data-icon="terminal"></span><span>Exibir prompt</span></button>
      <button type="button" role="menuitem" data-card-action="edit" data-command-id="${escapeHtml(button.id)}"><span data-icon="edit"></span><span>Editar</span></button>
      <button class="is-danger" type="button" role="menuitem" data-card-action="delete" data-command-id="${escapeHtml(button.id)}"><span data-icon="trash"></span><span>Excluir</span></button>
    </div>` : ''}
  </div>`;
  const accessible = accessibleAccent(color);
  return `<article class="launcher-card ${isCardActive(button) ? 'is-running' : ''} ${current.status === 'error' ? 'is-error' : ''}" style="--card-accent:${color};--card-accent-rgb:${colorToRgb(color)};--card-accent-ink:${accessible.ink};--card-accent-solid:${accessible.solid}">
    <span class="card-icon" data-icon="${escapeHtml(button.icon)}"></span>
    <h3 class="card-title">${escapeHtml(button.alias)}</h3>
    ${cardMenu}
    <p class="card-description">${escapeHtml(description)}</p>
    <div class="card-footer-row">
      <div class="card-footer-meta">
        <span class="status-pill ${status.className}" title="${escapeHtml(current.message || status.label)}">${status.label}</span>
        ${serviceFlag}
        ${showPromptFlag}
      </div>
      ${actionButtons}
    </div>
  </article>`;
};

const findGroup = (id) => (state.config.groups || []).find((group) => group.id === id);
const groupMembers = (groupId) => (state.config.buttons || []).filter((button) => (button.groups || []).includes(groupId));
const groupNames = (button) => (button.groups || []).map((id) => findGroup(id)?.name).filter(Boolean);

const accentStyle = (color) => {
  const accessible = accessibleAccent(color);
  return `--card-accent:${color};--card-accent-rgb:${colorToRgb(color)};--card-accent-ink:${accessible.ink};--card-accent-solid:${accessible.solid}`;
};

const renderGroupCard = (group, members) => {
  const color = safeColor(group.color);
  const active = members.filter(isCardActive).length;
  const names = members.map((member) => member.alias).join(', ');
  const status = active
    ? { label: `${active} de ${members.length} ${members.length === 1 ? 'ativo' : 'ativos'}`, className: 'status-running' }
    : { label: `${members.length} ${members.length === 1 ? 'script' : 'scripts'}`, className: 'status-idle' };
  const chips = members.map((member) => {
    const memberColor = safeColor(member.color);
    return `<span class="group-member ${isCardActive(member) ? 'is-active' : ''}" data-tooltip="${escapeHtml(member.alias)}" style="--member-accent-rgb:${colorToRgb(memberColor)};--member-accent-ink:${accessibleAccent(memberColor).ink}" data-icon="${escapeHtml(member.icon)}"></span>`;
  }).join('');
  return `<article class="launcher-card group-card ${active ? 'is-running' : ''}" data-group-card="${escapeHtml(group.id)}" style="${accentStyle(color)}">
      <span class="card-icon" data-icon="${escapeHtml(group.icon)}"></span>
      <h3 class="card-title">${escapeHtml(group.name)}</h3>
      <p class="card-description">${escapeHtml(group.description || names)}</p>
      <div class="group-members" aria-hidden="true">${chips}</div>
      <div class="card-footer-row">
        <div class="card-footer-meta">
          <span class="status-pill ${status.className}">${status.label}</span>
        </div>
        <div class="card-actions"><button class="action-button" data-open-group="${escapeHtml(group.id)}" data-tooltip="Abrir: ${escapeHtml(group.name)}" type="button" aria-label="Abrir o grupo ${escapeHtml(group.name)}: ${escapeHtml(names)}"><span data-icon="layers"></span></button></div>
      </div>
    </article>`;
};

const renderGroupModal = () => {
  const group = findGroup(state.openGroupId);
  const members = group ? groupMembers(group.id) : [];
  if (!group || !members.length) {
    if (!elements.groupModal.hidden) closeGroupModal();
    return;
  }
  const color = safeColor(group.color);
  elements.groupModal.querySelector('.group-modal').setAttribute('style', accentStyle(color));
  elements.groupModalIcon.dataset.icon = group.icon;
  elements.groupModalTitle.textContent = group.name;
  const active = members.filter(isCardActive).length;
  elements.groupModalDescription.textContent = `${group.description ? `${group.description} · ` : ''}${members.length} ${members.length === 1 ? 'script' : 'scripts'}${active ? ` · ${active} ${active === 1 ? 'ativo' : 'ativos'}` : ''}`;
  elements.groupModalGrid.innerHTML = members.map(renderLauncherCard).join('');
};

const openGroupModal = (id) => {
  if (!findGroup(id)) return;
  state.openGroupId = id;
  state.openCardMenuId = null;
  elements.groupModal.hidden = false;
  renderGroupModal();
  renderIcons();
  window.setTimeout(() => $('close-group-button').focus(), 0);
};

const closeGroupModal = () => {
  const id = state.openGroupId;
  state.openGroupId = null;
  state.openCardMenuId = null;
  elements.groupModal.hidden = true;
  elements.groupModalGrid.innerHTML = '';
  elements.buttonGrid.querySelector(`[data-open-group="${CSS.escape(id || '')}"]`)?.focus();
};

const renderHome = () => {
  const buttons = state.config.buttons || [];
  const groups = state.config.groups || [];
  elements.emptyState.hidden = buttons.length > 0;
  elements.buttonGrid.hidden = buttons.length === 0;
  const visibleGroups = groups.filter((group) => groupMembers(group.id).length);
  elements.buttonSummary.textContent = buttons.length === 0
    ? 'Nenhum script cadastrado'
    : `${buttons.length} ${buttons.length === 1 ? 'script configurado' : 'scripts configurados'}${visibleGroups.length ? ` · ${visibleGroups.length} ${visibleGroups.length === 1 ? 'grupo' : 'grupos'}` : ''}`;
  const active = buttons.filter(isCardActive).length;
  elements.activeCount.textContent = `${active} ${active === 1 ? 'ativo' : 'ativos'}`;
  // Scripts com grupo saem da grade; cada grupo aparece uma vez, na posicao do seu primeiro script.
  const placedGroups = new Set();
  const cards = [];
  for (const button of buttons) {
    const memberOf = (button.groups || []).filter((id) => findGroup(id));
    if (!memberOf.length) {
      cards.push(renderLauncherCard(button));
      continue;
    }
    for (const groupId of memberOf) {
      if (placedGroups.has(groupId)) continue;
      placedGroups.add(groupId);
      cards.push(renderGroupCard(findGroup(groupId), groupMembers(groupId)));
    }
  }
  elements.buttonGrid.innerHTML = cards.join('');
  if (state.openGroupId) renderGroupModal();
  renderActivity();
  renderServices();
  renderIcons();
};

const renderManageList = () => {
  const buttons = state.config.buttons || [];
  elements.manageCount.textContent = String(buttons.length);
  elements.manageEmpty.hidden = buttons.length > 0;
  elements.manageList.hidden = buttons.length === 0;
  elements.manageList.innerHTML = buttons.map((button, index) => {
    const color = safeColor(button.color);
    const current = getStatus(button.id);
    const flags = [button.admin ? 'Admin' : '', button.showPrompt === false ? 'Sem prompt' : '', ...groupNames(button).map((name) => `Grupo ${name}`)].filter(Boolean).join(' · ');
    return `<div class="manage-item ${state.editingId === button.id ? 'is-selected' : ''}" data-id="${escapeHtml(button.id)}" draggable="true">
      <button class="drag-handle" type="button" aria-label="Arrastar para reordenar" data-tooltip="Arrastar"><span data-icon="grip"></span></button>
      <span class="manage-item-icon" style="--item-accent:${color};--item-accent-rgb:${colorToRgb(color)};--item-accent-ink:${accessibleAccent(color).ink}" data-icon="${escapeHtml(button.icon)}"></span>
      <button class="manage-item-main" type="button" data-action="edit" aria-label="Editar ${escapeHtml(button.alias)}">
        <span class="manage-item-name">${escapeHtml(button.alias)}</span>
        <span class="manage-item-detail">${typeLabel(button)} · ${escapeHtml(fileName(button.startScript))}${flags ? ` · ${escapeHtml(flags)}` : ''} · ${current.status === 'running' ? 'ativo' : 'pronto'}</span>
      </button>
      <div class="manage-item-actions">
        <button type="button" data-action="move-up" data-tooltip="Mover para cima" aria-label="Mover para cima" ${index === 0 ? 'disabled' : ''}><span data-icon="chevron-up"></span></button>
        <button type="button" data-action="move-down" data-tooltip="Mover para baixo" aria-label="Mover para baixo" ${index === buttons.length - 1 ? 'disabled' : ''}><span data-icon="chevron-down"></span></button>
        <button type="button" data-action="delete" data-tooltip="Excluir" aria-label="Excluir"><span data-icon="trash"></span></button>
      </div>
    </div>`;
  }).join('');
  renderGroupsList();
  renderIcons();
};

const renderGroupsList = () => {
  const groups = state.config.groups || [];
  elements.groupsCount.textContent = String(groups.length);
  elements.groupsList.innerHTML = groups.length
    ? groups.map((group) => {
      const color = safeColor(group.color);
      const count = groupMembers(group.id).length;
      return `<li>
        <button class="group-list-item" type="button" data-edit-group="${escapeHtml(group.id)}" aria-label="Editar o grupo ${escapeHtml(group.name)}">
          <span class="manage-item-icon" style="--item-accent:${color};--item-accent-rgb:${colorToRgb(color)};--item-accent-ink:${accessibleAccent(color).ink}" data-icon="${escapeHtml(group.icon)}"></span>
          <span class="group-list-copy">
            <span class="manage-item-name">${escapeHtml(group.name)}</span>
            <span class="manage-item-detail">${count ? `${count} ${count === 1 ? 'script' : 'scripts'}` : 'Sem scripts · não aparece no painel'}</span>
          </span>
          <span class="group-list-edit" data-icon="edit"></span>
        </button>
      </li>`;
    }).join('')
    : '<li class="activity-empty">Nenhum grupo criado.</li>';
};

const renderGroupSelect = () => {
  const groups = state.config.groups || [];
  const selected = groups.filter((group) => state.editorGroups.has(group.id));
  elements.groupSelectValue.textContent = selected.length ? selected.map((group) => group.name).join(', ') : 'Nenhum grupo';
  elements.groupSelectOptions.innerHTML = groups.length
    ? groups.map((group) => `<label class="multi-select-option">
        <input type="checkbox" data-group-option="${escapeHtml(group.id)}" ${state.editorGroups.has(group.id) ? 'checked' : ''}>
        <span class="multi-select-swatch" style="--swatch:${safeColor(group.color)}"></span>
        <span>${escapeHtml(group.name)}</span>
      </label>`).join('')
    : '<p class="multi-select-empty">Nenhum grupo criado ainda.</p>';
};

const setGroupSelectOpen = (open) => {
  elements.groupSelectPopover.hidden = !open;
  elements.groupSelectToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    renderGroupSelect();
    window.setTimeout(() => (elements.groupSelectOptions.querySelector('input') || $('group-select-new')).focus(), 0);
  }
};

const setGroupFormError = (message) => {
  elements.groupFormError.textContent = message;
  elements.groupFormError.hidden = !message;
};

const openGroupEdit = (id = null, fromEditor = false) => {
  const group = id ? findGroup(id) : null;
  state.groupEditingId = group ? group.id : null;
  state.groupEditFromEditor = fromEditor;
  state.groupDeleteArmed = false;
  elements.groupEditTitle.textContent = group ? 'Editar grupo' : 'Novo grupo';
  elements.groupNameInput.value = group?.name || '';
  elements.groupDescriptionInput.value = group?.description || '';
  elements.groupIconInput.value = ICON_LABELS[group?.icon] ? group.icon : 'layers';
  elements.groupIconPreview.dataset.icon = elements.groupIconInput.value;
  elements.groupColorInput.value = safeColor(group?.color);
  elements.groupColorValue.textContent = safeColor(group?.color).toUpperCase();
  elements.deleteGroupButton.hidden = !group;
  elements.deleteGroupButton.querySelector('span:last-child').textContent = 'Excluir grupo';
  setGroupFormError('');
  setGroupSelectOpen(false);
  elements.groupEditModal.hidden = false;
  renderIcons();
  window.setTimeout(() => elements.groupNameInput.focus(), 0);
};

const closeGroupEdit = () => {
  elements.groupEditModal.hidden = true;
  if (state.groupEditFromEditor) elements.groupSelectToggle.focus();
  state.groupEditingId = null;
  state.groupEditFromEditor = false;
  state.groupDeleteArmed = false;
};

const saveGroup = async (event) => {
  event.preventDefault();
  const name = elements.groupNameInput.value.trim();
  if (!name) {
    setGroupFormError('Informe um nome para o grupo.');
    elements.groupNameInput.focus();
    return;
  }
  const duplicate = (state.config.groups || []).some((group) => group.id !== state.groupEditingId && group.name.trim().toLowerCase() === name.toLowerCase());
  if (duplicate) {
    setGroupFormError('Já existe um grupo com esse nome.');
    return;
  }
  const group = {
    id: state.groupEditingId || newId(),
    name,
    description: elements.groupDescriptionInput.value.trim(),
    icon: ICON_LABELS[elements.groupIconInput.value] ? elements.groupIconInput.value : 'layers',
    color: safeColor(elements.groupColorInput.value)
  };
  const isNew = !state.groupEditingId;
  const fromEditor = state.groupEditFromEditor;
  state.config.groups = isNew
    ? [...(state.config.groups || []), group]
    : state.config.groups.map((item) => item.id === group.id ? group : item);
  const saved = await persistConfig();
  if (!saved) return;
  // Grupo criado a partir do editor ja vem marcado para o script em edicao.
  if (isNew && fromEditor) state.editorGroups.add(group.id);
  closeGroupEdit();
  renderGroupSelect();
  showToast(isNew ? `Grupo “${group.name}” criado.` : 'Grupo atualizado.', 'success');
};

const deleteGroup = async () => {
  const group = findGroup(state.groupEditingId);
  if (!group) return;
  if (!state.groupDeleteArmed) {
    // Primeiro clique arma a exclusao; o segundo confirma.
    state.groupDeleteArmed = true;
    elements.deleteGroupButton.querySelector('span:last-child').textContent = 'Clique de novo para excluir';
    return;
  }
  state.config.groups = state.config.groups.filter((item) => item.id !== group.id);
  state.config.buttons = state.config.buttons.map((button) => ({ ...button, groups: (button.groups || []).filter((id) => id !== group.id) }));
  const saved = await persistConfig();
  if (!saved) return;
  state.editorGroups.delete(group.id);
  if (state.openGroupId === group.id) closeGroupModal();
  closeGroupEdit();
  renderGroupSelect();
  showToast(`Grupo “${group.name}” excluído. Os scripts voltaram a aparecer sozinhos.`, 'success');
};

const renderEditor = () => {
  const hasEditor = state.isCreating || Boolean(state.editingId);
  elements.editorPlaceholder.hidden = hasEditor;
  elements.buttonForm.hidden = !hasEditor;
  elements.manageAddButton.hidden = hasEditor;
  elements.manageEmptyAdd.hidden = hasEditor;
  if (!hasEditor) {
    return;
  }
  const button = findButton(state.editingId) || {
    alias: '',
    description: '',
    icon: 'bolt',
    type: 'single',
    dualAction: false,
    admin: false,
    showPrompt: true,
    background: false,
    color: '#7c5cff',
    startScript: '',
    stopScript: ''
  };
  elements.buttonId.value = state.editingId || '';
  elements.aliasInput.value = button.alias;
  elements.descriptionInput.value = button.description;
  elements.iconInput.value = ICON_LABELS[button.icon] ? button.icon : 'bolt';
  elements.dualActionInput.checked = isDualAction(button);
  elements.adminInput.checked = button.admin === true;
  elements.showPromptInput.checked = button.showPrompt !== false;
  elements.backgroundInput.checked = button.background === true;
  elements.colorInput.value = safeColor(button.color);
  elements.colorValue.textContent = safeColor(button.color).toUpperCase();
  elements.startScriptInput.value = button.startScript;
  elements.stopScriptInput.value = button.stopScript;
  elements.selectedIconPreview.dataset.icon = ICON_LABELS[button.icon] ? button.icon : 'bolt';
  elements.stopScriptGroup.hidden = !isDualAction(button);
  elements.deleteButton.hidden = state.isCreating;
  elements.editorTitle.textContent = state.isCreating ? 'Novo script' : 'Editando script';
  elements.formError.hidden = true;
  renderGroupSelect();
  renderIcons();
};

const renderAll = () => {
  applySettings();
  renderHome();
  renderManageList();
  renderEditor();
  renderIcons();
};

const setView = (view) => {
  state.view = view;
  const isHome = view === 'home';
  elements.homeView.hidden = !isHome;
  elements.homeHead.hidden = !isHome;
  elements.manageView.hidden = isHome;
  elements.manageHead.hidden = isHome;
  if (!isHome) {
    renderManageList();
    renderEditor();
  }
};

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast is-${type}`;
  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.innerHTML = iconSvg(type === 'error' ? 'close' : type === 'success' ? 'check' : 'bolt');
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(icon, text);
  elements.toastContainer.append(toast);
  window.setTimeout(() => {
    toast.classList.add('is-leaving');
    window.setTimeout(() => toast.remove(), 190);
  }, 4200);
};

const setFormError = (message) => {
  elements.formError.textContent = message;
  elements.formError.hidden = !message;
};

const persistConfig = async () => {
  const snapshot = JSON.parse(JSON.stringify(state.config));
  try {
    const result = await window.launcher.saveConfig(state.config);
    state.config = result.config;
    state.configPath = result.configPath;
    applySettings();
    renderHome();
    renderManageList();
    elements.configPath.textContent = state.configPath;
    return true;
  } catch (error) {
    state.config = snapshot;
    applySettings();
    renderHome();
    renderManageList();
    showToast(error.message || 'Não foi possível salvar as alterações.', 'error');
    return false;
  }
};

const openCreate = () => {
  state.isCreating = true;
  state.editingId = null;
  state.editorGroups = new Set();
  setGroupSelectOpen(false);
  setView('manage');
  renderEditor();
  window.setTimeout(() => elements.aliasInput.focus(), 0);
};

const openEdit = (id) => {
  if (!findButton(id)) return;
  state.isCreating = false;
  state.editingId = id;
  state.editorGroups = new Set(findButton(id).groups || []);
  setGroupSelectOpen(false);
  setView('manage');
  renderEditor();
};

const closeEditor = () => {
  state.isCreating = false;
  state.editingId = null;
  setGroupSelectOpen(false);
  setFormError('');
  renderEditor();
  renderManageList();
};

const validateForm = (data) => {
  const alias = String(data.alias || '').trim();
  const startScript = String(data.startScript || '').trim();
  const stopScript = String(data.stopScript || '').trim();
  if (!alias) return 'Informe um alias para identificar o script.';
  if (!startScript) return 'Selecione o script de inicialização do script.';
  if (!/\.bat$/i.test(startScript)) return 'O script de inicialização precisa ser um arquivo .bat.';
  if (data.dualAction) {
    if (!stopScript) return 'Selecione o script de encerramento do script para uma ação dupla.';
    if (!/\.bat$/i.test(stopScript)) return 'O script de encerramento precisa ser um arquivo .bat.';
  }
  return '';
};

const saveForm = async (event) => {
  event.preventDefault();
  const data = {
    alias: elements.aliasInput.value,
    description: elements.descriptionInput.value,
    icon: elements.iconInput.value,
    dualAction: elements.dualActionInput.checked,
    admin: elements.adminInput.checked,
    showPrompt: elements.showPromptInput.checked,
    background: elements.backgroundInput.checked,
    color: elements.colorInput.value,
    startScript: elements.startScriptInput.value,
    stopScript: elements.stopScriptInput.value
  };
  const error = validateForm(data);
  if (error) {
    setFormError(error);
    return;
  }
  const button = {
    id: state.editingId || newId(),
    alias: data.alias.trim(),
    description: data.description.trim(),
    icon: ICON_LABELS[data.icon] ? data.icon : 'bolt',
    type: data.dualAction ? 'toggle' : 'single',
    dualAction: data.dualAction,
    admin: data.admin,
    showPrompt: data.showPrompt,
    background: data.background,
    color: safeColor(data.color),
    startScript: data.startScript.trim(),
    stopScript: data.dualAction ? data.stopScript.trim() : '',
    groups: [...state.editorGroups].filter((id) => findGroup(id))
  };
  if (state.isCreating) {
    state.config.buttons.push(button);
  } else {
    const index = state.config.buttons.findIndex((item) => item.id === button.id);
    if (index >= 0) state.config.buttons[index] = button;
  }
  const saved = await persistConfig();
  if (!saved) return;
  state.isCreating = false;
  state.editingId = null;
  setFormError('');
  renderEditor();
  renderManageList();
  renderHome();
  setView('home');
  showToast('Script salvo com sucesso.', 'success');
};

const chooseFile = async (input) => {
  try {
    const filePath = await window.launcher.selectBatFile();
    if (filePath) {
      input.value = filePath;
      setFormError('');
    }
  } catch (error) {
    showToast(error.message || 'Não foi possível abrir o seletor de arquivos.', 'error');
  }
};

const openSettings = () => {
  const settings = state.config.settings || {};
  elements.accentInput.value = safeColor(settings.accent);
  elements.accentValue.textContent = safeColor(settings.accent).toUpperCase();
  elements.darkModeInput.checked = settings.darkMode !== false;
  elements.configPath.textContent = state.configPath;
  elements.settingsModal.hidden = false;
};

const closeSettings = () => {
  elements.settingsModal.hidden = true;
};

const saveSettings = async (event) => {
  event.preventDefault();
  state.config.settings = {
    accent: safeColor(elements.accentInput.value),
    darkMode: elements.darkModeInput.checked
  };
  const saved = await persistConfig();
  if (saved) {
    closeSettings();
    showToast('Interface personalizada.', 'success');
  }
};

const openDeleteConfirm = (id) => {
  const button = findButton(id);
  if (!button) return;
  if (['starting', 'running', 'stopping'].includes(getStatus(id).status)) {
    showToast('Encerre a ação antes de excluir este script.', 'error');
    return;
  }
  state.pendingDeleteId = id;
  elements.confirmCopy.textContent = `“${button.alias}” será removido da biblioteca.`;
  elements.confirmModal.hidden = false;
};

const closeDeleteConfirm = () => {
  state.pendingDeleteId = null;
  elements.confirmModal.hidden = true;
};

const confirmDelete = async () => {
  const id = state.pendingDeleteId;
  if (!id) return;
  const nextButtons = state.config.buttons.filter((button) => button.id !== id);
  state.config.buttons = nextButtons;
  const saved = await persistConfig();
  if (!saved) return;
  state.statuses.delete(id);
  if (state.editingId === id) closeEditor();
  closeDeleteConfirm();
  showToast('Comando excluído.', 'success');
};

const moveButton = async (id, direction) => {
  const index = state.config.buttons.findIndex((button) => button.id === id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.config.buttons.length) return;
  const [item] = state.config.buttons.splice(index, 1);
  state.config.buttons.splice(nextIndex, 0, item);
  const saved = await persistConfig();
  if (saved) showToast('Ordem atualizada.', 'success');
};

const reorderButton = async (draggedId, targetId) => {
  if (!draggedId || !targetId || draggedId === targetId) return;
  const fromIndex = state.config.buttons.findIndex((button) => button.id === draggedId);
  const targetIndex = state.config.buttons.findIndex((button) => button.id === targetId);
  if (fromIndex < 0 || targetIndex < 0) return;
  const [item] = state.config.buttons.splice(fromIndex, 1);
  state.config.buttons.splice(targetIndex, 0, item);
  const saved = await persistConfig();
  if (saved) showToast('Ordem atualizada.', 'success');
};

const invokeButton = async (id, requestedAction = '') => {
  const button = findButton(id);
  if (!button) return;
  let action = requestedAction === 'stop' || requestedAction === 'start' ? requestedAction : 'start';
  if (!isDualAction(button)) {
    action = 'start';
  } else if (!requestedAction) {
    action = actionMeta(button).action;
  }
  if (commandActionMeta(button, action).disabled) return;

  const nextStatus = action === 'stop' ? 'stopping' : 'starting';
  if (button.showPrompt !== false) {
    openTerminal(id, action);
  } else if (state.terminalId === id) {
    closeTerminal();
  }
  state.statuses.set(id, { status: nextStatus, action, message: '' });
  renderHome();
  renderManageList();
  renderTerminal();
  try {
    await window.launcher.invokeButton(id, action);
  } catch (error) {
    const message = error.message || 'Falha ao executar o script.';
    state.statuses.set(id, { status: 'error', action, message });
    appendTerminalEntry(id, 'stderr', `\n[ERRO] ${message}\n`);
    renderHome();
    renderManageList();
    renderTerminal();
    showToast(message, 'error');
  }
};

const notifyResult = (button, payload) => {
  if (!button || !payload?.status) return;
  const success = (payload.status === 'running' && payload.action === 'start' && isDualAction(button))
    || (payload.status === 'idle' && payload.action === 'stop' && isDualAction(button))
    || (payload.status === 'idle' && payload.action === 'start' && !isDualAction(button));
  const isError = payload.status === 'error'
    || (payload.status === 'running' && payload.action === 'start' && payload.message);
  if (!success && !isError) return;
  if (success && button.showPrompt !== false) return;
  const key = `${payload.id}:${payload.runId || payload.at || Date.now()}:${payload.status}:${payload.action}`;
  if (state.notifiedRuns.has(key)) return;
  state.notifiedRuns.add(key);
  const message = success
    ? payload.action === 'stop'
      ? `${button.alias} foi encerrado com sucesso.`
      : `${button.alias} ${isDualAction(button) ? 'foi iniciado' : 'foi executado'} com sucesso.`
    : payload.message || 'Não foi possível executar o comando.';
  showToast(message, success ? 'success' : 'error');
};

const handleStatus = (payload) => {
  if (!payload?.id) return;
  if (payload.runId) state.terminalRunIds.set(payload.id, payload.runId);
  const button = findButton(payload.id);
  state.statuses.set(payload.id, {
    status: payload.status,
    action: payload.action || '',
    message: payload.message || '',
    executing: payload.executing || ''
  });
  recordActivity(payload);
  notifyResult(button, payload);
  renderHome();
  renderManageList();
  renderTerminal();
};

const handleServiceStatus = (services) => {
  state.services = services && typeof services === 'object' ? services : {};
  renderHome();
  renderTerminal();
};

const handleScriptOutput = (payload) => {
  if (!payload?.id || typeof payload.text !== 'string') return;
  const currentRunId = state.terminalRunIds.get(payload.id);
  if (payload.runId && currentRunId && payload.runId !== currentRunId) return;
  if (payload.runId) state.terminalRunIds.set(payload.id, payload.runId);
  appendTerminalEntry(payload.id, payload.stream, payload.text);
};

const WINDOWS_SERVICE_STATES = {
  running: { label: 'Ligado', className: 'status-running' },
  starting: { label: 'Iniciando', className: 'status-starting' },
  'start pending': { label: 'Iniciando', className: 'status-starting' },
  stopping: { label: 'Parando', className: 'status-stopping' },
  'stop pending': { label: 'Parando', className: 'status-stopping' },
  paused: { label: 'Pausado', className: 'status-idle' },
  stopped: { label: 'Desligado', className: 'status-idle' }
};

const windowsServiceMeta = (name) => {
  const busy = state.windowsServiceBusy.get(name);
  if (busy) return busy === 'stop' ? WINDOWS_SERVICE_STATES.stopping : WINDOWS_SERVICE_STATES.starting;
  if (!Object.hasOwn(state.windowsServices, name)) return { label: 'Verificando', className: 'status-idle' };
  return WINDOWS_SERVICE_STATES[state.windowsServices[name]] || { label: 'Não encontrado', className: 'status-error' };
};

const renderServices = () => {
  const services = state.config.services || [];
  elements.servicesCount.textContent = String(services.length);
  elements.servicesEmpty.hidden = services.length > 0;
  elements.servicesList.innerHTML = services.map((service) => {
    const current = state.windowsServices[service.name];
    const meta = windowsServiceMeta(service.name);
    const busy = state.windowsServiceBusy.has(service.name);
    const action = ['running', 'starting'].includes(current) ? 'stop' : 'start';
    const disabled = busy || !current || ['starting', 'stopping'].includes(current);
    const label = `${action === 'stop' ? 'Parar' : 'Iniciar'} ${service.displayName}`;
    return `<li class="service-item">
      <div class="service-item-copy">
        <span class="service-item-name" title="${escapeHtml(`${service.displayName} (${service.name})`)}">${escapeHtml(service.displayName)}</span>
        <span class="status-pill ${meta.className}">${meta.label}</span>
      </div>
      <button class="service-toggle ${action === 'stop' ? 'is-stop' : ''}" type="button" data-service-toggle="${escapeHtml(service.name)}" data-service-action="${action}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" ${disabled ? 'disabled' : ''}><span data-icon="${action === 'stop' ? 'stop' : 'play'}"></span></button>
    </li>`;
  }).join('');
  renderIcons();
};

const toggleWindowsService = async (name, action) => {
  const service = (state.config.services || []).find((item) => item.name === name);
  if (!service || state.windowsServiceBusy.has(name)) return;
  state.windowsServiceBusy.set(name, action);
  renderServices();
  try {
    const result = await window.launcher.controlWindowsService(name, action);
    if (!result?.busy) showToast(`${service.displayName} ${action === 'stop' ? 'foi parado' : 'foi iniciado'}.`, 'success');
  } catch (error) {
    showToast(error.message || 'Não foi possível alterar o serviço.', 'error');
  } finally {
    state.windowsServiceBusy.delete(name);
    renderServices();
  }
};

const normalizeSearch = (value) => String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const catalogMeta = (item) => item.startMode === 'Disabled'
  ? { label: 'Desativado', className: 'status-idle' }
  : WINDOWS_SERVICE_STATES[item.state] || { label: 'Desconhecido', className: 'status-idle' };

const renderServiceCatalog = () => {
  if (state.serviceCatalogLoading) {
    elements.servicesSummary.textContent = 'Carregando os serviços do Windows...';
    elements.servicesCatalog.innerHTML = '<div class="activity-empty">Carregando...</div>';
    return;
  }
  // Servicos ja escolhidos que nao existem mais nesta maquina continuam visiveis para poderem ser removidos.
  const known = new Set(state.serviceCatalog.map((item) => item.name));
  const missing = (state.config.services || [])
    .filter((service) => !known.has(service.name))
    .map((service) => ({ name: service.name, displayName: service.displayName, description: 'Serviço não encontrado nesta máquina.', state: '', startMode: '' }));
  const terms = normalizeSearch(elements.servicesSearchInput.value).split(/\s+/).filter(Boolean);
  const all = [...missing, ...state.serviceCatalog];
  const visible = all
    .filter((item) => {
      const haystack = normalizeSearch(`${item.displayName} ${item.name} ${item.description}`);
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => Number(state.serviceSelection.has(b.name)) - Number(state.serviceSelection.has(a.name)) || a.displayName.localeCompare(b.displayName, 'pt-BR'));
  updateServicesSummary(visible.length, all.length);
  elements.servicesCatalog.innerHTML = visible.length
    ? visible.map((item) => {
      const meta = item.state || item.startMode ? catalogMeta(item) : { label: 'Não encontrado', className: 'status-error' };
      return `<label class="service-option">
        <input type="checkbox" data-service-name="${escapeHtml(item.name)}" data-service-display="${escapeHtml(item.displayName)}" ${state.serviceSelection.has(item.name) ? 'checked' : ''}>
        <span class="service-option-name">${escapeHtml(item.displayName)}<code>${escapeHtml(item.name)}</code></span>
        <span class="status-pill ${meta.className}">${meta.label}</span>
        <span class="service-option-description">${escapeHtml(item.description || 'Sem descrição.')}</span>
      </label>`;
    }).join('')
    : '<div class="activity-empty">Nenhum serviço encontrado para essa busca.</div>';
};

const updateServicesSummary = (shown = state.serviceCatalogCounts.shown, total = state.serviceCatalogCounts.total) => {
  state.serviceCatalogCounts = { shown, total };
  const selected = state.serviceSelection.size;
  elements.servicesSummary.textContent = `${selected} ${selected === 1 ? 'selecionado' : 'selecionados'} · exibindo ${shown} de ${total} serviços`;
};

const openServicesModal = async () => {
  state.serviceSelection = new Set((state.config.services || []).map((service) => service.name));
  elements.servicesSearchInput.value = '';
  elements.servicesModal.hidden = false;
  elements.servicesSearchInput.focus();
  state.serviceCatalogLoading = true;
  renderServiceCatalog();
  try {
    state.serviceCatalog = await window.launcher.listWindowsServices();
  } catch (error) {
    showToast(error.message || 'Não foi possível listar os serviços.', 'error');
  } finally {
    state.serviceCatalogLoading = false;
    renderServiceCatalog();
  }
};

const closeServicesModal = () => {
  elements.servicesModal.hidden = true;
  $('services-add-button').focus();
};

const saveServicesSelection = async (event) => {
  event.preventDefault();
  if (state.serviceCatalogLoading) return;
  const byName = new Map([...(state.config.services || []), ...state.serviceCatalog].map((item) => [item.name, item.displayName]));
  const kept = (state.config.services || []).filter((service) => state.serviceSelection.has(service.name));
  const keptNames = new Set(kept.map((service) => service.name));
  const added = [...state.serviceSelection]
    .filter((name) => !keptNames.has(name))
    .map((name) => ({ name, displayName: byName.get(name) || name }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
  state.config.services = [...kept, ...added];
  const saved = await persistConfig();
  if (saved) {
    closeServicesModal();
    renderServices();
    showToast('Lista de serviços atualizada.', 'success');
  }
};

const handleManageClick = (event) => {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const item = actionButton.closest('[data-id]');
  const id = item?.dataset.id;
  if (!id) return;
  const action = actionButton.dataset.action;
  if (action === 'edit') openEdit(id);
  if (action === 'delete') openDeleteConfirm(id);
  if (action === 'move-up') moveButton(id, -1);
  if (action === 'move-down') moveButton(id, 1);
};

const clearDragState = () => {
  state.draggedId = null;
  elements.manageList.querySelectorAll('.is-dragging, .is-drag-over').forEach((item) => {
    item.classList.remove('is-dragging', 'is-drag-over');
  });
};

const bindEvents = () => {
  $('back-home-button').addEventListener('click', () => setView('home'));
  $('add-button').addEventListener('click', openCreate);
  $('empty-add-button').addEventListener('click', openCreate);
  $('manage-add-button').addEventListener('click', openCreate);
  $('manage-empty-add').addEventListener('click', openCreate);
  $('customize-button').addEventListener('click', openSettings);
  $('services-add-button').addEventListener('click', openServicesModal);
  $('close-services-button').addEventListener('click', closeServicesModal);
  $('cancel-services-button').addEventListener('click', closeServicesModal);
  $('services-form').addEventListener('submit', saveServicesSelection);
  elements.servicesSearchInput.addEventListener('input', renderServiceCatalog);
  elements.servicesSearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') event.preventDefault();
  });
  elements.servicesCatalog.addEventListener('change', (event) => {
    const input = event.target.closest('[data-service-name]');
    if (!input) return;
    if (input.checked) state.serviceSelection.add(input.dataset.serviceName);
    else state.serviceSelection.delete(input.dataset.serviceName);
    updateServicesSummary();
  });
  elements.servicesModal.addEventListener('click', (event) => {
    if (event.target === elements.servicesModal) closeServicesModal();
  });
  elements.servicesList.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-service-toggle]');
    if (toggle) toggleWindowsService(toggle.dataset.serviceToggle, toggle.dataset.serviceAction);
  });
  $('close-settings-button').addEventListener('click', closeSettings);
  $('cancel-settings-button').addEventListener('click', closeSettings);
  $('settings-form').addEventListener('submit', saveSettings);
  $('open-data-folder').addEventListener('click', async () => {
    const error = await window.launcher.openDataFolder();
    if (error) showToast(error, 'error');
  });
  $('cancel-delete-button').addEventListener('click', closeDeleteConfirm);
  $('confirm-delete-button').addEventListener('click', confirmDelete);
  $('button-form').addEventListener('submit', saveForm);
  $('cancel-button').addEventListener('click', closeEditor);
  $('delete-button').addEventListener('click', () => {
    if (state.editingId) openDeleteConfirm(state.editingId);
  });
  $('select-start-script').addEventListener('click', () => chooseFile(elements.startScriptInput));
  $('select-stop-script').addEventListener('click', () => chooseFile(elements.stopScriptInput));
  elements.dualActionInput.addEventListener('change', () => {
    elements.stopScriptGroup.hidden = !elements.dualActionInput.checked;
    setFormError('');
  });
  $('icon-input').addEventListener('change', () => {
    elements.selectedIconPreview.dataset.icon = elements.iconInput.value;
    renderIcons();
  });
  $('color-input').addEventListener('input', () => {
    elements.colorValue.textContent = safeColor(elements.colorInput.value).toUpperCase();
  });
  $('accent-input').addEventListener('input', () => {
    elements.accentValue.textContent = safeColor(elements.accentInput.value).toUpperCase();
  });
  const handleCardGridClick = (event) => {
    const groupCard = event.target.closest('[data-open-group], [data-group-card]');
    if (groupCard) {
      openGroupModal(groupCard.dataset.openGroup || groupCard.dataset.groupCard);
      return;
    }
    const menuToggle = event.target.closest('[data-card-menu-toggle]');
    if (menuToggle) {
      toggleCardMenu(menuToggle.dataset.cardMenuToggle);
      return;
    }
    const cardAction = event.target.closest('[data-card-action]');
    if (cardAction) {
      handleCardAction(cardAction.dataset.commandId, cardAction.dataset.cardAction);
      return;
    }
    const action = event.target.closest('[data-invoke]');
    if (action) {
      closeCardMenu();
      invokeButton(action.dataset.invoke, action.dataset.commandAction || '');
    }
  };
  elements.buttonGrid.addEventListener('click', handleCardGridClick);
  elements.groupModalGrid.addEventListener('click', handleCardGridClick);
  $('close-group-button').addEventListener('click', closeGroupModal);
  $('edit-group-button').addEventListener('click', () => {
    const id = state.openGroupId;
    closeGroupModal();
    openGroupEdit(id);
  });
  elements.groupModal.addEventListener('click', (event) => {
    if (event.target === elements.groupModal) closeGroupModal();
  });
  $('groups-add-button').addEventListener('click', () => openGroupEdit());
  elements.groupsList.addEventListener('click', (event) => {
    const item = event.target.closest('[data-edit-group]');
    if (item) openGroupEdit(item.dataset.editGroup);
  });
  $('group-edit-form').addEventListener('submit', saveGroup);
  $('close-group-edit-button').addEventListener('click', closeGroupEdit);
  $('cancel-group-edit-button').addEventListener('click', closeGroupEdit);
  elements.deleteGroupButton.addEventListener('click', deleteGroup);
  elements.groupEditModal.addEventListener('click', (event) => {
    if (event.target === elements.groupEditModal) closeGroupEdit();
  });
  elements.groupIconInput.addEventListener('change', () => {
    elements.groupIconPreview.dataset.icon = elements.groupIconInput.value;
    renderIcons();
  });
  elements.groupColorInput.addEventListener('input', () => {
    elements.groupColorValue.textContent = safeColor(elements.groupColorInput.value).toUpperCase();
  });
  elements.groupSelectToggle.addEventListener('click', () => setGroupSelectOpen(elements.groupSelectPopover.hidden));
  elements.groupSelectOptions.addEventListener('change', (event) => {
    const input = event.target.closest('[data-group-option]');
    if (!input) return;
    if (input.checked) state.editorGroups.add(input.dataset.groupOption);
    else state.editorGroups.delete(input.dataset.groupOption);
    const selected = (state.config.groups || []).filter((group) => state.editorGroups.has(group.id));
    elements.groupSelectValue.textContent = selected.length ? selected.map((group) => group.name).join(', ') : 'Nenhum grupo';
  });
  $('group-select-new').addEventListener('click', () => openGroupEdit(null, true));
  document.addEventListener('click', (event) => {
    if (!elements.groupSelectPopover.hidden && !event.target.closest('#group-select')) setGroupSelectOpen(false);
    if (state.openCardMenuId === null) return;
    if (event.target.closest('.card-menu')) return;
    closeCardMenu();
  });
  elements.activityList.addEventListener('click', (event) => {
    const item = event.target.closest('[data-activity-log]');
    if (!item) return;
    openActivityLog(item.dataset.activityLog, item.dataset.activityAction || 'start');
  });
  $('close-activity-log-button').addEventListener('click', closeActivityLog);
  $('dismiss-activity-log-button').addEventListener('click', closeActivityLog);
  elements.activityLogModal.addEventListener('click', (event) => {
    if (event.target === elements.activityLogModal) closeActivityLog();
  });
  elements.manageList.addEventListener('click', handleManageClick);
  elements.manageList.addEventListener('dragstart', (event) => {
    const item = event.target.closest('[data-id]');
    if (!item) return;
    state.draggedId = item.dataset.id;
    item.classList.add('is-dragging');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', state.draggedId);
    }
  });
  elements.manageList.addEventListener('dragover', (event) => {
    const item = event.target.closest('[data-id]');
    if (!item || !state.draggedId) return;
    event.preventDefault();
    elements.manageList.querySelectorAll('.is-drag-over').forEach((node) => node.classList.remove('is-drag-over'));
    item.classList.add('is-drag-over');
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  });
  elements.manageList.addEventListener('drop', (event) => {
    const item = event.target.closest('[data-id]');
    if (!item || !state.draggedId) return;
    event.preventDefault();
    const draggedId = state.draggedId;
    clearDragState();
    reorderButton(draggedId, item.dataset.id);
  });
  elements.manageList.addEventListener('dragend', clearDragState);
  elements.terminalModal.addEventListener('click', (event) => {
    if (event.target === elements.terminalModal) requestCloseTerminal();
  });
  $('close-terminal-button').addEventListener('click', requestCloseTerminal);
  elements.terminalConfirmButton.addEventListener('click', confirmTerminalClose);
  elements.terminalConfirmCancel.addEventListener('click', cancelTerminalClose);
  elements.terminalConfirmModal.addEventListener('click', (event) => {
    if (event.target === elements.terminalConfirmModal) cancelTerminalClose();
  });
  elements.terminalClearButton.addEventListener('click', clearTerminal);
  elements.terminalInterruptButton.addEventListener('click', interruptTerminal);
  elements.terminalInputForm.addEventListener('submit', submitTerminalInput);
  elements.terminalInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    submitTerminalInput(event);
  });
  elements.terminalActionButton.addEventListener('click', () => {
    if (state.terminalId) invokeButton(state.terminalId);
  });
  elements.settingsModal.addEventListener('click', (event) => {
    if (event.target === elements.settingsModal) closeSettings();
  });
  elements.confirmModal.addEventListener('click', (event) => {
    if (event.target === elements.confirmModal) closeDeleteConfirm();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!elements.terminalConfirmModal.hidden) {
      cancelTerminalClose();
    } else if (!elements.terminalModal.hidden) {
      requestCloseTerminal();
    } else if (!elements.confirmModal.hidden) {
      closeDeleteConfirm();
    } else if (!elements.activityLogModal.hidden) {
      closeActivityLog();
    } else if (!elements.groupEditModal.hidden) {
      closeGroupEdit();
    } else if (!elements.groupSelectPopover.hidden) {
      setGroupSelectOpen(false);
      elements.groupSelectToggle.focus();
    } else if (state.openCardMenuId !== null) {
      closeCardMenu();
    } else if (!elements.groupModal.hidden) {
      closeGroupModal();
    } else if (!elements.servicesModal.hidden) {
      closeServicesModal();
    } else if (!elements.settingsModal.hidden) {
      closeSettings();
    }
  });
};

const populateIcons = () => {
  const options = Object.entries(ICON_LABELS)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join('');
  elements.iconInput.innerHTML = options;
  elements.groupIconInput.innerHTML = options;
};

const init = async () => {
  state.activity = loadActivity();
  populateIcons();
  bindEvents();
  window.launcher.onButtonStatus(handleStatus);
  window.launcher.onScriptOutput(handleScriptOutput);
  window.launcher.onServiceStatus(handleServiceStatus);
  window.launcher.onWindowsServiceStatus((states) => {
    state.windowsServices = states && typeof states === 'object' ? states : {};
    renderServices();
  });
  try {
    const result = await window.launcher.loadConfig();
    state.config = result.config;
    state.configPath = result.configPath;
    elements.configPath.textContent = result.configPath;
    state.services = await window.launcher.listServices();
    state.windowsServices = await window.launcher.getWindowsServiceStates();
    renderAll();
    if (result.warning) showToast(result.warning, 'error');
  } catch (error) {
    renderAll();
    showToast(error.message || 'Não foi possível carregar a configuração.', 'error');
  }
};

init();
