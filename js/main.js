/* ============================================================
   IAPersornal — main.js
   Funcionalidades: seletor de dias, checklist de exercícios,
   checklist de refeições, progresso de peso, contador semanal.
   Persistência via localStorage.
   ============================================================ */

/* ── Constantes ── */
const START_WEIGHT = 55;
const GOAL_WEIGHT  = 65;
const TOTAL_KCAL   = 3750;

/* ── Paleta de cores por dia / grupo muscular ── */
const DAY_COLORS = {
  segunda: '#FF6B00',
  terca:   '#3A86FF',
  quarta:  '#06D6A0',
  quinta:  '#FFD700',
  sexta:   '#FF006E',
  sabado:  '#FF6B00',
  domingo: '#06D6A0',
};

/* ── Dados de treino ── */
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
        tip: 'Escápulas retraídas e pés firmes. Desça a barra com controle até tocar levemente o peito e empurre explosivamente.',
      },
      {
        name: 'Supino Inclinado com Halteres',
        sets: '3 × 10–12',
        muscle: 'PEITO SUPERIOR',
        icon: '📐',
        tip: 'Inclinação de 30–45°. Foque na contração da parte superior do peitoral. Controle a descida.',
      },
      {
        name: 'Crossover na Polia',
        sets: '3 × 12–15',
        muscle: 'PEITO',
        icon: '🔀',
        tip: 'Puxe os cabos em arco cruzando as mãos na frente do corpo. Sinta a compressão do peitoral no ponto de cruzamento.',
      },
      {
        name: 'Crucifixo com Halteres',
        sets: '3 × 12',
        muscle: 'PEITO',
        icon: '✈️',
        tip: 'Cotovelos levemente dobrados. Abra sentindo o alongamento e feche contraindo o peito. Movimento amplo e controlado.',
      },
      {
        name: 'Flexão de Braços',
        sets: '3 × falha',
        muscle: 'PEITO / TRÍCEPS',
        icon: '⬇️',
        tip: 'Corpo reto como prancha. Desça até o peito quase tocar o chão. Empurre explosivo. Finalização perfeita.',
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
        tip: 'Puxe a barra até a altura do queixo. Projete o peito para fora e comprima as escápulas. Controle a volta.',
      },
      {
        name: 'Remada Curvada com Barra',
        sets: '4 × 8–10',
        muscle: 'COSTAS MÉDIAS',
        icon: '↩️',
        tip: 'Tronco a 45°. Puxe a barra em direção ao umbigo, contraindo as escápulas ao final. Sem balançar o tronco.',
      },
      {
        name: 'Remada Unilateral com Halter',
        sets: '3 × 10–12',
        muscle: 'LATÍSSIMO',
        icon: '💪',
        tip: 'Apoie o joelho e a mão no banco. Puxe o halter em direção ao quadril com o cotovelo junto ao corpo.',
      },
      {
        name: 'Pull-down Pegada Neutra',
        sets: '3 × 12',
        muscle: 'LATÍSSIMO',
        icon: '⬇️',
        tip: 'Use pegada neutra paralela. Ativa mais o latíssimo e reduz tensão nos ombros. Ideal para iniciantes.',
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
        tip: 'Pés na largura dos ombros. Desça até as coxas paralelas ao chão. Joelhos na direção dos pés. Rei dos exercícios.',
      },
      {
        name: 'Leg Press 45°',
        sets: '4 × 10–12',
        muscle: 'QUADRÍCEPS',
        icon: '🦵',
        tip: 'Não trave os joelhos no topo. Desça controlando até 90°. Pés no centro da plataforma.',
      },
      {
        name: 'Cadeira Extensora',
        sets: '3 × 12–15',
        muscle: 'QUADRÍCEPS',
        icon: '⬆️',
        tip: 'Suba controlado, pause 1 segundo com o músculo contraído no topo, desça lentamente. Foco na contração.',
      },
      {
        name: 'Mesa Flexora',
        sets: '3 × 12–15',
        muscle: 'ISQUIOTIBIAIS',
        icon: '⬇️',
        tip: 'O excêntrico (descida) é fundamental. Desça em 3 segundos. Não use momentum. Quadril fixo na mesa.',
      },
      {
        name: 'Panturrilha em Pé',
        sets: '4 × 15–20',
        muscle: 'PANTURRILHA',
        icon: '⬆️',
        tip: 'Eleve completamente na ponta dos pés e desça abaixo do nível do degrau para máximo alongamento.',
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
        tip: 'Sente-se com encosto. Empurre os halteres sem travar os cotovelos. Controle a descida até 90°.',
      },
      {
        name: 'Elevação Lateral',
        sets: '4 × 12–15',
        muscle: 'DELTÓIDE LATERAL',
        icon: '↔️',
        tip: 'Cotovelos levemente dobrados. Suba até a altura dos ombros. Controle a descida em 2 segundos.',
      },
      {
        name: 'Elevação Frontal',
        sets: '3 × 12',
        muscle: 'DELTÓIDE FRONTAL',
        icon: '⬆️',
        tip: 'Levante um halter de cada vez à frente do corpo até a altura dos ombros. Evite balançar o tronco.',
      },
      {
        name: 'Encolhimento com Halteres',
        sets: '3 × 12–15',
        muscle: 'TRAPÉZIO',
        icon: '⬆️',
        tip: 'Eleve os ombros em direção às orelhas e segure 1–2 segundos. Não role os ombros. Direto para cima e para baixo.',
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
        tip: 'Cotovelos fixos ao lado do corpo. Suba controlado e desça lentamente. Evite balançar o tronco.',
      },
      {
        name: 'Rosca Alternada com Halteres',
        sets: '3 × 10 cada',
        muscle: 'BÍCEPS',
        icon: '🔄',
        tip: 'Alterne os braços. Gire o pulso supinando no topo para máxima contração do bíceps.',
      },
      {
        name: 'Martelo com Halteres',
        sets: '3 × 12',
        muscle: 'BRAQUIAL / BÍCEPS',
        icon: '🔨',
        tip: 'Pegada neutra (polegar aponta para cima). Trabalha o braquial e dá espessura ao braço.',
      },
      {
        name: 'Tríceps Corda na Polia',
        sets: '4 × 12–15',
        muscle: 'TRÍCEPS',
        icon: '⬇️',
        tip: 'Abra a corda no final do movimento para maior ativação das cabeças laterais. Cotovelos fixos.',
      },
      {
        name: 'Tríceps Francês',
        sets: '3 × 10–12',
        muscle: 'TRÍCEPS',
        icon: '💡',
        tip: 'Skull crusher: desça o halter até próximo da testa controlando o excêntrico. Cotovelos apontados para cima.',
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
        tip: 'Pegada na largura dos ombros. Desça controlado até tocar levemente o peito superior.',
      },
      {
        name: 'Peck Deck (Voador)',
        sets: '3 × 12–15',
        muscle: 'PEITO',
        icon: '🦅',
        tip: 'Mantenha um arco nos cotovelos durante todo o movimento. Foque na contração no centro do peito.',
      },
      {
        name: 'Pullover com Halter',
        sets: '3 × 12',
        muscle: 'PEITO / COSTAS',
        icon: '🔄',
        tip: 'Deite transversal no banco. Desça o halter atrás da cabeça sentindo o alongamento do peitoral e retorna.',
      },
      {
        name: 'Prancha',
        sets: '3 × 45 seg',
        muscle: 'CORE',
        icon: '⏱️',
        tip: 'Corpo reto, abdômen e glúteos contraídos. Respire normalmente. Não deixe o quadril subir ou cair.',
      },
      {
        name: 'Abdominal Crunch',
        sets: '3 × 20',
        muscle: 'ABDÔMEN',
        icon: '🔥',
        tip: 'Enrole apenas o tronco superior. Expire ao subir, inspire ao descer. Sem tensão no pescoço.',
      },
    ],
  },
  domingo: null, // descanso ativo
};

/* ── Dados das refeições ── */
const meals = [
  {
    time: '07h',
    emoji: '☀️',
    name: 'Café da Manhã',
    kcal: 700,
    items: [
      '4 ovos mexidos com azeite',
      '2 fatias de pão integral com pasta de amendoim',
      '1 banana grande',
      '1 copo de leite integral (300 ml)',
    ],
  },
  {
    time: '10h',
    emoji: '🥗',
    name: 'Lanche da Manhã',
    kcal: 400,
    items: [
      '1 iogurte grego integral',
      '1 punhado de castanhas (30g)',
      '1 fruta (manga ou maçã)',
    ],
  },
  {
    time: '13h',
    emoji: '🍽️',
    name: 'Almoço',
    kcal: 800,
    items: [
      '200g de frango grelhado ou carne vermelha magra',
      '4 colheres de arroz branco',
      '1 concha de feijão',
      'Salada à vontade com azeite',
      '1 colher de sopa de azeite extra',
    ],
  },
  {
    time: '16h',
    emoji: '🥤',
    name: 'Pré-Treino',
    kcal: 450,
    items: [
      'Shake: 300 ml leite integral + 2 col. aveia + 1 banana + 1 col. pasta de amendoim',
      'Opcional: 1 dose de whey protein',
    ],
  },
  {
    time: '19h',
    emoji: '💪',
    name: 'Pós-Treino',
    kcal: 500,
    items: [
      '1 dose de whey protein com leite',
      '2 batatas-doces médias',
      '150g de peito de frango',
    ],
  },
  {
    time: '21h',
    emoji: '🌙',
    name: 'Jantar',
    kcal: 600,
    items: [
      'Omelete com 4 ovos + queijo + legumes',
      '2 fatias de pão integral',
      '1 copo de leite com achocolatado (não diet)',
    ],
  },
  {
    time: '23h',
    emoji: '😴',
    name: 'Ceia',
    kcal: 300,
    items: [
      'Iogurte grego com mel e granola',
      'OU 2 colheres de pasta de amendoim com banana',
    ],
  },
];

/* ── Helpers de LocalStorage ── */
function lsGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/* ══════════════════════════════════════════════
   PÁGINA DE TREINO — index.html
══════════════════════════════════════════════ */

/* ── Peso / Progresso ── */
function initWeightProgress() {
  const input  = document.getElementById('current-weight');
  const fill   = document.getElementById('weight-fill');
  const pct    = document.getElementById('weight-percent');
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
  if (fill) fill.style.width = percent + '%';
  if (pctEl) pctEl.textContent = `${percent}% concluído (${current} kg → ${GOAL_WEIGHT} kg)`;
}

/* ── Contador semanal ── */
function getWeekKey() {
  const now  = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `week_${now.getFullYear()}_${week}`;
}

function initWeeklyCounter() {
  const el = document.getElementById('weekly-text');
  if (!el) return;
  renderWeeklyCounter();
}

function renderWeeklyCounter() {
  const el = document.getElementById('weekly-text');
  if (!el) return;
  const data  = lsGet(getWeekKey(), []);
  const count = data.length;
  el.textContent = `Você treinou ${count}/6 dias esta semana`;
}

function markTodayTrained() {
  const key  = getWeekKey();
  const data = lsGet(key, []);
  const today = new Date().toDateString();
  if (!data.includes(today)) {
    data.push(today);
    lsSet(key, data);
  }
  renderWeeklyCounter();
}

function resetWeek() {
  lsSet(getWeekKey(), []);
  renderWeeklyCounter();
}

/* ── Renderizar exercícios ── */
function renderPanels() {
  const container = document.getElementById('panels');
  if (!container) return;

  const days = Object.keys(workouts);
  days.forEach(day => {
    const data  = workouts[day];
    const color = DAY_COLORS[day];
    const panel = document.createElement('div');
    panel.className = 'day-panel';
    panel.id = `panel-${day}`;

    if (day === 'segunda') panel.classList.add('active');

    if (!data) {
      // Descanso
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
      const focusBadge = `<span class="focus-badge">${data.focus}</span>`;
      const cardsHtml = data.exercises.map((ex, i) => {
        const checked = saved[i] ? 'checked' : '';
        const doneClass = saved[i] ? 'done' : '';
        return `
          <div class="exercise-card ${doneClass}" id="card-${day}-${i}" style="--card-color:${color}">
            <div class="card-visual" style="background:linear-gradient(135deg,${color}22,${color}05)">
              <span>${ex.icon}</span>
            </div>
            <div class="card-body">
              <span class="card-muscle" style="background:${color}">${ex.muscle}</span>
              <div class="card-name">${ex.name}</div>
              <div class="card-sets">${ex.sets}</div>
              <div class="card-tip">${ex.tip}</div>
              <div class="card-check-area">
                <input type="checkbox" class="card-checkbox" id="chk-${day}-${i}"
                  data-day="${day}" data-idx="${i}" ${checked} />
                <label class="card-check-label" for="chk-${day}-${i}">Marcar como concluído</label>
              </div>
            </div>
          </div>`;
      }).join('');

      panel.innerHTML = `
        <div class="day-panel-header">
          <span class="day-panel-title" style="color:${color}">${data.fullName}</span>
          ${focusBadge}
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

  // Animar cards do dia inicial
  animateCards('segunda');
}

function checkDayComplete(day) {
  const data = workouts[day];
  if (!data) return;
  const saved = lsGet(`exercises_${day}`, {});
  const total = data.exercises.length;
  const done  = Object.values(saved).filter(Boolean).length;
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.toggle('show', done >= total && total > 0);
}

function animateCards(day) {
  const panel = document.getElementById(`panel-${day}`);
  if (!panel) return;
  const cards = panel.querySelectorAll('.exercise-card, .meal-card, .tip-card, .supplement-card, .rest-card');
  cards.forEach((card, i) => {
    card.classList.remove('animate-in');
    setTimeout(() => card.classList.add('animate-in'), i * 80);
  });
}

/* ── Seletor de dias ── */
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
      if (panel) {
        panel.classList.add('active');
        animateCards(day);
      }

      const banner = document.getElementById('completion-banner');
      if (banner) {
        banner.classList.remove('show');
        checkDayComplete(day);
      }
    });
  });
}

/* ── Reset do dia ── */
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

/* ══════════════════════════════════════════════
   PÁGINA DE DIETA — dieta.html
══════════════════════════════════════════════ */

/* ── Progresso de peso na página de dieta ── */
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

/* ── Renderizar refeições ── */
function renderMeals() {
  const container = document.getElementById('meals-container');
  if (!container) return;

  const savedMeals = lsGet('meals_checked', {});

  const html = meals.map((meal, i) => {
    const checked = savedMeals[i] ? 'checked' : '';
    const doneClass = savedMeals[i] ? 'meal-done' : '';
    const itemsHtml = meal.items.map(item => `<li>${item}</li>`).join('');
    return `
      <div class="meal-card ${doneClass}" id="meal-card-${i}">
        <div class="meal-header">
          <span class="meal-emoji">${meal.emoji}</span>
          <div class="meal-info">
            <div class="meal-name">${meal.name}</div>
            <div class="meal-time">${meal.time}</div>
          </div>
          <span class="meal-kcal">${meal.kcal} kcal</span>
          <input type="checkbox" class="meal-check" id="mcheck-${i}"
            data-idx="${i}" data-kcal="${meal.kcal}" ${checked} />
        </div>
        <div class="meal-body">
          <ul class="meal-items">${itemsHtml}</ul>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = html;

  // Animar
  container.querySelectorAll('.meal-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('animate-in'), i * 70);
  });

  updateKcalCounter();

  // Eventos de checkbox
  container.addEventListener('change', e => {
    if (!e.target.classList.contains('meal-check')) return;
    const idx = parseInt(e.target.dataset.idx);
    const savedMeals = lsGet('meals_checked', {});
    savedMeals[idx] = e.target.checked;
    lsSet('meals_checked', savedMeals);

    const card = document.getElementById(`meal-card-${idx}`);
    if (card) card.classList.toggle('meal-done', e.target.checked);

    updateKcalCounter();
  });
}

function updateKcalCounter() {
  const el = document.getElementById('kcal-done');
  if (!el) return;
  const savedMeals = lsGet('meals_checked', {});
  let total = 0;
  meals.forEach((meal, i) => {
    if (savedMeals[i]) total += meal.kcal;
  });
  el.innerHTML = `<strong>${total.toLocaleString('pt-BR')}</strong> <span>/ ${TOTAL_KCAL.toLocaleString('pt-BR')} kcal consumidas hoje</span>`;
}

function resetMeals() {
  lsSet('meals_checked', {});
  document.querySelectorAll('.meal-check').forEach(cb => (cb.checked = false));
  document.querySelectorAll('.meal-card').forEach(card => card.classList.remove('meal-done'));
  updateKcalCounter();
}

/* ── Renderizar macros ── */
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

  // Animar barras
  setTimeout(() => {
    container.querySelectorAll('.macro-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 200);
}

/* ── Renderizar dicas ── */
function renderTips() {
  const container = document.getElementById('tips-container');
  if (!container) return;

  const tips = [
    { icon: '🔔', title: 'Coma de 3 em 3 horas',       text: 'Configure alarme no celular. Consistência é chave para hard gainers.' },
    { icon: '🥜', title: 'Prefira alimentos calóricos', text: 'Amendoim, banana, arroz, ovos, queijo — densos em calorias e nutrientes.' },
    { icon: '🫒', title: 'Enriqueça as refeições',      text: 'Adicione azeite, pasta de amendoim e leite integral a tudo que puder.' },
    { icon: '💧', title: 'Não beba água antes das refeições', text: 'Evita saciedade precoce. Beba após ou 30 min antes das refeições principais.' },
    { icon: '🥤', title: 'Use hipercalórico estratégico', text: 'Nos dias em que não conseguir bater as calorias apenas pela comida.' },
    { icon: '😴', title: 'Durma 7–9 horas',             text: 'O músculo cresce no descanso, não na academia. Sono é anabolismo grátis.' },
  ];

  container.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div class="tip-text">
        <strong>${tip.title}</strong>
        <span>${tip.text}</span>
      </div>
    </div>`).join('');

  // Animar
  container.querySelectorAll('.tip-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('animate-in'), i * 80);
  });
}

/* ── Renderizar suplementos ── */
function renderSupplements() {
  const container = document.getElementById('supplements-container');
  if (!container) return;

  const supps = [
    { name: 'Whey Protein',       dose: '1–2 doses/dia',    reason: 'Fechar meta de proteína de forma prática e rápida.' },
    { name: 'Creatina',           dose: '3–5g/dia',          reason: 'Aumenta força, volume muscular e recuperação.' },
    { name: 'Hipercalórico',      dose: 'Conforme necessidade', reason: 'Para dias com pouca fome — difícil bater 3.500 kcal.' },
    { name: 'Vitamina D3 + Zinco', dose: 'Conforme rótulo', reason: 'Suporte hormonal e imunidade — essencial no inverno.' },
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

/* ── Scroll animation com IntersectionObserver ── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tip-card, .supplement-card, .meal-card').forEach(el => {
    observer.observe(el);
  });
}

/* ── Inicialização ── */
document.addEventListener('DOMContentLoaded', () => {
  // Página de Treino (index.html)
  if (document.getElementById('panels')) {
    renderPanels();
    initDaySelector();
    initWeightProgress();
    initWeeklyCounter();
    checkDayComplete('segunda');
  }

  // Página de Dieta (dieta.html)
  if (document.getElementById('meals-container')) {
    renderMacros();
    renderMeals();
    renderTips();
    renderSupplements();
    initWeightDiet();
    initScrollAnimations();
  }
});

// Expor funções globais necessárias para onclick inline
window.resetDay   = resetDay;
window.resetWeek  = resetWeek;
window.resetMeals = resetMeals;
