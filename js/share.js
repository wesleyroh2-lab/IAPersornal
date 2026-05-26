/* ============================================================
   IAPersornal — share.js
   Gerador de Card de Treino (Canvas API) + Web Share API
   Suporte: Instagram Stories, WhatsApp, Telegram, Download
   ============================================================ */

/* ── Gerar card de treino no Canvas ── */
async function generateShareCard(opts = {}) {
  const {
    userName    = 'Atleta',
    workoutName = 'TREINO',
    focusLabel  = '',
    doneCount   = 0,
    totalCount  = 0,
    duration    = '',
    theme       = 'blue',
  } = opts;

  const W = 540, H = 960; // 9:16 para Stories
  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /* ── Background gradient ── */
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  if (theme === 'barbara') {
    bgGrad.addColorStop(0, '#1E0B4B');
    bgGrad.addColorStop(0.5, '#2D0D6B');
    bgGrad.addColorStop(1, '#1A0529');
  } else {
    bgGrad.addColorStop(0, '#0A1628');
    bgGrad.addColorStop(0.5, '#0D1E42');
    bgGrad.addColorStop(1, '#060C1A');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  /* ── Círculos decorativos ── */
  function drawBlob(x, y, r, color) {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (theme === 'barbara') {
    drawBlob(W * 0.8, H * 0.15, 200, 'rgba(124,58,237,0.35)');
    drawBlob(W * 0.1, H * 0.7,  180, 'rgba(236,72,153,0.25)');
    drawBlob(W * 0.5, H * 0.5,  250, 'rgba(124,58,237,0.08)');
  } else {
    drawBlob(W * 0.8, H * 0.15, 200, 'rgba(37,99,235,0.35)');
    drawBlob(W * 0.1, H * 0.7,  180, 'rgba(6,182,212,0.25)');
    drawBlob(W * 0.5, H * 0.5,  250, 'rgba(37,99,235,0.08)');
  }

  /* ── Grade de pontos decorativa ── */
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  for (let gx = 30; gx < W; gx += 40) {
    for (let gy = 30; gy < H; gy += 40) {
      ctx.beginPath();
      ctx.arc(gx, gy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ── Linha decorativa no topo ── */
  const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
  if (theme === 'barbara') {
    lineGrad.addColorStop(0, 'rgba(124,58,237,0)');
    lineGrad.addColorStop(0.5, 'rgba(236,72,153,0.9)');
    lineGrad.addColorStop(1, 'rgba(124,58,237,0)');
  } else {
    lineGrad.addColorStop(0, 'rgba(37,99,235,0)');
    lineGrad.addColorStop(0.5, 'rgba(6,182,212,0.9)');
    lineGrad.addColorStop(1, 'rgba(37,99,235,0)');
  }
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, W, 3);

  /* ── Logo / Brand ── */
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText('🏋️ IAPersornal', 44, 70);

  /* ── Badge "TREINO CONCLUÍDO" ── */
  const badgeY = 110;
  const accent1 = theme === 'barbara' ? '#7C3AED' : '#2563EB';
  const accent2 = theme === 'barbara' ? '#EC4899' : '#06B6D4';

  const badgeGrad = ctx.createLinearGradient(44, 0, 220, 0);
  badgeGrad.addColorStop(0, accent1);
  badgeGrad.addColorStop(1, accent2);

  ctx.fillStyle = badgeGrad;
  roundRect(ctx, 44, badgeY, 176, 30, 99);
  ctx.fill();

  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.letterSpacing = '1px';
  ctx.fillText('✓  TREINO CONCLUÍDO', 62, badgeY + 20);

  /* ── Nome do usuário ── */
  ctx.font = 'bold 54px Arial, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(userName.toUpperCase(), 44, 230);

  /* ── Linha separadora ── */
  const sepGrad = ctx.createLinearGradient(44, 0, W - 44, 0);
  sepGrad.addColorStop(0, accent1);
  sepGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sepGrad;
  ctx.fillRect(44, 250, W - 88, 2);

  /* ── Workout name ── */
  const wGrad = ctx.createLinearGradient(0, 0, W * 0.7, 0);
  wGrad.addColorStop(0, '#FFFFFF');
  wGrad.addColorStop(1, 'rgba(255,255,255,0.6)');
  ctx.fillStyle = wGrad;
  ctx.font = 'bold 38px Arial, sans-serif';
  ctx.fillText(workoutName, 44, 310);

  if (focusLabel) {
    ctx.font = '500 18px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillText(focusLabel, 44, 345);
  }

  /* ── Stats cards ── */
  const statsY = 400;
  const statCards = [
    { label: 'EXERCÍCIOS', value: `${doneCount}/${totalCount}`, icon: '💪' },
    { label: 'CONCLUÍDOS', value: `${totalCount > 0 ? Math.round(doneCount/totalCount*100) : 0}%`, icon: '🎯' },
    { label: 'DURAÇÃO', value: duration || '—', icon: '⏱' },
  ];

  const cardW = (W - 88 - 16) / 3;

  statCards.forEach((stat, i) => {
    const sx = 44 + i * (cardW + 8);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    roundRect(ctx, sx, statsY, cardW, 110, 14);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    roundRect(ctx, sx, statsY, cardW, 110, 14);
    ctx.stroke();

    ctx.font = '22px Arial, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(stat.icon, sx + 14, statsY + 36);

    ctx.font = 'bold 26px Arial, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    const vW = ctx.measureText(stat.value).width;
    const vX = sx + (cardW - vW) / 2;
    ctx.fillText(stat.value, vX, statsY + 75);

    ctx.font = 'bold 9px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    const lW = ctx.measureText(stat.label).width;
    const lX = sx + (cardW - lW) / 2;
    ctx.fillText(stat.label, lX, statsY + 96);
  });

  /* ── Mensagem motivacional ── */
  const msgs = [
    'Consistência é o segredo!',
    'Você é mais forte do que imagina.',
    'Cada rep conta. Continue!',
    'Progresso, não perfeição.',
    'Mais um dia, mais um treino! 🔥',
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];

  ctx.font = 'italic 500 20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.42)';
  ctx.fillText(`"${msg}"`, 44, H - 120);

  /* ── Data ── */
  const today = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  ctx.font = '500 14px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText(today, 44, H - 55);

  /* ── Linha no rodapé ── */
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H - 40, W, 40);

  ctx.font = 'bold 11px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('iapersornal.app  •  Personal Trainer IA', 44, H - 14);

  return canvas;
}

/* ── Helper: RoundRect ── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── Abrir o modal de compartilhamento ── */
async function openShareModal(workoutData = {}) {
  const user  = (typeof getSessionUser === 'function') ? getSessionUser() : null;
  const theme = user?.id === 'barbara' ? 'barbara' : 'blue';

  const canvas = await generateShareCard({
    userName:    user?.displayName || 'Atleta',
    workoutName: workoutData.label || workoutData.focus || 'TREINO',
    focusLabel:  workoutData.focus || '',
    doneCount:   workoutData.doneCount || 0,
    totalCount:  workoutData.totalCount || 0,
    duration:    workoutData.duration || getWorkoutElapsed(),
    theme,
  });

  /* Mostrar preview no modal */
  const wrap = document.getElementById('share-canvas-wrap');
  if (wrap) {
    wrap.innerHTML = '';
    wrap.appendChild(canvas);
  }

  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.add('show');

  /* Guardar canvas globalmente para botões usarem */
  window._shareCanvas = canvas;
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.remove('show');
}

/* ── Tempo de treino (elapsed) ── */
function getWorkoutElapsed() {
  try {
    const start = localStorage.getItem('workoutStartTime');
    if (!start) return '';
    const elapsed = Date.now() - parseInt(start);
    if (isNaN(elapsed) || elapsed < 0) return '';
    const mins = Math.floor(elapsed / 60000);
    if (mins < 1) return '<1 min';
    if (mins < 60) return `${mins} min`;
    return `${Math.floor(mins/60)}h${(mins%60).toString().padStart(2,'0')}`;
  } catch { return ''; }
}

function startWorkoutClock() {
  try {
    if (!localStorage.getItem('workoutStartTime')) {
      localStorage.setItem('workoutStartTime', Date.now().toString());
    }
  } catch {}
}

function resetWorkoutClock() {
  try { localStorage.removeItem('workoutStartTime'); } catch {}
}

/* ── Botão: Share nativo (Web Share API) ── */
async function shareNative() {
  const canvas = window._shareCanvas;
  if (!canvas) return;
  try {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    const file = new File([blob], 'treino-iapersornal.png', { type: 'image/png' });
    const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
    if (canShareFile) {
      await navigator.share({ files: [file], title: '🏋️ Meu Treino — IAPersornal' });
    } else if (navigator.share) {
      await navigator.share({ title: '🏋️ Meu Treino', text: 'Acabei meu treino no IAPersornal!' });
    } else {
      downloadCard();
    }
  } catch (err) {
    if (err.name !== 'AbortError') downloadCard();
  }
}

/* ── Botão: WhatsApp ── */
function shareWhatsApp() {
  const user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
  const name = user?.displayName || 'Atleta';
  const elapsed = getWorkoutElapsed();
  const text = `🏋️ *Treino Concluído!* 💪\n\n✅ ${name} acabou de terminar seu treino no *IAPersornal*.\n⏱ Duração: ${elapsed || '—'}\n\n_Personal Trainer IA — iapersornal.app_`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

/* ── Botão: Telegram ── */
function shareTelegram() {
  const user = (typeof getSessionUser === 'function') ? getSessionUser() : null;
  const name = user?.displayName || 'Atleta';
  const text = `🏋️ ${name} concluiu o treino no IAPersornal! 💪`;
  window.open(`https://t.me/share/url?url=https://iapersornal.app&text=${encodeURIComponent(text)}`, '_blank');
}

/* ── Botão: Download ── */
function downloadCard() {
  const canvas = window._shareCanvas;
  if (!canvas) return;
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `treino-iapersornal-${Date.now()}.png`;
  link.click();
}

/* ── Confetti celebration ── */
function launchConfetti(count = 60) {
  const colors = ['#2563EB', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${2 + Math.random() * 2}s;
    `;
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

/* ── Haptic feedback ── */
function hapticFeedback(pattern = [50]) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

/* ── Exposições globais ── */
window.openShareModal  = openShareModal;
window.closeShareModal = closeShareModal;
window.shareNative     = shareNative;
window.shareWhatsApp   = shareWhatsApp;
window.shareTelegram   = shareTelegram;
window.downloadCard    = downloadCard;
window.launchConfetti  = launchConfetti;
window.hapticFeedback  = hapticFeedback;
window.startWorkoutClock  = startWorkoutClock;
window.resetWorkoutClock  = resetWorkoutClock;
window.getWorkoutElapsed  = getWorkoutElapsed;
