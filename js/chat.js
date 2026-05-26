/**
 * chat.js — IAPersornal Social Fitness Chat
 * Modo demo: localStorage + BroadcastChannel (aba cruzada).
 * Modo Firebase: ativa quando FIREBASE_CONFIG.DEMO_MODE === false e SDK carregado.
 */

'use strict';

/* ─── Estado global ─────────────────────────────────────────────────── */
const ChatApp = {
  user: null,           // { name, avatar, theme }
  channel: 'geral',
  messages: {},         // { [channel]: Message[] }
  typingTimeout: null,
  emojiPicker: null,
  firebase: null,       // firebase DB reference (modo real)
  bc: null,             // BroadcastChannel para demo multi-aba
  reactions: ['👍','💪','🔥','❤️','😂','🎉'],

  playlists: [
    {
      id: 'pl_hiit',
      name: '⚡ HIIT Beast Mode',
      description: 'Alta intensidade para destruir calorias',
      bpm: '128–140 BPM',
      embedId: '37i9dQZF1DX76Wlfdnj7AP',  // Spotify playlist ID
    },
    {
      id: 'pl_strength',
      name: '💪 Força Máxima',
      description: 'Rock e metal para levantar pesado',
      bpm: '120–135 BPM',
      embedId: '37i9dQZF1DWdxc2dMgFsF3',
    },
    {
      id: 'pl_focus',
      name: '🧠 Deep Focus Gym',
      description: 'Electronic / EDM sem distração',
      bpm: '125–132 BPM',
      embedId: '37i9dQZF1DX8NTLI2TtZa6',
    },
    {
      id: 'pl_pump',
      name: '🎵 Pump Clássico',
      description: 'Hits que todo mundo conhece na academia',
      bpm: '110–125 BPM',
      embedId: '37i9dQZF1DWUVpAXiEPK8P',
    },
  ],

  channels: [
    { id: 'geral',    icon: '💬', label: 'Geral' },
    { id: 'treinos',  icon: '🏋️', label: 'Treinos' },
    { id: 'dieta',    icon: '🥗', label: 'Dieta' },
    { id: 'progresso',icon: '📈', label: 'Progresso' },
    { id: 'musica',   icon: '🎵', label: 'Músicas' },
  ],

  DEMO_MESSAGES: {
    geral: [
      { id: 'dm1', user: 'Barbara', avatar: '👩‍🦰', time: Date.now() - 3600000, text: '🔥 Galera, já treinaram hoje?', reactions: { '💪': ['Wesley'] } },
      { id: 'dm2', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 3000000, text: 'Sim! Dia A — Peito + Tríceps. Bati PR no supino hoje 🏆', reactions: { '🔥': ['Barbara'] } },
      { id: 'dm3', user: 'Barbara', avatar: '👩‍🦰', time: Date.now() - 2400000, text: 'Incrível!! Eu fiz cardio + perna, tô morta 😅', reactions: {} },
      { id: 'dm4', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 1800000, text: 'Boa! Bora pra semana que vem mais forte ainda 💪', reactions: { '❤️': ['Barbara'] } },
    ],
    treinos: [
      { id: 'tm1', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 7200000, text: '📋 Compartilhei meu treino de hoje!', workout: { label: 'Treino A', focus: 'Peito + Tríceps', done: 8, total: 8, duration: '62 min' }, reactions: {} },
      { id: 'tm2', user: 'Barbara', avatar: '👩‍🦰', time: Date.now() - 5400000, text: 'Meu treino foi TER·B — Costas + Bíceps 💪', workout: { label: 'Treino B', focus: 'Costas + Bíceps', done: 7, total: 8, duration: '55 min' }, reactions: { '🔥': ['Wesley'] } },
    ],
    dieta: [
      { id: 'di1', user: 'Barbara', avatar: '👩‍🦰', time: Date.now() - 86400000, text: 'Qual protein vocês usam? Tô testando Whey Concentrado 🥛', reactions: {} },
      { id: 'di2', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 82800000, text: 'Isolado aqui! Menos lactose. No pós-treino com banana 🍌', reactions: { '👍': ['Barbara'] } },
    ],
    progresso: [
      { id: 'pr1', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 172800000, text: '📊 Semana 3 concluída! +1kg de músculo, -0.5kg de gordura 🎯', reactions: { '🔥': ['Barbara'], '🎉': ['Barbara'] } },
    ],
    musica: [
      { id: 'mu1', user: 'Barbara', avatar: '👩‍🦰', time: Date.now() - 43200000, text: '🎵 Que playlist vocês usam no treino? Preciso de dica de música pesada!', reactions: {} },
      { id: 'mu2', user: 'Wesley',  avatar: '🧔',   time: Date.now() - 39600000, text: 'HIIT Beast Mode no Spotify é imbatível! Coloca aqui na aba Playlists 👇', reactions: { '🔥': ['Barbara'] } },
    ],
  },
};

/* ─── Init ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initUser();
  initBroadcastChannel();
  initChannels();
  loadChannel('geral');
  initPlaylists();
  initEmojiPicker();
  initInputBar();
  updateOnlineUsers();
  updateTrainingStatus();
  checkFirebaseMode();
  setInterval(updateTrainingStatus, 30000);
});

/* ─── Usuário atual ─────────────────────────────────────────────────── */
function initUser() {
  const sess = JSON.parse(sessionStorage.getItem('ia_session') || '{}');
  const name = sess.name || sess.username || 'Você';
  const isWesley = name.toLowerCase().includes('wesley');
  ChatApp.user = {
    name,
    avatar: isWesley ? '🧔' : '👩‍🦰',
    theme:  isWesley ? 'wesley' : 'barbara',
    training: !!(localStorage.getItem('workoutStartTime') && Date.now() - +localStorage.getItem('workoutStartTime') < 7200000),
  };

  const el = document.getElementById('chat-user-name');
  if (el) el.textContent = ChatApp.user.name;

  const av = document.getElementById('chat-user-avatar');
  if (av) av.textContent = ChatApp.user.avatar;

  const st = document.getElementById('chat-user-status');
  if (st) {
    if (ChatApp.user.training) {
      st.textContent = '🔴 Treinando agora';
      st.className = 'ou-status training';
    } else {
      st.textContent = '🟢 Online';
      st.className = 'ou-status online';
    }
  }
}

/* ─── BroadcastChannel (demo multi-aba) ─────────────────────────────── */
function initBroadcastChannel() {
  if (!window.BroadcastChannel) return;
  ChatApp.bc = new BroadcastChannel('iapersornal_chat');
  ChatApp.bc.onmessage = (e) => {
    const { type, payload } = e.data || {};
    if (type === 'new_message') {
      const msgs = ChatApp.messages[payload.channel] || [];
      if (!msgs.find(m => m.id === payload.msg.id)) {
        msgs.push(payload.msg);
        ChatApp.messages[payload.channel] = msgs;
        if (payload.channel === ChatApp.channel) {
          appendMessage(payload.msg);
          scrollToBottom();
        }
        updateChannelBadge(payload.channel);
      }
    }
    if (type === 'typing') {
      showTypingFor(payload.user);
    }
  };
}

/* ─── Canais ────────────────────────────────────────────────────────── */
function initChannels() {
  const list = document.getElementById('channel-list');
  if (!list) return;
  list.innerHTML = ChatApp.channels.map(ch => `
    <button class="ch-item${ch.id === ChatApp.channel ? ' active' : ''}" data-ch="${ch.id}" onclick="switchChannel('${ch.id}')">
      <span class="ch-icon">${ch.icon}</span>
      <span class="ch-label">${ch.label}</span>
      <span class="ch-badge" id="badge-${ch.id}" style="display:none">0</span>
    </button>
  `).join('');
}

function switchChannel(id) {
  ChatApp.channel = id;
  document.querySelectorAll('.ch-item').forEach(b => b.classList.toggle('active', b.dataset.ch === id));
  const badge = document.getElementById(`badge-${id}`);
  if (badge) badge.style.display = 'none';

  const titleEl = document.getElementById('chat-channel-title');
  const ch = ChatApp.channels.find(c => c.id === id);
  if (titleEl && ch) titleEl.textContent = `${ch.icon} ${ch.label}`;

  const feed = document.getElementById('chat-feed');
  if (feed) feed.innerHTML = '';

  loadChannel(id);
  closeSidebar();
}

function loadChannel(id) {
  if (!ChatApp.messages[id]) {
    // Carrega mensagens demo do localStorage ou usa defaults
    const stored = localStorage.getItem(`chat_${id}`);
    ChatApp.messages[id] = stored ? JSON.parse(stored) : (ChatApp.DEMO_MESSAGES[id] || []);
  }
  ChatApp.messages[id].forEach(msg => appendMessage(msg));
  scrollToBottom();
}

function updateChannelBadge(channelId) {
  if (channelId === ChatApp.channel) return;
  const badge = document.getElementById(`badge-${channelId}`);
  if (!badge) return;
  const current = parseInt(badge.textContent) || 0;
  badge.textContent = current + 1;
  badge.style.display = '';
}

/* ─── Mensagens ──────────────────────────────────────────────────────── */
function appendMessage(msg) {
  const feed = document.getElementById('chat-feed');
  if (!feed) return;

  const isOwn = msg.user === ChatApp.user.name;
  const timeStr = formatTime(msg.time);

  let bubbleContent = '';

  if (msg.workout) {
    // Card de treino compartilhado
    bubbleContent = `
      <div class="msg-workout-card">
        <div class="mwc-header">
          <span class="mwc-icon">🏋️</span>
          <span class="mwc-title">${msg.workout.label}</span>
        </div>
        <div class="mwc-focus">${msg.workout.focus}</div>
        <div class="mwc-stats">
          <span>✅ ${msg.workout.done}/${msg.workout.total} exercícios</span>
          <span>⏱ ${msg.workout.duration}</span>
        </div>
        ${msg.text ? `<div class="mwc-caption">"${msg.text}"</div>` : ''}
      </div>
    `;
  } else {
    bubbleContent = `<p class="msg-text">${escapeHtml(msg.text || '')}</p>`;
  }

  const reactionHtml = buildReactionHtml(msg);

  const wrapper = document.createElement('div');
  wrapper.className = `msg-wrapper${isOwn ? ' own' : ''}`;
  wrapper.dataset.msgId = msg.id;
  wrapper.innerHTML = `
    ${!isOwn ? `<div class="msg-avatar">${msg.avatar || '🧑'}</div>` : ''}
    <div class="msg-body">
      ${!isOwn ? `<div class="msg-name">${escapeHtml(msg.user)}</div>` : ''}
      <div class="msg-bubble">
        ${bubbleContent}
        <div class="msg-reaction-bar">
          ${ChatApp.reactions.map(r => `<button class="reaction-btn" onclick="addReaction('${msg.id}','${r}')">${r}</button>`).join('')}
        </div>
        <div class="msg-meta">
          <span class="msg-time">${timeStr}</span>
        </div>
      </div>
      ${reactionHtml}
    </div>
  `;

  feed.appendChild(wrapper);
}

function buildReactionHtml(msg) {
  if (!msg.reactions || !Object.keys(msg.reactions).length) return '';
  const parts = Object.entries(msg.reactions).map(([emoji, users]) =>
    `<button class="msg-reaction" onclick="addReaction('${msg.id}','${emoji}')">${emoji} <span>${users.length}</span></button>`
  );
  return `<div class="msg-reactions">${parts.join('')}</div>`;
}

function addReaction(msgId, emoji) {
  const msgs = ChatApp.messages[ChatApp.channel] || [];
  const msg = msgs.find(m => m.id === msgId);
  if (!msg) return;

  if (!msg.reactions) msg.reactions = {};
  if (!msg.reactions[emoji]) msg.reactions[emoji] = [];

  const idx = msg.reactions[emoji].indexOf(ChatApp.user.name);
  if (idx >= 0) {
    msg.reactions[emoji].splice(idx, 1);
    if (!msg.reactions[emoji].length) delete msg.reactions[emoji];
  } else {
    msg.reactions[emoji].push(ChatApp.user.name);
  }

  saveMessages(ChatApp.channel);
  refreshReactions(msgId, msg);
}

function refreshReactions(msgId, msg) {
  const wrapper = document.querySelector(`.msg-wrapper[data-msg-id="${msgId}"]`);
  if (!wrapper) return;
  const old = wrapper.querySelector('.msg-reactions');
  if (old) old.remove();
  const html = buildReactionHtml(msg);
  if (html) {
    wrapper.querySelector('.msg-body').insertAdjacentHTML('beforeend', html);
  }
}

function sendMessage(text, workoutData) {
  if (!text && !workoutData) return;

  const msg = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    user: ChatApp.user.name,
    avatar: ChatApp.user.avatar,
    time: Date.now(),
    text: text || '',
    reactions: {},
  };

  if (workoutData) msg.workout = workoutData;

  const msgs = ChatApp.messages[ChatApp.channel] || [];
  msgs.push(msg);
  ChatApp.messages[ChatApp.channel] = msgs;

  saveMessages(ChatApp.channel);
  appendMessage(msg);
  scrollToBottom();

  // Broadcast para outras abas
  if (ChatApp.bc) {
    ChatApp.bc.postMessage({ type: 'new_message', payload: { channel: ChatApp.channel, msg } });
  }

  // Firebase (se ativo)
  if (ChatApp.firebase) {
    ChatApp.firebase.ref(`chat/${ChatApp.channel}`).push(msg).catch(console.error);
  }
}

function saveMessages(channel) {
  try {
    const msgs = ChatApp.messages[channel] || [];
    localStorage.setItem(`chat_${channel}`, JSON.stringify(msgs.slice(-100)));
  } catch (e) {
    console.warn('chat save error', e);
  }
}

/* ─── Input Bar ─────────────────────────────────────────────────────── */
function initInputBar() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!input || !sendBtn) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  });

  input.addEventListener('input', () => {
    // auto-resize
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    // typing indicator broadcast
    broadcastTyping();
  });

  sendBtn.addEventListener('click', doSend);
}

function doSend() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  sendMessage(text);
  hideEmojiPicker();
}

/* ─── Typing indicator ──────────────────────────────────────────────── */
function broadcastTyping() {
  if (ChatApp.bc) {
    ChatApp.bc.postMessage({ type: 'typing', payload: { user: ChatApp.user.name } });
  }
}

function showTypingFor(userName) {
  if (userName === ChatApp.user.name) return;
  const indicator = document.getElementById('typing-indicator');
  if (!indicator) return;
  indicator.querySelector('.typing-name').textContent = userName;
  indicator.style.display = 'flex';
  clearTimeout(ChatApp.typingTimeout);
  ChatApp.typingTimeout = setTimeout(() => {
    indicator.style.display = 'none';
  }, 2500);
}

/* ─── Emoji Picker ──────────────────────────────────────────────────── */
const EMOJI_CATEGORIES = {
  '😀': ['😀','😁','😂','🤣','😃','😄','😅','😆','🥹','😊','😋','😎','🤩','🥳','😜','🤪'],
  '❤️': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','💕','💞','💓','💗','💖','💝'],
  '👍': ['👍','👎','👏','🙌','🤝','🤜','💪','🦾','✌️','🤞','🖖','☝️','👆','👇','👈','👉'],
  '🔥': ['🔥','💥','⚡','🌟','✨','💫','🎯','🏆','🥇','🎖️','🏅','🎗️','🎪','🎭','🎨','🎬'],
  '🍎': ['🍎','🍊','🍋','🍇','🍓','🥦','🥕','🥑','🍗','🥩','🍳','🥗','🥙','🌮','🍱','🥤'],
  '🏋️': ['🏋️','🤸','🧘','🏃','🚴','⛹️','🤾','🤺','🧗','🏊','🤽','🎽','⚽','🏀','🎾','🎱'],
};

function initEmojiPicker() {
  const picker = document.getElementById('emoji-picker');
  if (!picker) return;

  const tabs = Object.keys(EMOJI_CATEGORIES);
  picker.innerHTML = `
    <div class="ep-tabs">${tabs.map((t,i) => `<button class="ep-tab${i===0?' active':''}" data-cat="${t}" onclick="switchEmojiCat('${t}')">${t}</button>`).join('')}</div>
    <div class="ep-grid" id="ep-grid">${EMOJI_CATEGORIES[tabs[0]].map(e => `<button class="ep-emoji" onclick="insertEmoji('${e}')">${e}</button>`).join('')}</div>
  `;
}

function switchEmojiCat(cat) {
  document.querySelectorAll('.ep-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  const grid = document.getElementById('ep-grid');
  if (grid) grid.innerHTML = EMOJI_CATEGORIES[cat].map(e => `<button class="ep-emoji" onclick="insertEmoji('${e}')">${e}</button>`).join('');
}

function insertEmoji(emoji) {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const pos = input.selectionStart;
  const val = input.value;
  input.value = val.slice(0, pos) + emoji + val.slice(pos);
  input.selectionStart = input.selectionEnd = pos + emoji.length;
  input.focus();
}

function toggleEmojiPicker() {
  const picker = document.getElementById('emoji-picker');
  if (!picker) return;
  const shown = picker.style.display === 'grid';
  picker.style.display = shown ? 'none' : 'grid';
}

function hideEmojiPicker() {
  const picker = document.getElementById('emoji-picker');
  if (picker) picker.style.display = 'none';
}

/* ─── Online Users ──────────────────────────────────────────────────── */
function updateOnlineUsers() {
  const list = document.getElementById('online-users-list');
  if (!list) return;

  // Em demo, mostra usuários conhecidos do localStorage
  const knownUsers = [
    { name: 'Wesley', avatar: '🧔', training: isCurrentlyTraining('wesley') },
    { name: 'Barbara', avatar: '👩‍🦰', training: isCurrentlyTraining('barbara') },
  ];

  list.innerHTML = knownUsers.map(u => `
    <div class="ou-item">
      <div class="ou-avatar-wrap">
        <span class="ou-avatar">${u.avatar}</span>
        <span class="ou-dot ${u.training ? 'training' : 'online'}"></span>
      </div>
      <div class="ou-info">
        <span class="ou-name">${u.name}</span>
        <span class="ou-status">${u.training ? '🔴 Treinando' : '🟢 Online'}</span>
      </div>
    </div>
  `).join('');

  const countEl = document.getElementById('online-count');
  if (countEl) countEl.textContent = knownUsers.length;
}

function isCurrentlyTraining(userSlug) {
  // Verifica se o usuário iniciou treino nas últimas 2 horas
  const key = userSlug === 'wesley' ? 'workoutStartTime' : `workoutStartTime_barbara`;
  const t = localStorage.getItem(key);
  return !!(t && Date.now() - +t < 7200000);
}

function updateTrainingStatus() {
  updateOnlineUsers();
  const training = ChatApp.user && ChatApp.user.training;
  const toast = document.getElementById('training-toast');
  if (toast) toast.style.display = training ? 'flex' : 'none';
}

/* ─── Sidebar mobile ─────────────────────────────────────────────────── */
function toggleSidebar() {
  const sidebar = document.querySelector('.chat-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

function closeSidebar() {
  const sidebar = document.querySelector('.chat-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

/* ─── Playlists ──────────────────────────────────────────────────────── */
function initPlaylists() {
  const grid = document.getElementById('playlist-grid');
  if (!grid) return;

  grid.innerHTML = ChatApp.playlists.map(pl => `
    <div class="pl-card" onclick="loadPlaylist('${pl.id}')">
      <div class="pl-card__icon">🎵</div>
      <div class="pl-card__info">
        <div class="pl-card__name">${pl.name}</div>
        <div class="pl-card__desc">${pl.description}</div>
        <div class="pl-card__bpm">⚡ ${pl.bpm}</div>
      </div>
      <button class="pl-card__play">▶</button>
    </div>
  `).join('');
}

function loadPlaylist(plId) {
  const pl = ChatApp.playlists.find(p => p.id === plId);
  if (!pl) return;

  const player = document.getElementById('spotify-player');
  const info   = document.getElementById('now-playing-info');

  if (player) {
    player.innerHTML = `
      <iframe
        style="border-radius:12px"
        src="https://open.spotify.com/embed/playlist/${pl.embedId}?utm_source=generator&theme=0"
        width="100%" height="352" frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    `;
    player.style.display = 'block';
  }

  if (info) {
    info.textContent = `▶ ${pl.name}`;
  }

  // Marca card como ativo
  document.querySelectorAll('.pl-card').forEach(c => c.classList.remove('active'));
  const activeCard = [...document.querySelectorAll('.pl-card')].find(c =>
    c.querySelector('.pl-card__name').textContent === pl.name
  );
  if (activeCard) activeCard.classList.add('active');

  // Muda para view de playlists
  showView('playlists');
}

/* ─── Views (chat / playlists) ───────────────────────────────────────── */
function showView(view) {
  document.getElementById('view-chat').style.display      = view === 'chat'      ? 'flex' : 'none';
  document.getElementById('view-playlists').style.display = view === 'playlists' ? 'flex' : 'none';

  document.querySelectorAll('.view-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
}

/* ─── Compartilhar treino no chat ────────────────────────────────────── */
function shareWorkoutInChat() {
  const wData = window._currentWorkoutShare;
  if (!wData || !wData.label) {
    alert('Complete um treino primeiro para compartilhar! 💪');
    return;
  }
  sendMessage('', {
    label:    wData.label,
    focus:    wData.focus,
    done:     wData.doneCount,
    total:    wData.totalCount,
    duration: wData.duration || getWorkoutElapsed(),
  });
}

/* ─── Firebase Mode ──────────────────────────────────────────────────── */
function checkFirebaseMode() {
  const cfg = window.FIREBASE_CONFIG;
  const banner = document.getElementById('firebase-banner');

  if (!cfg || cfg.DEMO_MODE) {
    if (banner) banner.style.display = 'flex';
    return;
  }

  // Tenta inicializar Firebase se SDK disponível
  if (typeof firebase !== 'undefined') {
    try {
      const app = firebase.initializeApp(cfg);
      ChatApp.firebase = firebase.database(app);
      listenFirebase();
      if (banner) banner.style.display = 'none';
    } catch (e) {
      console.warn('Firebase init error:', e);
    }
  }
}

function listenFirebase() {
  if (!ChatApp.firebase) return;
  ChatApp.channels.forEach(ch => {
    ChatApp.firebase.ref(`chat/${ch.id}`).on('child_added', snap => {
      const msg = snap.val();
      if (!msg) return;
      const msgs = ChatApp.messages[ch.id] || [];
      if (!msgs.find(m => m.id === msg.id)) {
        msgs.push(msg);
        ChatApp.messages[ch.id] = msgs;
        if (ch.id === ChatApp.channel) {
          appendMessage(msg);
          scrollToBottom();
        }
        updateChannelBadge(ch.id);
      }
    });
  });
}

/* ─── Utilidades ─────────────────────────────────────────────────────── */
function scrollToBottom() {
  const feed = document.getElementById('chat-feed');
  if (feed) feed.scrollTop = feed.scrollHeight;
}

function formatTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'ontem ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

// Expõe funções globais necessárias para handlers HTML
Object.assign(window, {
  switchChannel,
  toggleSidebar,
  closeSidebar,
  showView,
  toggleEmojiPicker,
  insertEmoji,
  switchEmojiCat,
  addReaction,
  shareWorkoutInChat,
  loadPlaylist,
  doSend,
  broadcastTyping,
});
