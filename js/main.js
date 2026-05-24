/* ============================================================
   IAPersornal — main.js
   Treino + Dieta + Vídeos do YouTube por exercício
   Persistência via localStorage | Sem frameworks
   ============================================================ */

const START_WEIGHT = 55;
const GOAL_WEIGHT  = 65;
const TOTAL_KCAL   = 3750;

const DAY_COLORS = {
  segunda: '#FF6B00',
  terca:   '#3A86FF',
  quarta:  '#06D6A0',
  quinta:  '#FFD700',
  sexta:   '#FF006E',
  sabado:  '#FF6B00',
  domingo: '#06D6A0',
};

/* ============================================================
   DADOS DE TREINO — com youtubeId por exercício
   Fonte dos vídeos: canais brasileiros de educação física
   ============================================================ */
const workouts = {
  segunda: {
    fullName: 'Segunda-feira',
    focus: 'PEITO',
    icon: '🫀',
    exercises: [
      {
        name: 'Supino Reto com Barra',
        sets: '4 × 8–12',
        muscle: 'PEITO',
        icon: '🏋️',
        youtubeId: 'vIGvt-vgrvY',
        tip: 'Escápulas retraídas e pés firmes no chão. Desça a barra com controle até tocar levemente o peito e empurre explosivamente.',
      },
      {
        name: 'Supino Inclinado com Halteres',
        sets: '3 × 10–12',
        muscle: 'PEITO SUPERIOR',
        icon: '📐',
        youtubeId: 'G-i3jMIbDmo',
        tip: 'Inclinação de 30–45°. Foque na contração da parte superior do peitoral. Controle a descida para máximo alongamento.',
      },
      {
        name: 'Crossover na Polia',
        sets: '3 × 12–15',
        muscle: 'PEITO',
        icon: '🔀',
        youtubeId: 'E3aha5zhlc0',
        tip: 'Puxe os cabos em arco cruzando as mãos na frente do corpo. Sinta a compressão do peitoral no ponto de cruzamento.',
      },
      {
        name: 'Crucifixo com Halteres',
        sets: '3 × 12',
        muscle: 'PEITO',
        icon: '✈️',
        youtubeId: 'ZjIKUMtW37c',
        tip: 'Cotovelos levemente dobrados. Abra sentindo o alongamento e feche contraindo o peito. Movimento amplo e controlado.',
      },
      {
        name: 'Flexão de Braços',
        sets: '3 × falha',
        muscle: 'PEITO / TRÍCEPS',
        icon: '⬇️',
        youtubeId: 'UkDVBs9GEWo',
        tip: 'Corpo reto como prancha. Desça até o peito quase tocar o chão. Empurre de forma explosiva. Finalização perfeita.',
      },
    ],
  },

  terca: {
    fullName: 'Terça-feira',
    focus: 'COSTAS',
    icon: '🦅',
    exercises: [
      {
        name: 'Puxada Frontal na Polia',
        sets: '4 × 10–12',
        muscle: 'LATÍSSIMO',
        icon: '⬇️',
        youtubeId: '25XTUWnt_R4',
        tip: 'Puxe a barra até a altura do queixo. Projete o peito para fora e comprima as escápulas. Controle a volta.',
      },
      {
        name: 'Remada Curvada com Barra',
        sets: '4 × 8–10',
        muscle: 'COSTAS MÉDIAS',
        icon: '↩️',
        youtubeId: 'VJHBEy2duVc',
        tip: 'Tronco a 45°. Puxe a barra em direção ao umbigo, contraindo as escápulas ao final. Sem balançar o tronco.',
      },
      {
        name: 'Remada Unilateral com Halter',
        sets: '3 × 10–12',
        muscle: 'LATÍSSIMO',
        icon: '💪',
        youtubeId: 'SUvZiVClLKw',
        tip: 'Apoie o joelho e a mão no banco. Puxe o halter em direção ao quadril com o cotovelo junto ao corpo.',
      },
      {
        name: 'Pull-down Pegada Neutra',
        sets: '3 × 12',
        muscle: 'LATÍSSIMO',
        icon: '⬇️',
        youtubeId: 'BOW9my4J_ek',
        tip: 'Use pegada neutra paralela. Ativa mais o latíssimo e reduz tensão nos ombros. Ideal para desenvolvimento de força.',
      },
    ],
  },

  quarta: {
    fullName: 'Quarta-feira',
    focus: 'PERNAS',
    icon: '🦵',
    exercises: [
      {
        name: 'Agachamento Livre',
        sets: '4 × 8–12',
        muscle: 'QUADRÍCEPS / GLÚTEOS',
        icon: '🏋️',
        youtubeId: 'rM6SDUdl9fs',
        tip: 'Pés na largura dos ombros. Desça até as coxas paralelas ao chão. Joelhos na direção dos pés. Rei dos exercícios.',
      },
      {
        name: 'Leg Press 45°',
        sets: '4 × 10–12',
        muscle: 'QUADRÍCEPS',
        icon: '🦵',
        youtubeId: 'waAxlYvtCcI',
        tip: 'Não trave os joelhos no topo. Desça controlando até 90°. Pés no centro da plataforma para equilíbrio muscular.',
      },
      {
        name: 'Cadeira Extensora',
        sets: '3 × 12–15',
        muscle: 'QUADRÍCEPS',
        icon: '⬆️',
        youtubeId: 'Svq2T3L9oKo',
        tip: 'Suba controlado, pause 1 segundo com o músculo contraído no topo, desça lentamente. Foco total na contração.',
      },
      {
        name: 'Mesa Flexora',
        sets: '3 × 12–15',
        muscle: 'ISQUIOTIBIAIS',
        icon: '⬇️',
        youtubeId: '8Nat6GRiEoc',
        tip: 'O excêntrico (descida) é fundamental. Desça em 3 segundos. Não use momentum. Quadril fixo na mesa.',
      },
      {
        name: 'Panturrilha em Pé',
        sets: '4 × 15–20',
        muscle: 'PANTURRILHA',
        icon: '⬆️',
        youtubeId: 'nQmWQ3shmTw',
        tip: 'Eleve completamente na ponta dos pés e desça abaixo do nível do degrau para máximo alongamento do sóleo.',
      },
    ],
  },

  quinta: {
    fullName: 'Quinta-feira',
    focus: 'OMBROS',
    icon: '🏔️',
    exercises: [
      {
        name: 'Desenvolvimento com Halteres',
        sets: '4 × 10–12',
        muscle: 'DELTÓIDE',
        icon: '⬆️',
        youtubeId: 'eufDL9MmF8A',
        tip: 'Sente-se com encosto. Empurre os halteres sem travar os cotovelos. Controle a descida até 90° para ativação máxima.',
      },
      {
        name: 'Elevação Lateral',
        sets: '4 × 12–15',
        muscle: 'DELTÓIDE LATERAL',
        icon: '↔️',
        youtubeId: 'jannLx4RxKo',
        tip: 'Cotovelos levemente dobrados. Suba até a altura dos ombros. Controle a descida em 2 segundos. Sem impulso.',
      },
      {
        name: 'Elevação Frontal',
        sets: '3 × 12',
        muscle: 'DELTÓIDE FRONTAL',
        icon: '⬆️',
        youtubeId: 'kKjjeiXL960',
        tip: 'Levante alternando os braços à frente do corpo até a altura dos ombros. Evite balançar o tronco. Peso moderado.',
      },
      {
        name: 'Encolhimento com Halteres',
        sets: '3 × 12–15',
        muscle: 'TRAPÉZIO',
        icon: '⬆️',
        youtubeId: 'rqtfxLLuxn4',
        tip: 'Eleve os ombros em direção às orelhas e segure 1–2 segundos. Não role os ombros. Movimento direto: sobe e desce.',
      },
    ],
  },

  sexta: {
    fullName: 'Sexta-feira',
    focus: 'BRAÇOS',
    icon: '💪',
    exercises: [
      {
        name: 'Rosca Direta com Barra',
        sets: '4 × 10–12',
        muscle: 'BÍCEPS',
        icon: '💪',
        youtubeId: 'Et1wgGMGW8w',
        tip: 'Cotovelos fixos ao lado do corpo. Suba controlado e desça lentamente em 3 segundos. Evite balançar o tronco.',
      },
      {
        name: 'Rosca Alternada com Halteres',
        sets: '3 × 10 cada',
        muscle: 'BÍCEPS',
        icon: '🔄',
        youtubeId: 'AuBN9_8Iihc',
        tip: 'Alterne os braços. Gire o pulso supinando no topo para máxima contração do bíceps. Controle total do movimento.',
      },
      {
        name: 'Martelo com Halteres',
        sets: '3 × 12',
        muscle: 'BRAQUIAL / BÍCEPS',
        icon: '🔨',
        youtubeId: '1-xCKLVxqqg',
        tip: 'Pegada neutra (polegar aponta para cima). Trabalha o braquial e dá espessura ao braço. Não balance o tronco.',
      },
      {
        name: 'Tríceps Corda na Polia',
        sets: '4 × 12–15',
        muscle: 'TRÍCEPS',
        icon: '⬇️',
        youtubeId: '7le1JRUUagM',
        tip: 'Abra a corda no final do movimento para maior ativação das cabeças laterais. Cotovelos fixos ao lado do corpo.',
      },
      {
        name: 'Tríceps Francês',
        sets: '3 × 10–12',
        muscle: 'TRÍCEPS',
        icon: '💡',
        youtubeId: 'RavQHfFxbdA',
        tip: 'Skull crusher: desça o halter até próximo da testa controlando o excêntrico. Cotovelos apontados para cima, fixos.',
      },
    ],
  },

  sabado: {
    fullName: 'Sábado',
    focus: 'PEITO + CORE',
    icon: '🔥',
    exercises: [
      {
        name: 'Supino Inclinado com Barra',
        sets: '4 × 8–10',
        muscle: 'PEITO SUPERIOR',
        icon: '🏋️',
        youtubeId: 'MKJEZaSIMPE',
        tip: 'Pegada na largura dos ombros. Desça controlado até tocar levemente o peito superior. Explosivo na subida.',
      },
      {
        name: 'Peck Deck (Voador)',
        sets: '3 × 12–15',
        muscle: 'PEITO',
        icon: '🦅',
        youtubeId: 'FwtqdGlRgig',
        tip: 'Mantenha um arco nos cotovelos durante todo o movimento. Foque na contração do peito no centro. Controle a volta.',
      },
      {
        name: 'Pullover com Halter',
        sets: '3 × 12',
        muscle: 'PEITO / COSTAS',
        icon: '🔄',
        youtubeId: 'tKzMqbZmtlI',
        tip: 'Deite transversal no banco. Desça o halter atrás da cabeça sentindo o alongamento do peitoral e retorna controlado.',
      },
      {
        name: 'Prancha',
        sets: '3 × 45 seg',
        muscle: 'CORE',
        icon: '⏱️',
        youtubeId: 'Yu0wjtD5FkU',
        tip: 'Corpo reto, abdômen e glúteos contraídos. Respire normalmente. Não deixe o quadril subir ou cair. Foco no core.',
      },
      {
        name: 'Abdominal Crunch',
        sets: '3 × 20',
        muscle: 'ABDÔMEN',
        icon: '🔥',
        youtubeId: 'c4yjTN9uKRY',
        tip: 'Enrole apenas o tronco superior — não o pescoço. Expire ao subir, inspire ao descer. Controle o excêntrico.',
      },
    ],
  },

  domingo: null, // descanso ativo
};

/* ============================================================
   REFEIÇÕES
   ============================================================ */
const meals = [
  {
    time: '07h', emoji: '☀️', name: 'Café da Manhã', kcal: 700,
    items: [
      '4 ovos mexidos com azeite',
      '2 fatias de pão integral com pasta de amendoim',
      '1 banana grande',
      '1 copo de leite integral (300 ml)',
    ],
  },
  {
    time: '10h', emoji: '🥗', name: 'Lanche da Manhã', kcal: 400,
    items: [
      '1 iogurte grego integral',
      '1 punhado de castanhas (30g)',
      '1 fruta (manga ou maçã)',
    ],
  },
  {
    time: '13h', emoji: '🍽️', name: 'Almoço', kcal: 800,
    items: [
      '200g de frango grelhado ou carne vermelha magra',
      '4 colheres de arroz branco',
      '1 concha de feijão',
      'Salada à vontade com azeite',
      '1 colher extra de azeite',
    ],
  },
  {
    time: '16h', emoji: '🥤', name: 'Pré-Treino', kcal: 450,
    items: [
      'Shake: 300 ml leite integral + 2 col. aveia + 1 banana + 1 col. pasta de amendoim',
      'Opcional: 1 dose de whey protein',
    ],
  },
  {
    time: '19h', emoji: '💪', name: 'Pós-Treino', kcal: 500,
    items: [
      '1 dose de whey protein com leite',
      '2 batatas-doces médias',
      '150g de peito de frango',
    ],
  },
  {
    time: '21h', emoji: '🌙', name: 'Jantar', kcal: 600,
    items: [
      'Omelete com 4 ovos + queijo + legumes',
      '2 fatias de pão integral',
      '1 copo de leite com achocolatado (não diet)',
    ],
  },
  {
    time: '23h', emoji: '😴', name: 'Ceia', kcal: 300,
    items: [
      'Iogurte grego com mel e granola',
      'OU 2 colheres de pasta de amendoim com banana',
    ],
  },
];

/* ============================================================
   HELPERS
   ============================================================ */
function lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/* ============================================================
   PLAYER DE VÍDEO
   ============================================================ */
function playVideo(container, videoId) {
  if (!videoId) return;
  // Pausa qualquer outro vídeo aberto no mesmo painel
  document.querySelectorAll('.card-video.playing').forEach(c => {
    if (c !== container) {
      const f = c.querySelector('.card-video__iframe');
      if (f) f.src = '';
      c.classList.remove('playing');
    }
  });
  const iframe = container.querySelector('.card-video__iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  container.classList.add('playing');
}

/* ============================================================
   PROGRESSO DE PESO
   ============================================================ */
function initWeightProgress() {
  const input = document.getElementById('current-weight');
  const fill  = document.getElementById('weight-fill');
  const pct   = document.getElementById('weight-percent');
  if (!input) return;
  const saved = lsGet('currentWeight', START_WEIGHT);
  input.value = saved;
  updateWeightBar(saved, fill, pct);
  input.addEventListener('input', () => {
    const w = parseFloat(input.value) || START_WEIGHT;
    lsSet('currentWeight', w);
    updateWeightBar(w, fill, pct);
  });
}

function updateWeightBar(current, fill, pctEl) {
  const range   = GOAL_WEIGHT - START_WEIGHT;
  const done    = Math.max(0, Math.min(current - START_WEIGHT, range));
  const percent = Math.round((done / range) * 100);
  if (fill)  fill.style.width = percent + '%';
  if (pctEl) pctEl.textContent = `${percent}% concluído  •  ${current} kg → ${GOAL_WEIGHT} kg`;
}

/* ============================================================
   CONTADOR SEMANAL
   ============================================================ */
function getWeekKey() {
  const now  = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `week_${now.getFullYear()}_${week}`;
}
function renderWeeklyCounter() {
  const el = document.getElementById('weekly-text');
  if (!el) return;
  const data  = lsGet(getWeekKey(), []);
  el.textContent = `Você treinou ${data.length}/6 dias esta semana`;
}
function markTodayTrained() {
  const key  = getWeekKey();
  const data = lsGet(key, []);
  const today = new Date().toDateString();
  if (!data.includes(today)) { data.push(today); lsSet(key, data); }
  renderWeeklyCounter();
}
function resetWeek() {
  lsSet(getWeekKey(), []);
  renderWeeklyCounter();
}

/* ============================================================
   RENDERIZAR CARDS DE EXERCÍCIO
   ============================================================ */
function buildVideoHtml(youtubeId, name) {
  const thumb = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  return `
    <div class="card-video" onclick="playVideo(this,'${youtubeId}')">
      <img class="card-video__thumb" src="${thumb}" alt="${name}" loading="lazy"
           onerror="this.parentElement.classList.add('thumb-error')"/>
      <div class="card-video__overlay">
        <div class="card-video__play-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
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

  Object.keys(workouts).forEach(day => {
    const data  = workouts[day];
    const color = DAY_COLORS[day];
    const panel = document.createElement('div');
    panel.className = 'day-panel';
    panel.id = `panel-${day}`;
    if (day === 'segunda') panel.classList.add('active');

    if (!data) {
      // Domingo — descanso ativo
      panel.innerHTML = `
        <div class="rest-card">
          <div class="rest-icon">🧘</div>
          <h2>DESCANSO ATIVO</h2>
          <p>Hoje é dia de recuperação. Seu corpo cresce durante o descanso, não na academia.<br/>
          <strong>Sugestão:</strong> 15 min de alongamento global + caminhada leve de 20–30 min.</p>
          <div class="motivational">
            "O descanso não é fraqueza — é parte do treino. Amanhã você volta mais forte." 💪
          </div>
        </div>`;
    } else {
      const saved = lsGet(`exercises_${day}`, {});
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
          <span class="focus-badge">${data.focus}</span>
        </div>
        <div class="exercise-grid">${cardsHtml}</div>`;
    }

    container.appendChild(panel);
  });

  // Eventos de checkbox
  container.addEventListener('change', e => {
    if (!e.target.classList.contains('card-checkbox')) return;
    const { day, idx } = e.target.dataset;
    const saved = lsGet(`exercises_${day}`, {});
    saved[idx] = e.target.checked;
    lsSet(`exercises_${day}`, saved);
    const card = document.getElementById(`card-${day}-${idx}`);
    if (card) card.classList.toggle('done', e.target.checked);
    checkDayComplete(day);
    if (e.target.checked) markTodayTrained();
  });

  animateCards('segunda');
}

function checkDayComplete(day) {
  const data = workouts[day];
  if (!data) return;
  const saved  = lsGet(`exercises_${day}`, {});
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

/* ============================================================
   SELETOR DE DIAS
   ============================================================ */
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
      // Para vídeos em outros painéis ao trocar de dia
      document.querySelectorAll('.card-video.playing').forEach(c => {
        const f = c.querySelector('.card-video__iframe');
        if (f) f.src = '';
        c.classList.remove('playing');
      });
    });
  });
}

function resetDay() {
  const activeBtn = document.querySelector('.day-btn.active');
  if (!activeBtn) return;
  const day = activeBtn.dataset.day;
  lsSet(`exercises_${day}`, {});
  const panel = document.getElementById(`panel-${day}`);
  if (panel) {
    panel.querySelectorAll('.card-checkbox').forEach(cb => (cb.checked = false));
    panel.querySelectorAll('.exercise-card').forEach(card => card.classList.remove('done'));
  }
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.remove('show');
}

/* ============================================================
   PÁGINA DE DIETA
   ============================================================ */
function initWeightDiet() {
  const input = document.getElementById('current-weight-diet');
  const fill  = document.getElementById('weight-fill-diet');
  const pct   = document.getElementById('weight-percent-diet');
  if (!input) return;
  const saved = lsGet('currentWeight', START_WEIGHT);
  input.value = saved;
  updateWeightBar(saved, fill, pct);
  input.addEventListener('input', () => {
    const w = parseFloat(input.value) || START_WEIGHT;
    lsSet('currentWeight', w);
    updateWeightBar(w, fill, pct);
  });
}

function renderMacros() {
  const container = document.getElementById('macros-container');
  if (!container) return;
  const macros = [
    { icon: '🔥', name: 'Calorias',     value: '3.200–3.500', unit: 'kcal / dia', bar: 85, color: '#FF6B00' },
    { icon: '🥩', name: 'Proteína',     value: '150–160',     unit: 'g / dia',    bar: 70, color: '#FF006E' },
    { icon: '🍞', name: 'Carboidratos', value: '420',         unit: 'g / dia',    bar: 90, color: '#FFD700' },
    { icon: '🥑', name: 'Gorduras',     value: '90–100',      unit: 'g / dia',    bar: 60, color: '#06D6A0' },
  ];
  container.innerHTML = macros.map(m => `
    <div class="macro-card">
      <div class="macro-icon">${m.icon}</div>
      <div class="macro-name">${m.name}</div>
      <div class="macro-value">${m.value}</div>
      <div class="macro-unit">${m.unit}</div>
      <div class="macro-bar">
        <div class="macro-bar-fill" style="width:0%;background:${m.color}" data-target="${m.bar}"></div>
      </div>
    </div>`).join('');
  setTimeout(() => {
    container.querySelectorAll('.macro-bar-fill').forEach(b => (b.style.width = b.dataset.target + '%'));
  }, 200);
}

function renderMeals() {
  const container = document.getElementById('meals-container');
  if (!container) return;
  const saved = lsGet('meals_checked', {});
  container.innerHTML = meals.map((meal, i) => `
    <div class="meal-card ${saved[i] ? 'meal-done' : ''}" id="meal-card-${i}">
      <div class="meal-header">
        <span class="meal-emoji">${meal.emoji}</span>
        <div class="meal-info">
          <div class="meal-name">${meal.name}</div>
          <div class="meal-time">${meal.time}</div>
        </div>
        <span class="meal-kcal">${meal.kcal} kcal</span>
        <input type="checkbox" class="meal-check" id="mcheck-${i}"
          data-idx="${i}" data-kcal="${meal.kcal}" ${saved[i] ? 'checked' : ''}/>
      </div>
      <div class="meal-body">
        <ul class="meal-items">${meal.items.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>
    </div>`).join('');

  container.querySelectorAll('.meal-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('animate-in'), i * 70);
  });
  updateKcalCounter();

  container.addEventListener('change', e => {
    if (!e.target.classList.contains('meal-check')) return;
    const idx = parseInt(e.target.dataset.idx);
    const sv  = lsGet('meals_checked', {});
    sv[idx] = e.target.checked;
    lsSet('meals_checked', sv);
    document.getElementById(`meal-card-${idx}`)?.classList.toggle('meal-done', e.target.checked);
    updateKcalCounter();
  });
}

function updateKcalCounter() {
  const el = document.getElementById('kcal-done');
  if (!el) return;
  const sv = lsGet('meals_checked', {});
  let total = 0;
  meals.forEach((m, i) => { if (sv[i]) total += m.kcal; });
  el.innerHTML = `<strong>${total.toLocaleString('pt-BR')}</strong> <span>/ ${TOTAL_KCAL.toLocaleString('pt-BR')} kcal consumidas hoje</span>`;
}

function resetMeals() {
  lsSet('meals_checked', {});
  document.querySelectorAll('.meal-check').forEach(cb => (cb.checked = false));
  document.querySelectorAll('.meal-card').forEach(card => card.classList.remove('meal-done'));
  updateKcalCounter();
}

function renderTips() {
  const container = document.getElementById('tips-container');
  if (!container) return;
  const tips = [
    { icon: '🔔', title: 'Coma de 3 em 3 horas',           text: 'Configure alarme no celular. Consistência é chave para hard gainers.' },
    { icon: '🥜', title: 'Prefira alimentos calóricos',     text: 'Amendoim, banana, arroz, ovos, queijo — densos em calorias e nutrientes.' },
    { icon: '🫒', title: 'Enriqueça as refeições',          text: 'Adicione azeite, pasta de amendoim e leite integral a tudo que puder.' },
    { icon: '💧', title: 'Não beba água antes das refeições', text: 'Evita saciedade precoce. Beba após ou 30 min antes das principais.' },
    { icon: '🥤', title: 'Use hipercalórico estratégico',   text: 'Nos dias em que não conseguir bater as calorias apenas pela comida.' },
    { icon: '😴', title: 'Durma 7–9 horas',                 text: 'O músculo cresce no descanso, não na academia. Sono é anabolismo grátis.' },
  ];
  container.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div class="tip-text">
        <strong>${tip.title}</strong>
        <span>${tip.text}</span>
      </div>
    </div>`).join('');
  container.querySelectorAll('.tip-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('animate-in'), i * 80);
  });
}

function renderSupplements() {
  const container = document.getElementById('supplements-container');
  if (!container) return;
  const supps = [
    { name: 'Whey Protein',        dose: '1–2 doses/dia',       reason: 'Fechar meta de proteína de forma prática e rápida.' },
    { name: 'Creatina',            dose: '3–5g/dia',             reason: 'Aumenta força, volume muscular e recuperação.' },
    { name: 'Hipercalórico',       dose: 'Conforme necessidade', reason: 'Para dias com pouca fome — difícil bater 3.500 kcal.' },
    { name: 'Vitamina D3 + Zinco', dose: 'Conforme rótulo',      reason: 'Suporte hormonal e imunidade — essencial no inverno.' },
  ];
  container.innerHTML = supps.map(s => `
    <div class="supplement-card">
      <div class="supplement-name">${s.name}</div>
      <div class="supplement-dose">💊 ${s.dose}</div>
      <div class="supplement-reason">${s.reason}</div>
    </div>`).join('');
  container.querySelectorAll('.supplement-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('animate-in'), i * 80);
  });
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate-in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.tip-card, .supplement-card, .meal-card').forEach(el => obs.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Página de treino
  if (document.getElementById('panels')) {
    renderPanels();
    initDaySelector();
    initWeightProgress();
    renderWeeklyCounter();
    checkDayComplete('segunda');
  }
  // Página de dieta
  if (document.getElementById('meals-container')) {
    renderMacros();
    renderMeals();
    renderTips();
    renderSupplements();
    initWeightDiet();
    initScrollAnimations();
  }
});

// Funções globais (chamadas via onclick inline)
window.playVideo  = playVideo;
window.resetDay   = resetDay;
window.resetWeek  = resetWeek;
window.resetMeals = resetMeals;
