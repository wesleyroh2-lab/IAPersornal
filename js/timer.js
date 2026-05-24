/* ============================================================
   IAPersornal — timer.js
   Cronômetro de descanso flutuante (compartilhado)
   Usado em index.html e treino-barbara.html
   ============================================================ */

let _timerTotal     = 90;
let _timerRemaining = 90;
let _timerInterval  = null;
let _timerRunning   = false;

const RTW_CIRCUMFERENCE = 2 * Math.PI * 44; // raio=44 no SVG viewBox 100×100

/* ── Abrir / fechar ── */
function openRestTimer() {
  const widget = document.getElementById('rest-timer');
  if (!widget) return;
  widget.classList.add('show');
  updateTimerDisplay();
}

function closeRestTimer() {
  const widget = document.getElementById('rest-timer');
  if (widget) widget.classList.remove('show');
  pauseRestTimer();
}

/* ── Predefinir tempo ── */
function setRestTime(secs) {
  pauseRestTimer();
  _timerTotal     = secs;
  _timerRemaining = secs;
  document.querySelectorAll('.rtw__preset').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.secs) === secs);
  });
  updateTimerDisplay();
}

/* ── Iniciar / Pausar ── */
function toggleRestTimer() {
  if (_timerRunning) pauseRestTimer();
  else               startRestTimer();
}

function startRestTimer() {
  if (_timerRemaining <= 0) {
    _timerRemaining = _timerTotal;
    updateTimerDisplay();
  }
  _timerRunning = true;
  const btn = document.getElementById('rtw-toggle');
  if (btn) { btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar'; btn.classList.add('running'); }
  _timerInterval = setInterval(tickRestTimer, 1000);
}

function pauseRestTimer() {
  _timerRunning = false;
  clearInterval(_timerInterval);
  _timerInterval = null;
  const btn = document.getElementById('rtw-toggle');
  if (btn) { btn.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar'; btn.classList.remove('running'); }
}

/* ── Zerar ── */
function resetRestTimer() {
  pauseRestTimer();
  _timerRemaining = _timerTotal;
  updateTimerDisplay();
  const widget = document.getElementById('rest-timer');
  if (widget) widget.classList.remove('rtw--done', 'rtw--warning');
}

/* ── Tick ── */
function tickRestTimer() {
  if (_timerRemaining > 0) _timerRemaining--;
  updateTimerDisplay();
  if (_timerRemaining <= 0) {
    pauseRestTimer();
    playTimerBeep();
    const widget = document.getElementById('rest-timer');
    if (widget) widget.classList.add('rtw--done');
    const btn = document.getElementById('rtw-toggle');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Reiniciar';
  }
}

/* ── Atualizar visual ── */
function updateTimerDisplay() {
  const mins    = Math.floor(Math.abs(_timerRemaining) / 60);
  const secs    = Math.abs(_timerRemaining) % 60;
  const display = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

  const timeEl = document.getElementById('rtw-time');
  if (timeEl) timeEl.textContent = display;

  // SVG anel de progresso
  const ring = document.getElementById('rtw-ring');
  if (ring) {
    const progress = _timerTotal > 0 ? _timerRemaining / _timerTotal : 0;
    const offset   = RTW_CIRCUMFERENCE * (1 - Math.max(0, progress));
    ring.style.strokeDashoffset = offset;
  }

  // Alerta visual nos últimos 10 seg
  const widget = document.getElementById('rest-timer');
  if (widget) {
    widget.classList.toggle('rtw--warning', _timerRunning && _timerRemaining > 0 && _timerRemaining <= 10);
  }
}

/* ── Bipe sonoro ao zerar ── */
function playTimerBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beeps = [0, 200, 400];
    beeps.forEach(delay => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      const t = ctx.currentTime + delay / 1000;
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch (_) {}
}

/* ── Exposição global ── */
window.openRestTimer  = openRestTimer;
window.closeRestTimer = closeRestTimer;
window.setRestTime    = setRestTime;
window.toggleRestTimer = toggleRestTimer;
window.resetRestTimer  = resetRestTimer;

/* ── Init (configura o SVG) ── */
document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('rtw-ring');
  if (ring) {
    ring.style.strokeDasharray  = RTW_CIRCUMFERENCE;
    ring.style.strokeDashoffset = 0;
  }
  updateTimerDisplay();
});
