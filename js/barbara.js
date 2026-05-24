/* ============================================================
   IAPersornal — barbara.js
   Plano de Treino para Emagrecimento — Barbara
   Mesmo motor de renderização do main.js
   ============================================================ */

const START_WEIGHT_B = 65;
const GOAL_WEIGHT_B  = 55;

const DAY_COLORS_B = {
  segunda: '#8B5CF6',
  terca:   '#EC4899',
  quarta:  '#06D6A0',
  quinta:  '#3B82F6',
  sexta:   '#EC4899',
  sabado:  '#F59E0B',
  domingo: '#10B981',
};

const workoutsB = {
  segunda: {
    fullName: 'Segunda-feira',
    focus: 'HIIT FULL BODY',
    exercises: [
      {
        name: 'Agachamento com Salto',
        sets: '3 × 15 reps',
        muscle: 'PERNAS / GLÚTEOS',
        icon: '🦵',
        youtubeId: 'gnz5OFSO2IU',
        tip: 'Desça em agachamento e suba explosiva com salto. Aterrisse suavemente. Queima muitas calorias e define os glúteos.',
      },
      {
        name: 'Burpee Modificado',
        sets: '3 × 10 reps',
        muscle: 'CORPO INTEIRO',
        icon: '💥',
        youtubeId: 'HnRIzMKs-uM',
        tip: 'Sem o salto no início. Deça, estique as pernas, volte e levante. Ideal para iniciantes. Intensidade alta.',
      },
      {
        name: 'Mountain Climbers',
        sets: '3 × 30 segundos',
        muscle: 'CORE / CARDIO',
        icon: '🏔️',
        youtubeId: 'DTVVwQs-zoM',
        tip: 'Posição de prancha, alterne os joelhos em direção ao peito rapidamente. Core contraído o tempo todo.',
      },
      {
        name: 'High Knees (Joelho Alto)',
        sets: '3 × 30 segundos',
        muscle: 'CARDIO / PERNAS',
        icon: '🏃',
        youtubeId: 'uWXxhzpMIqg',
        tip: 'Corra no lugar elevando os joelhos até a altura do quadril. Braços em movimento. Ritmo acelerado.',
      },
      {
        name: 'Prancha',
        sets: '3 × 40 segundos',
        muscle: 'CORE',
        icon: '⏱️',
        youtubeId: 'Yu0wjtD5FkU',
        tip: 'Corpo reto como uma tábua. Abdômen e glúteos contraídos. Não deixe o quadril cair. Respire normalmente.',
      },
    ],
  },

  terca: {
    fullName: 'Terça-feira',
    focus: 'GLÚTEOS + COXAS',
    exercises: [
      {
        name: 'Hip Thrust (Elevação Pélvica)',
        sets: '4 × 15 reps',
        muscle: 'GLÚTEOS',
        icon: '🍑',
        youtubeId: '5KYtuo5Y-sg',
        tip: 'Apoie os ombros no banco. Empurre o quadril para cima contraindo os glúteos no topo. Segure 1 segundo.',
      },
      {
        name: 'Agachamento Sumô',
        sets: '4 × 15 reps',
        muscle: 'COXAS / GLÚTEOS',
        icon: '🦵',
        youtubeId: 'SozaXNWVZxA',
        tip: 'Pés mais abertos que os ombros, bicos virados para fora. Trabalha mais a coxa interna e os glúteos.',
      },
      {
        name: 'Stiff com Halteres',
        sets: '3 × 12 reps',
        muscle: 'POSTERIOR / GLÚTEOS',
        icon: '🏋️',
        youtubeId: 'po5ihi0-5rk',
        tip: 'Joelhos levemente dobrados, desça os halteres pela frente das pernas sentindo o posterior alongar. Costas retas.',
      },
      {
        name: 'Afundo (Lunge)',
        sets: '3 × 12 cada perna',
        muscle: 'PERNAS / GLÚTEOS',
        icon: '👣',
        youtubeId: 'tIp498vBIAM',
        tip: 'Passo largo à frente, desça o joelho traseiro em direção ao chão. Joelho dianteiro não ultrapassa o pé.',
      },
      {
        name: 'Cadeira Abdutora',
        sets: '3 × 15 reps',
        muscle: 'ABDUTORES / GLÚTEOS',
        icon: '🦵',
        youtubeId: 'E5r5OmVfxpU',
        tip: 'Abra as pernas contraindo os glúteos laterais. Volte devagar. Não use peso excessivo no começo.',
      },
    ],
  },

  quarta: {
    fullName: 'Quarta-feira',
    focus: 'CORE + CARDIO',
    exercises: [
      {
        name: 'Abdominal Bicicleta',
        sets: '3 × 20 reps',
        muscle: 'ABDÔMEN / OBLÍQUOS',
        icon: '🚴',
        youtubeId: 'apmprS8H1MY',
        tip: 'Alterne cotovelo com joelho oposto. Movimento lento e controlado. Não puxe o pescoço. Expire ao subir.',
      },
      {
        name: 'Prancha',
        sets: '3 × 45 segundos',
        muscle: 'CORE COMPLETO',
        icon: '⏱️',
        youtubeId: 'Yu0wjtD5FkU',
        tip: 'Posição firme, corpo reto. Abdômen fortemente contraído. Pense em empurrar o umbigo para a espinha.',
      },
      {
        name: 'Abdominal Crunch',
        sets: '3 × 20 reps',
        muscle: 'ABDÔMEN',
        icon: '🔥',
        youtubeId: 'c4yjTN9uKRY',
        tip: 'Enrole o tronco superior — não levante inteiro. Expire ao subir. Controle a descida. Foco no abdômen.',
      },
      {
        name: 'Mountain Climbers',
        sets: '3 × 30 segundos',
        muscle: 'CORE / CARDIO',
        icon: '🏔️',
        youtubeId: 'DTVVwQs-zoM',
        tip: 'Mantenha o core estável enquanto alterna as pernas rapidamente. É cardio e abdominal ao mesmo tempo.',
      },
      {
        name: 'High Knees',
        sets: '3 × 30 segundos',
        muscle: 'CARDIO',
        icon: '🏃',
        youtubeId: 'uWXxhzpMIqg',
        tip: 'Sprint no lugar elevando os joelhos. Braços ativos. Mantenha o ritmo para elevar a frequência cardíaca.',
      },
    ],
  },

  quinta: {
    fullName: 'Quinta-feira',
    focus: 'PARTE SUPERIOR',
    exercises: [
      {
        name: 'Flexão de Braços (Joelho)',
        sets: '3 × 12 reps',
        muscle: 'PEITO / TRÍCEPS',
        icon: '💪',
        youtubeId: 'EpmypyjPqdo',
        tip: 'Com joelho no chão para adaptação. Corpo alinhado da cabeça ao joelho. Desça controlado, suba firme.',
      },
      {
        name: 'Remada com Halter',
        sets: '3 × 12 reps',
        muscle: 'COSTAS',
        icon: '↩️',
        youtubeId: 'SUvZiVClLKw',
        tip: 'Apoie o joelho e a mão no banco. Puxe o halter em direção ao quadril. Sinta as costas trabalhando.',
      },
      {
        name: 'Elevação Lateral',
        sets: '3 × 12 reps',
        muscle: 'OMBROS',
        icon: '↔️',
        youtubeId: 'jannLx4RxKo',
        tip: 'Halteres leves. Levante os braços lateralmente até a altura dos ombros. Controle a descida em 2 seg.',
      },
      {
        name: 'Rosca com Halter',
        sets: '3 × 12 reps',
        muscle: 'BÍCEPS',
        icon: '💪',
        youtubeId: 'AuBN9_8Iihc',
        tip: 'Alterne os braços. Cotovelos fixos. Suba girando o pulso para cima (supinação) para máxima contração.',
      },
      {
        name: 'Tríceps no Banco',
        sets: '3 × 15 reps',
        muscle: 'TRÍCEPS',
        icon: '🪑',
        youtubeId: 'jH9RXQjbXqs',
        tip: 'Apoie as mãos no banco atrás do corpo. Dobre os cotovelos e desça o quadril. Empurre de volta para cima.',
      },
    ],
  },

  sexta: {
    fullName: 'Sexta-feira',
    focus: 'GLÚTEOS + HIIT',
    exercises: [
      {
        name: 'Hip Thrust com Halter',
        sets: '4 × 15 reps',
        muscle: 'GLÚTEOS',
        icon: '🍑',
        youtubeId: '5KYtuo5Y-sg',
        tip: 'Versão com halter apoiado no quadril. Progressão do hip thrust básico. Glúteo contrai fortemente no topo.',
      },
      {
        name: 'Afundo Reverso',
        sets: '3 × 12 cada perna',
        muscle: 'GLÚTEOS / COXAS',
        icon: '👣',
        youtubeId: 'FM2Butrvejo',
        tip: 'Passo para trás (mais seguro que afundo frontal). Menos estresse no joelho. Foco total no glúteo.',
      },
      {
        name: 'Agachamento Sumô com Salto',
        sets: '3 × 12 reps',
        muscle: 'COXAS / GLÚTEOS / CARDIO',
        icon: '💥',
        youtubeId: 'gnz5OFSO2IU',
        tip: 'Posição sumô, agache e salte explosivamente. Aterrisse suave. Intenso para queimar gordura e definir.',
      },
      {
        name: 'Cadeira Abdutora',
        sets: '3 × 20 reps',
        muscle: 'ABDUTORES',
        icon: '🦵',
        youtubeId: 'E5r5OmVfxpU',
        tip: 'Último exercício de glúteos lateral. Use peso moderado e foque na qualidade da contração, não na velocidade.',
      },
      {
        name: 'Burpee',
        sets: '3 × 10 reps',
        muscle: 'CORPO INTEIRO',
        icon: '🔥',
        youtubeId: 'CrGAnJEfcmY',
        tip: 'Finalize o treino com tudo! Explosivo e completo. Recupere 60 seg entre as séries. Você consegue!',
      },
    ],
  },

  sabado: {
    fullName: 'Sábado',
    focus: 'CARDIO + CORE LEVE',
    exercises: [
      {
        name: 'Polichinelo',
        sets: '3 × 40 segundos',
        muscle: 'CARDIO / CORPO INTEIRO',
        icon: '⭐',
        youtubeId: 'LtvN9aEJG4I',
        tip: 'Salte abrindo pernas e braços simultaneamente. Ritmo confortável mas constante. Ótimo para aquecimento.',
      },
      {
        name: 'High Knees',
        sets: '3 × 30 segundos',
        muscle: 'CARDIO',
        icon: '🏃',
        youtubeId: 'uWXxhzpMIqg',
        tip: 'Aqueça o corpo progressivamente. Ritmo moderado hoje — é dia de cardio leve e recuperação ativa.',
      },
      {
        name: 'Prancha Lateral',
        sets: '3 × 30 seg cada lado',
        muscle: 'OBLÍQUOS / CORE',
        icon: '↔️',
        youtubeId: 'thZZtS9gapk',
        tip: 'Apoio no cotovelo e pé lateral. Quadril elevado, corpo reto. Trabalha os oblíquos intensamente.',
      },
      {
        name: 'Oblíquo (Russian Twist)',
        sets: '3 × 20 reps',
        muscle: 'OBLÍQUOS',
        icon: '🔄',
        youtubeId: 'rma5HDT6TiQ',
        tip: 'Sentada com pés no ar, gire o tronco de lado a lado. Quanto maior o ângulo do tronco, mais intenso.',
      },
      {
        name: 'Abdominal Bicicleta',
        sets: '3 × 20 reps',
        muscle: 'ABDÔMEN / OBLÍQUOS',
        icon: '🚴',
        youtubeId: 'apmprS8H1MY',
        tip: 'Finalize com bicicleta controlada. Movimento lento e com foco. Feche a semana forte, Barbara! 💜',
      },
    ],
  },

  domingo: null,
};

/* ── Helpers ── */
function lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

/* ── Player de vídeo ── */
function playVideo(container, videoId) {
  if (!videoId) return;
  document.querySelectorAll('.card-video.playing').forEach(c => {
    if (c !== container) { const f = c.querySelector('.card-video__iframe'); if (f) f.src = ''; c.classList.remove('playing'); }
  });
  const iframe = container.querySelector('.card-video__iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  container.classList.add('playing');
}

/* ── Progresso de peso ── */
function initWeightProgressB() {
  const input = document.getElementById('current-weight');
  const fill  = document.getElementById('weight-fill');
  const pct   = document.getElementById('weight-percent');
  if (!input) return;
  const saved = lsGet('currentWeightB', START_WEIGHT_B);
  input.value = saved;
  updateWeightBarB(saved, fill, pct);
  input.addEventListener('input', () => {
    const w = parseFloat(input.value) || START_WEIGHT_B;
    lsSet('currentWeightB', w);
    updateWeightBarB(w, fill, pct);
  });
}

function updateWeightBarB(current, fill, pctEl) {
  const range   = START_WEIGHT_B - GOAL_WEIGHT_B;
  const done    = Math.max(0, Math.min(START_WEIGHT_B - current, range));
  const percent = Math.round((done / range) * 100);
  if (fill) fill.style.width = percent + '%';
  if (pctEl) pctEl.textContent = `${percent}% concluído  •  ${current} kg → ${GOAL_WEIGHT_B} kg`;
}

/* ── Contador semanal ── */
function getWeekKey() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `week_barbara_${now.getFullYear()}_${week}`;
}
function renderWeeklyCounter() {
  const el = document.getElementById('weekly-text');
  if (!el) return;
  const data = lsGet(getWeekKey(), []);
  el.textContent = `Você treinou ${data.length}/6 dias esta semana`;
}
function markTodayTrained() {
  const key = getWeekKey();
  const data = lsGet(key, []);
  const today = new Date().toDateString();
  if (!data.includes(today)) { data.push(today); lsSet(key, data); }
  renderWeeklyCounter();
}
function resetWeek() { lsSet(getWeekKey(), []); renderWeeklyCounter(); }

/* ── Render cards ── */
function buildVideoHtml(youtubeId, name) {
  const thumb = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  return `
    <div class="card-video" onclick="playVideo(this,'${youtubeId}')">
      <img class="card-video__thumb" src="${thumb}" alt="${name}" loading="lazy"
           onerror="this.parentElement.classList.add('thumb-error')"/>
      <div class="card-video__overlay">
        <div class="card-video__play-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <span class="card-video__label">Ver execução</span>
      </div>
      <iframe class="card-video__iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowfullscreen></iframe>
    </div>`;
}

function renderPanels() {
  const container = document.getElementById('panels');
  if (!container) return;

  Object.keys(workoutsB).forEach(day => {
    const data  = workoutsB[day];
    const color = DAY_COLORS_B[day];
    const panel = document.createElement('div');
    panel.className = 'day-panel';
    panel.id = `panel-${day}`;
    if (day === 'segunda') panel.classList.add('active');

    if (!data) {
      panel.innerHTML = `
        <div class="rest-card">
          <div class="rest-icon">🧘‍♀️</div>
          <h2>DESCANSO ATIVO</h2>
          <p>Seu corpo precisa desse tempo para recuperar e crescer.<br/>
          <strong>Sugestão:</strong> caminhada leve de 30 min ou alongamento completo.</p>
          <div class="motivational">
            "Cada treino é um passo a mais. Descanse hoje para arrasar amanhã." 💜
          </div>
        </div>`;
    } else {
      const saved = lsGet(`exercises_barbara_${day}`, {});
      const cardsHtml = data.exercises.map((ex, i) => {
        const checked   = saved[i] ? 'checked' : '';
        const doneClass = saved[i] ? 'done' : '';
        return `
          <div class="exercise-card ${doneClass}" id="card-${day}-${i}" style="--card-color:${color}">
            <div class="card-color-strip" style="background:${color}"></div>
            ${buildVideoHtml(ex.youtubeId, ex.name)}
            <div class="card-body">
              <span class="card-muscle" style="background:${color}">${ex.muscle}</span>
              <div class="card-name">${ex.name}</div>
              <div class="card-sets">${ex.sets}</div>
              <div class="card-tip">${ex.tip}</div>
              <div class="card-check-area">
                <input type="checkbox" class="card-checkbox" id="chk-${day}-${i}"
                  data-day="${day}" data-idx="${i}" ${checked}/>
                <label class="card-check-label" for="chk-${day}-${i}">Marcar como concluído</label>
              </div>
            </div>
          </div>`;
      }).join('');

      panel.innerHTML = `
        <div class="day-panel-header">
          <span class="day-panel-title" style="color:${color}">${data.fullName}</span>
          <span class="focus-badge" style="border-color:${color};color:${color};background:${color}22">${data.focus}</span>
        </div>
        <div class="exercise-grid">${cardsHtml}</div>`;
    }
    container.appendChild(panel);
  });

  container.addEventListener('change', e => {
    if (!e.target.classList.contains('card-checkbox')) return;
    const { day, idx } = e.target.dataset;
    const saved = lsGet(`exercises_barbara_${day}`, {});
    saved[idx] = e.target.checked;
    lsSet(`exercises_barbara_${day}`, saved);
    const card = document.getElementById(`card-${day}-${idx}`);
    if (card) card.classList.toggle('done', e.target.checked);
    checkDayComplete(day);
    if (e.target.checked) markTodayTrained();
  });

  animateCards('segunda');
}

function checkDayComplete(day) {
  const data = workoutsB[day];
  if (!data) return;
  const saved  = lsGet(`exercises_barbara_${day}`, {});
  const total  = data.exercises.length;
  const done   = Object.values(saved).filter(Boolean).length;
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.toggle('show', done >= total && total > 0);
}

function animateCards(day) {
  const panel = document.getElementById(`panel-${day}`);
  if (!panel) return;
  panel.querySelectorAll('.exercise-card, .rest-card').forEach((card, i) => {
    card.classList.remove('animate-in');
    setTimeout(() => card.classList.add('animate-in'), i * 90);
  });
}

function initDaySelector() {
  const btns = document.querySelectorAll('.day-btn');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.day-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(`panel-${day}`);
      if (panel) { panel.classList.add('active'); animateCards(day); }
      const banner = document.getElementById('completion-banner');
      if (banner) { banner.classList.remove('show'); checkDayComplete(day); }
      document.querySelectorAll('.card-video.playing').forEach(c => {
        const f = c.querySelector('.card-video__iframe'); if (f) f.src = ''; c.classList.remove('playing');
      });
    });
  });
}

function resetDay() {
  const activeBtn = document.querySelector('.day-btn.active');
  if (!activeBtn) return;
  const day = activeBtn.dataset.day;
  lsSet(`exercises_barbara_${day}`, {});
  const panel = document.getElementById(`panel-${day}`);
  if (panel) {
    panel.querySelectorAll('.card-checkbox').forEach(cb => (cb.checked = false));
    panel.querySelectorAll('.exercise-card').forEach(card => card.classList.remove('done'));
  }
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('panels')) {
    renderPanels();
    initDaySelector();
    initWeightProgressB();
    renderWeeklyCounter();
    checkDayComplete('segunda');
  }
});

window.playVideo = playVideo;
window.resetDay  = resetDay;
window.resetWeek = resetWeek;
