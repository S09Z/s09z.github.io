/* ============ Terminal addons JS ============
   Boot sequence · Tweaks panel · Command palette · Theme + accent + cursor + motion + scanlines
============================================ */
(function(){
  'use strict';

  /* ── STATE (persisted to localStorage) ───────── */
  const KEY = 's09z.terminal.tweaks';
  const DEFAULTS = {
    accent: 'violet',
    theme: 'dark',
    scan: 'normal',
    cursor: 'ring',
    motion: 'on',
  };
  let state = (() => {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch(_) { return Object.assign({}, DEFAULTS); }
  })();

  function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(_){} }

  function apply(){
    document.body.dataset.accent = state.accent === 'violet' ? '' : state.accent;
    document.body.classList.toggle('theme-light', state.theme === 'light');
    document.body.dataset.scan  = state.scan === 'normal' ? '' : state.scan;
    document.body.dataset.cursor = state.cursor === 'ring'   ? '' : state.cursor;
    document.body.classList.toggle('motion-off', state.motion === 'off');
    // Reflect active controls
    document.querySelectorAll('[data-tw]').forEach(el => {
      const [key, val] = el.dataset.tw.split(':');
      const isActive = state[key] === val;
      if(el.classList.contains('tw-swatch')) el.classList.toggle('active', isActive);
      else el.classList.toggle('on', isActive);
    });
  }

  /* ── BOOT SEQUENCE ──────────────────────────── */
  function boot(){
    const boot = document.getElementById('boot');
    if(!boot) return;
    if(sessionStorage.getItem('s09z.booted') === '1'){
      boot.classList.add('gone');
      return;
    }
    const log = boot.querySelector('.boot-log');
    const prompt = boot.querySelector('.boot-prompt');
    const lines = [
      ['ok', 'mounting <b>/home/oat</b> ... ok'],
      ['ok', 'loading kernel modules · <b>kinetic-type@1.0</b>'],
      ['ok', 'init <b>cursor.handlers</b> · proximity-warp R=140'],
      ['info', 'connecting to <span class="accent">noise-mesh</span> · purple drift'],
      ['ok', 'fontconfig · <b>JetBrains Mono</b>, <b>Space Grotesk</b>, <b>Noto Sans Thai</b>'],
      ['ok', 'crt scanlines · ENABLED'],
      ['info', 'fetching brand assets · <b>simpleicons</b> · 24 modules'],
      ['warn', 'projects.json · stub data · supply real ones'],
      ['ok', 'compositor ready · entering userland'],
      ['done', 'hello, world. <span class="accent">สวัสดี.</span>'],
    ];
    let i = 0;
    function next(){
      if(i >= lines.length){
        prompt.style.animationDelay = '0s';
        prompt.style.opacity = 1;
        setTimeout(()=>{
          boot.classList.add('gone');
          sessionStorage.setItem('s09z.booted', '1');
        }, 700);
        return;
      }
      const [lvl, msg] = lines[i];
      const div = document.createElement('div');
      div.className = 'boot-line ' + lvl;
      div.style.animationDelay = '0s';
      div.innerHTML = `<span>${msg}</span>`;
      log.appendChild(div);
      i++;
      setTimeout(next, 120 + Math.random()*100);
    }
    setTimeout(next, 250);
  }

  /* ── TWEAKS PANEL ───────────────────────────── */
  function tweaks(){
    const btn = document.getElementById('twToggle');
    const panel = document.getElementById('twPanel');
    if(!btn || !panel) return;
    const close = document.getElementById('twClose');
    const open = () => { panel.classList.add('open'); btn.classList.add('open'); };
    const hide = () => { panel.classList.remove('open'); btn.classList.remove('open'); };
    btn.addEventListener('click', () => panel.classList.contains('open') ? hide() : open());
    close.addEventListener('click', hide);
    document.querySelectorAll('[data-tw]').forEach(el => {
      el.addEventListener('click', () => {
        const [key, val] = el.dataset.tw.split(':');
        state[key] = val;
        apply();
        save();
      });
    });
  }

  /* ── COMMAND PALETTE ────────────────────────── */
  function commandPalette(){
    const overlay = document.getElementById('cmd');
    const input = document.getElementById('cmdInput');
    const history = document.getElementById('cmdHistory');
    if(!overlay || !input || !history) return;

    const ROUTES = {
      'about':   { sel: '#about',   say: 'jumping to about ...' },
      'stack':   { sel: '#about',   say: 'stack moved — see the running strip above about' },
      'skills':  { sel: '#about',   say: 'stack moved — see the running strip above about' },
      'work':    { sel: '#work',    say: 'opening work log ...' },
      'log':     { sel: '#work',    say: 'opening work log ...' },
      'experience': { sel: '#work', say: 'opening work log ...' },
      'projects':{ sel: '#projects', say: 'loading projects ...' },
      'contact': { sel: '#contact', say: 'opening contact ...' },
      'ping':    { sel: '#contact', say: 'opening contact ...' },
      'top':     { sel: '#top',     say: 'scrolling to top ...' },
      'home':    { sel: '#top',     say: 'scrolling to top ...' },
    };

    const HELP_LINES = [
      'navigate · <b>about</b> · <b>projects</b> · <b>work</b> · <b>contact</b> · <b>top</b>',
      'theme    · <b>theme dark</b> / <b>theme light</b>',
      'accent   · <b>accent violet | cyan | amber | green</b>',
      'cursor   · <b>cursor ring | dot | native</b>',
      'motion   · <b>motion on | off</b>',
      'scan     · <b>scan normal | low | high | off</b>',
      'misc     · <b>whoami</b> · <b>contact</b> · <b>github</b> · <b>email</b> · <b>clear</b> · <b>exit</b>',
    ];

    function pushLine(cls, html){
      const d = document.createElement('div');
      d.className = 'cmd-line ' + cls;
      d.innerHTML = '<span>' + html + '</span>';
      history.appendChild(d);
      history.scrollTop = history.scrollHeight;
    }
    function clearHistory(){ history.innerHTML = ''; }
    function welcome(){
      clearHistory();
      pushLine('out', '<b>s09z::operator</b> v.2026.01 · type <b>help</b> for commands · <b>esc</b> to close');
    }

    function exec(raw){
      const cmd = raw.trim();
      if(!cmd) return;
      pushLine('you', cmd);
      const [name, ...rest] = cmd.toLowerCase().split(/\s+/);
      const arg = rest.join(' ');

      if(ROUTES[name]){
        pushLine('ok', ROUTES[name].say);
        const target = document.querySelector(ROUTES[name].sel);
        if(target){
          setTimeout(()=>{
            close();
            target.scrollIntoView({behavior:'smooth', block:'start'});
          }, 280);
        }
        return;
      }

      switch(name){
        case 'help':
        case '?':
          HELP_LINES.forEach(l => pushLine('out', l));
          return;
        case 'clear':
        case 'cls':
          clearHistory();
          return;
        case 'whoami':
          pushLine('out', 'Ittichai "Oat" Boonyarakthunya · Software Engineer · Bangkok, TH');
          return;
        case 'exit':
        case 'q':
        case 'quit':
          close();
          return;
        case 'email':
          pushLine('ok', 'opening mail client ...');
          setTimeout(()=>{ window.location.href = 'mailto:i.boonyarakthunya@gmail.com'; }, 200);
          return;
        case 'github':
          pushLine('ok', 'opening github.com/S09Z ...');
          setTimeout(()=>{ window.open('https://github.com/S09Z', '_blank'); }, 200);
          return;
        case 'theme': {
          if(arg === 'dark' || arg === 'light'){
            state.theme = arg; apply(); save();
            pushLine('ok', 'theme · ' + arg);
          } else pushLine('err', 'usage: theme <b>dark|light</b>');
          return;
        }
        case 'accent': {
          if(['violet','cyan','amber','green'].includes(arg)){
            state.accent = arg; apply(); save();
            pushLine('ok', 'accent · ' + arg);
          } else pushLine('err', 'usage: accent <b>violet|cyan|amber|green</b>');
          return;
        }
        case 'cursor': {
          if(['ring','dot','native'].includes(arg)){
            state.cursor = arg; apply(); save();
            pushLine('ok', 'cursor · ' + arg);
          } else pushLine('err', 'usage: cursor <b>ring|dot|native</b>');
          return;
        }
        case 'motion': {
          if(arg === 'on' || arg === 'off'){
            state.motion = arg; apply(); save();
            pushLine('ok', 'motion · ' + arg);
          } else pushLine('err', 'usage: motion <b>on|off</b>');
          return;
        }
        case 'scan': {
          if(['normal','low','high','off'].includes(arg)){
            state.scan = arg; apply(); save();
            pushLine('ok', 'scanlines · ' + arg);
          } else pushLine('err', 'usage: scan <b>normal|low|high|off</b>');
          return;
        }
        case 'sudo':
          pushLine('err', 'permission denied. nice try though.');
          return;
        case 'ls':
          pushLine('out', 'about/  stack/  work/  projects/  contact/');
          return;
        case 'date':
          pushLine('out', new Date().toLocaleString('en-GB', {timeZone:'Asia/Bangkok'}) + ' (ICT)');
          return;
        default:
          pushLine('err', 'unknown command: <b>' + name + '</b> · type <b>help</b>');
      }
    }

    let cmdHistory = [];
    let hi = -1;

    function open(){
      overlay.classList.add('open');
      welcome();
      setTimeout(()=>input.focus(), 50);
    }
    function close(){
      overlay.classList.remove('open');
      input.value = '';
      hi = -1;
    }

    addEventListener('keydown', e => {
      const tag = e.target.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA';
      if(!overlay.classList.contains('open')){
        if(e.key === '/' && !inField){ e.preventDefault(); open(); }
      } else {
        if(e.key === 'Escape'){ e.preventDefault(); close(); }
      }
    });

    input.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        e.preventDefault();
        const v = input.value;
        if(v.trim()){ cmdHistory.push(v); hi = cmdHistory.length; }
        exec(v);
        input.value = '';
      } else if(e.key === 'ArrowUp'){
        e.preventDefault();
        if(hi > 0){ hi--; input.value = cmdHistory[hi] || ''; }
      } else if(e.key === 'ArrowDown'){
        e.preventDefault();
        if(hi < cmdHistory.length - 1){ hi++; input.value = cmdHistory[hi] || ''; }
        else { hi = cmdHistory.length; input.value = ''; }
      }
    });

    overlay.addEventListener('click', e => {
      if(e.target === overlay) close();
    });
  }

  /* ── BOOT ──────────────────────────────────── */
  function init(){
    apply();
    boot();
    tweaks();
    commandPalette();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
