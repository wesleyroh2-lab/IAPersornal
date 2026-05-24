/* ============================================================
   IAPersornal — main.js
   Treino Hipertrofia Wesley | Seg–Sex | ~1h por sessão
   Dieta | Persistência via localStorage | Sem frameworks
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
  sabado:  null,
  domingo: null,
};

/* ============================================================
   TREINO SEG–SEX — HIPERTROFIA MUSCULAR (~60 min/dia)
   Foco: progressão de carga, exercícios compostos + isolados
   ============================================================ */
const workouts = {

  /* ── SEGUNDA: PEITO + TRÍCEPS ── */
  segunda: {
    fullName: 'Segunda-feira',
    focus:    'PEITO + TRÍCEPS',
    icon:     '🫀',
    duration: '~60 min',
    exercises: [
      {
        name:      'Supino Reto com Barra',
        sets:      '4 × 6–8 reps',
        muscle:    'PEITO',
        icon:      '🏋️',
        youtubeId: 'vIGvt-vgrvY',
        tip:       'Rei do peito. Escápulas retraídas e deprimidas, pés firmes. Desça controlado até o peito tocar levemente a barra e empurre de forma explosiva.',
      },
      {
        name:      'Supino Inclinado com Halteres',
        sets:      '4 × 8–10 reps',
        muscle:    'PEITO SUPERIOR',
        icon:      '📐',
        youtubeId: 'G-i3jMIbDmo',
        tip:       'Banco a 30–45°. Máximo alongamento na descida. Foco na parte clavicular do peitoral. Contração total no topo.',
      },
      {
        name:      'Supino Declinado com Barra',
        sets:      '3 × 8–10 reps',
        muscle:    'PEITO INFERIOR',
        icon:      '⬇️',
        youtubeId: 'LfyQTpGnFNw',
        tip:       'Ativa a porção esternal inferior do peitoral. Cuidado com o pescoço. Barra desce até baixo do peito. Pegada mais larga.',
      },
      {
        name:      'Peck Deck (Voador)',
        sets:      '3 × 12–15 reps',
        muscle:    'PEITO / ISOLAÇÃO',
        icon:      '🦅',
        youtubeId: 'FwtqdGlRgig',
        tip:       'Mantenha arco no cotovelo durante todo o movimento. Espelhe um abraço ao fechar. Pause 1 seg contraído. Controle total na volta.',
      },
      {
        name:      'Tríceps Corda na Polia',
        sets:      '4 × 12–15 reps',
        muscle:    'TRÍCEPS',
        icon:      '⬇️',
        youtubeId: '7le1JRUUagM',
        tip:       'Cotovelos fixos ao lado do corpo. Abra a corda no final para ativar as cabeças lateral e medial. Controle total no retorno.',
      },
      {
        name:      'Tríceps Francês (Skull Crusher)',
        sets:      '3 × 10–12 reps',
        muscle:    'TRÍCEPS CABEÇA LONGA',
        icon:      '💡',
        youtubeId: 'RavQHfFxbdA',
        tip:       'Deite no banco. Desça o halter/barra até próximo da testa controlando o excêntrico em 3 seg. Cotovelos apontados para cima e fixos.',
      },
    ],
  },

  /* ── TERÇA: COSTAS + BÍCEPS ── */
  terca: {
    fullName: 'Terça-feira',
    focus:    'COSTAS + BÍCEPS',
    icon:     '🦅',
    duration: '~60 min',
    exercises: [
      {
        name:      'Barra Fixa (Pull-up)',
        sets:      '4 × 6–8 reps',
        muscle:    'LATÍSSIMO / LARGURA',
        icon:      '⬇️',
        youtubeId: 'eGo4IYlbE5g',
        tip:       'O melhor exercício para largura de costas. Pegada supinada (chin-up) ou pronada. Desça até total extensão. Puxe o queixo acima da barra.',
      },
      {
        name:      'Remada Curvada com Barra',
        sets:      '4 × 8–10 reps',
        muscle:    'COSTAS MÉDIAS / ESPESSURA',
        icon:      '↩️',
        youtubeId: 'VJHBEy2duVc',
        tip:       'Tronco a 45°, costas retas. Puxe a barra em direção ao umbigo comprimindo as escápulas. Sem balançar o tronco.',
      },
      {
        name:      'Puxada Frontal na Polia',
        sets:      '4 × 10–12 reps',
        muscle:    'LATÍSSIMO',
        icon:      '⬇️',
        youtubeId: '25XTUWnt_R4',
        tip:       'Puxe a barra até a altura do queixo. Projete o peito para fora e comprima as escápulas ao final. Controle a subida.',
      },
      {
        name:      'Remada Unilateral com Halter',
        sets:      '3 × 10–12 reps',
        muscle:    'LATÍSSIMO / UNILATERAL',
        icon:      '💪',
        youtubeId: 'SUvZiVClLKw',
        tip:       'Apoie joelho e mão no banco. Puxe o halter em direção ao quadril com o cotovelo junto ao corpo. Foque na retração escapular.',
      },
      {
        name:      'Rosca Direta com Barra',
        sets:      '4 × 10–12 reps',
        muscle:    'BÍCEPS',
        icon:      '💪',
        youtubeId: 'Et1wgGMGW8w',
        tip:       'Cotovelos fixos ao lado do corpo. Suba controlado. Desça em 3 segundos (excêntrico). Evite usar o tronco como impulso.',
      },
      {
        name:      'Rosca Martelo com Halteres',
        sets:      '3 × 12 reps',
        muscle:    'BRAQUIAL / BÍCEPS',
        icon:      '🔨',
        youtubeId: '1-xCKLVxqqg',
        tip:       'Pegada neutra (polegar para cima). Trabalha o braquial e dá espessura ao braço. Alterne os braços. Sem balançar.',
      },
    ],
  },

  /* ── QUARTA: PERNAS ── */
  quarta: {
    fullName: 'Quarta-feira',
    focus:    'PERNAS COMPLETO',
    icon:     '🦵',
    duration: '~65 min',
    exercises: [
      {
        name:      'Agachamento Livre com Barra',
        sets:      '4 × 6–8 reps',
        muscle:    'QUADRÍCEPS / GLÚTEOS',
        icon:      '🏋️',
        youtubeId: 'rM6SDUdl9fs',
        tip:       'Rei dos exercícios. Pés na largura dos ombros. Desça até as coxas paralelas ao chão. Joelhos na direção dos pés. Costas retas.',
      },
      {
        name:      'Leg Press 45°',
        sets:      '4 × 10–12 reps',
        muscle:    'QUADRÍCEPS / VOLUME',
        icon:      '🦵',
        youtubeId: 'waAxlYvtCcI',
        tip:       'Não trave os joelhos no topo. Desça controlando até 90°. Pés no centro da plataforma. Após o agachamento, ideal para volume extra.',
      },
      {
        name:      'Cadeira Extensora',
        sets:      '3 × 12–15 reps',
        muscle:    'QUADRÍCEPS ISOLADO',
        icon:      '⬆️',
        youtubeId: 'Svq2T3L9oKo',
        tip:       'Suba controlado, pause 1 segundo no topo com o músculo contraído, desça em 3 segundos. Foco total na contração do quadríceps.',
      },
      {
        name:      'Stiff com Barra',
        sets:      '4 × 8–10 reps',
        muscle:    'POSTERIOR / GLÚTEOS',
        icon:      '🏋️',
        youtubeId: '1uDiW5--re4',
        tip:       'Joelhos levemente flexionados. Desça sentindo o alongamento no posterior da coxa. Costas neutras em todo o movimento.',
      },
      {
        name:      'Mesa Flexora',
        sets:      '3 × 12–15 reps',
        muscle:    'ISQUIOTIBIAIS ISOLADO',
        icon:      '⬇️',
        youtubeId: '8Nat6GRiEoc',
        tip:       'O excêntrico (descida) é a fase mais importante. Desça em 3 segundos. Quadril fixo na mesa. Sem usar momentum.',
      },
      {
        name:      'Panturrilha em Pé',
        sets:      '4 × 15–20 reps',
        muscle:    'PANTURRILHA',
        icon:      '⬆️',
        youtubeId: 'nQmWQ3shmTw',
        tip:       'Eleve completamente na ponta dos pés e desça abaixo do nível do degrau para máximo alongamento. Pause 1 seg no topo.',
      },
    ],
  },

  /* ── QUINTA: OMBROS + TRAPÉZIO ── */
  quinta: {
    fullName: 'Quinta-feira',
    focus:    'OMBROS + TRAPÉZIO',
    icon:     '🏔️',
    duration: '~60 min',
    exercises: [
      {
        name:      'Desenvolvimento com Barra',
        sets:      '4 × 8–10 reps',
        muscle:    'DELTÓIDE / COMPOUND',
        icon:      '⬆️',
        youtubeId: 'eufDL9MmF8A',
        tip:       'Empurre a barra acima da cabeça sem travar os cotovelos no topo. Controle a descida até a altura do queixo. Core contraído.',
      },
      {
        name:      'Elevação Lateral com Halteres',
        sets:      '4 × 12–15 reps',
        muscle:    'DELTÓIDE LATERAL',
        icon:      '↔️',
        youtubeId: 'jannLx4RxKo',
        tip:       'Cotovelos levemente dobrados. Suba até a altura dos ombros com o indicador levemente para baixo. Controle a descida em 3 seg.',
      },
      {
        name:      'Elevação Frontal com Halteres',
        sets:      '3 × 12 reps',
        muscle:    'DELTÓIDE FRONTAL',
        icon:      '⬆️',
        youtubeId: 'kKjjeiXL960',
        tip:       'Levante alternando os braços à frente até a altura dos ombros. Tronco fixo sem balançar. Peso moderado para máxima amplitude.',
      },
      {
        name:      'Face Pull na Polia',
        sets:      '3 × 15 reps',
        muscle:    'DELTÓIDE POSTERIOR / MANGUITO',
        icon:      '🎯',
        youtubeId: 'rep-qVOkqgk',
        tip:       'Polia na altura dos olhos. Puxe em direção ao rosto abrindo os cotovelos para cima. Essencial para saúde do ombro e postura.',
      },
      {
        name:      'Remada Alta com Barra',
        sets:      '3 × 12 reps',
        muscle:    'DELTÓIDE / TRAPÉZIO',
        icon:      '⬆️',
        youtubeId: 'jOgSBer-tYo',
        tip:       'Pegada um pouco mais estreita que os ombros. Puxe a barra até a altura do queixo com os cotovelos acima das mãos.',
      },
      {
        name:      'Encolhimento com Halteres',
        sets:      '4 × 15 reps',
        muscle:    'TRAPÉZIO SUPERIOR',
        icon:      '⬆️',
        youtubeId: 'rqtfxLLuxn4',
        tip:       'Eleve os ombros em direção às orelhas e segure 1–2 segundos no topo. Não role os ombros. Movimento direto: sobe e desce.',
      },
    ],
  },

  /* ── SEXTA: BRAÇOS + CORE ── */
  sexta: {
    fullName: 'Sexta-feira',
    focus:    'BRAÇOS + CORE',
    icon:     '💪',
    duration: '~55 min',
    exercises: [
      {
        name:      'Rosca Direta com Barra',
        sets:      '4 × 10–12 reps',
        muscle:    'BÍCEPS / MASSA',
        icon:      '💪',
        youtubeId: 'Et1wgGMGW8w',
        tip:       'Cotovelos fixos ao lado do corpo. Suba controlado até a plena contração. Excêntrico lento de 3 segundos. Proibido balançar.',
      },
      {
        name:      'Rosca Alternada com Halteres',
        sets:      '3 × 12 reps cada',
        muscle:    'BÍCEPS / PEAK',
        icon:      '🔄',
        youtubeId: 'AuBN9_8Iihc',
        tip:       'Gire o pulso supinando no topo para máxima contração do bíceps. Concentre-se em cada braço alternadamente. Peso controlado.',
      },
      {
        name:      'Rosca Martelo com Halteres',
        sets:      '3 × 12 reps',
        muscle:    'BRAQUIAL / ESPESSURA',
        icon:      '🔨',
        youtubeId: '1-xCKLVxqqg',
        tip:       'Pegada neutra (polegar para cima) dá espessura e preenche o braço. Sem balançar o tronco. Movimento limpo e controlado.',
      },
      {
        name:      'Tríceps Corda na Polia',
        sets:      '4 × 12–15 reps',
        muscle:    'TRÍCEPS / CABEÇAS LATERAL E MEDIAL',
        icon:      '⬇️',
        youtubeId: '7le1JRUUagM',
        tip:       'Abra a corda ao final para ativar as cabeças lateral e medial. Cotovelos fixos. Controle absoluto no retorno. Não use peso excessivo.',
      },
      {
        name:      'Tríceps Francês com Halter',
        sets:      '3 × 10–12 reps',
        muscle:    'TRÍCEPS CABEÇA LONGA',
        icon:      '💡',
        youtubeId: 'RavQHfFxbdA',
        tip:       'Deite no banco, desça o halter por trás da cabeça controlando o excêntrico. Cotovelos apontados para cima e fixos. Máximo alongamento.',
      },
      {
        name:      'Prancha + Crunch Abdominal',
        sets:      '3 × 45 seg + 20 reps',
        muscle:    'CORE COMPLETO',
        icon:      '🔥',
        youtubeId: 'Yu0wjtD5FkU',
        tip:       'Superset finalizador: 45 seg de prancha → 20 crunch sem descanso. Core contraído, abdômen trabalhando. Finalize a semana forte!',
      },
    ],
  },

  /* ── SÁBADO: Descanso Ativo ── */
  sabado: null,

  /* ── DOMINGO: Descanso Ativo ── */
  domingo: null,
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
   PROGRESSO DE PESO (com meta editável)
   ============================================================ */
function initWeightProgress() {
  const curInput  = document.getElementById('current-weight');
  const goalInput = document.getElementById('goal-weight');
  const fill      = document.getElementById('weight-fill');
  const pct       = document.getElementById('weight-percent');
  if (!curInput) return;

  const savedCur  = lsGet('currentWeight', START_WEIGHT);
  const savedGoal = lsGet('goalWeight',    GOAL_WEIGHT);
  curInput.value  = savedCur;
  if (goalInput) goalInput.value = savedGoal;
  updateWeightBar(savedCur, savedGoal, fill, pct);

  curInput.addEventListener('input', () => {
    const w = parseFloat(curInput.value)  || START_WEIGHT;
    const g = parseFloat(goalInput?.value) || lsGet('goalWeight', GOAL_WEIGHT);
    lsSet('currentWeight', w);
    updateWeightBar(w, g, fill, pct);
  });
  if (goalInput) {
    goalInput.addEventListener('input', () => {
      const w = parseFloat(curInput.value) || lsGet('currentWeight', START_WEIGHT);
      const g = parseFloat(goalInput.value) || GOAL_WEIGHT;
      lsSet('goalWeight', g);
      updateWeightBar(w, g, fill, pct);
    });
  }
}

function updateWeightBar(current, goal, fill, pctEl) {
  const range   = goal - START_WEIGHT;
  const done    = Math.max(0, Math.min(current - START_WEIGHT, range));
  const percent = range > 0 ? Math.round((done / range) * 100) : 0;
  if (fill)  fill.style.width = Math.max(0, Math.min(100, percent)) + '%';
  if (pctEl) pctEl.textContent = `${percent}% concluído  •  ${current} kg → ${goal} kg`;
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
  const data = lsGet(getWeekKey(), []);
  el.textContent = `Você treinou ${data.length}/5 dias esta semana`;
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

  Object.keys(workouts).forEach(day => {
    const data  = workouts[day];
    const color = DAY_COLORS[day] || '#555577';
    const panel = document.createElement('div');
    panel.className = 'day-panel';
    panel.id = `panel-${day}`;
    if (day === 'segunda') panel.classList.add('active');

    if (!data) {
      panel.innerHTML = `
        <div class="rest-card">
          <div class="rest-icon">🧘</div>
          <h2>DESCANSO ATIVO</h2>
          <p>Hoje é dia de recuperação. Seu corpo cresce durante o descanso, não na academia.<br/>
          <strong>Sugestão:</strong> 15 min de alongamento global + caminhada leve de 20–30 min.</p>
          <div class="motivational">
            "O descanso não é fraqueza — é parte do treino. Na segunda você volta mais forte." 💪
          </div>
        </div>`;
    } else {
      const saved        = lsGet(`exercises_${day}`, {});
      const savedWeights = lsGet(`weights_${day}`, {});

      const cardsHtml = data.exercises.map((ex, i) => {
        const checked   = saved[i] ? 'checked' : '';
        const doneClass = saved[i] ? 'done' : '';
        const wVal      = savedWeights[i] ?? '';
        return `
          <div class="exercise-card ${doneClass}" id="card-${day}-${i}" style="--card-color:${color}">
            <div class="card-color-strip" style="background:${color}"></div>
            ${buildVideoHtml(ex.youtubeId, ex.name)}
            <div class="card-body">
              <span class="card-muscle" style="background:${color}">${ex.muscle}</span>
              <div class="card-name">${ex.name}</div>
              <div class="card-sets">${ex.sets}</div>
              <div class="card-tip">${ex.tip}</div>

              <div class="card-weight-row">
                <i class="fa-solid fa-dumbbell"></i>
                <input type="number" class="card-weight-input"
                  id="w-${day}-${i}" data-day="${day}" data-idx="${i}"
                  placeholder="Peso" min="0" step="2.5" value="${wVal}"/>
                <span class="cwl">kg</span>
              </div>

              <div class="card-actions">
                <div class="card-check-area">
                  <input type="checkbox" class="card-checkbox" id="chk-${day}-${i}"
                    data-day="${day}" data-idx="${i}" ${checked}/>
                  <label class="card-check-label" for="chk-${day}-${i}">Concluído</label>
                </div>
                <button class="btn-rest-timer" onclick="openRestTimer()" title="Cronômetro de descanso">
                  <i class="fa-solid fa-stopwatch"></i> Descanso
                </button>
              </div>
            </div>
          </div>`;
      }).join('');

      const durBadge = data.duration
        ? `<span class="duration-badge"><i class="fa-solid fa-clock"></i> ${data.duration}</span>`
        : '';

      panel.innerHTML = `
        <div class="day-panel-header">
          <span class="day-panel-title" style="color:${color}">${data.fullName}</span>
          <span class="focus-badge" style="border-color:${color};color:${color};background:${color}22">${data.focus}</span>
          ${durBadge}
        </div>
        <div class="exercise-grid">${cardsHtml}</div>`;
    }
    container.appendChild(panel);
  });

  // Evento: checkbox concluído
  container.addEventListener('change', e => {
    if (e.target.classList.contains('card-checkbox')) {
      const { day, idx } = e.target.dataset;
      const saved = lsGet(`exercises_${day}`, {});
      saved[idx] = e.target.checked;
      lsSet(`exercises_${day}`, saved);
      document.getElementById(`card-${day}-${idx}`)?.classList.toggle('done', e.target.checked);
      checkDayComplete(day);
      if (e.target.checked) markTodayTrained();
    }
    // Evento: peso do exercício
    if (e.target.classList.contains('card-weight-input')) {
      const { day, idx } = e.target.dataset;
      const wts = lsGet(`weights_${day}`, {});
      wts[idx] = parseFloat(e.target.value) || null;
      lsSet(`weights_${day}`, wts);
    }
  });

  // Salva peso também no blur (para inputs numéricos)
  container.addEventListener('input', e => {
    if (!e.target.classList.contains('card-weight-input')) return;
    const { day, idx } = e.target.dataset;
    const wts = lsGet(`weights_${day}`, {});
    wts[idx] = e.target.value !== '' ? parseFloat(e.target.value) : null;
    lsSet(`weights_${day}`, wts);
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
  const savedCur  = lsGet('currentWeight', START_WEIGHT);
  const savedGoal = lsGet('goalWeight',    GOAL_WEIGHT);
  input.value = savedCur;
  updateWeightBar(savedCur, savedGoal, fill, pct);
  input.addEventListener('input', () => {
    const w = parseFloat(input.value) || START_WEIGHT;
    const g = lsGet('goalWeight', GOAL_WEIGHT);
    lsSet('currentWeight', w);
    updateWeightBar(w, g, fill, pct);
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
    { icon: '🔔', title: 'Coma de 3 em 3 horas',              text: 'Configure alarme no celular. Consistência é chave para hard gainers.' },
    { icon: '🥜', title: 'Prefira alimentos calóricos',        text: 'Amendoim, banana, arroz, ovos, queijo — densos em calorias e nutrientes.' },
    { icon: '🫒', title: 'Enriqueça as refeições',             text: 'Adicione azeite, pasta de amendoim e leite integral a tudo que puder.' },
    { icon: '💧', title: 'Não beba água antes das refeições',  text: 'Evita saciedade precoce. Beba após ou 30 min antes das principais.' },
    { icon: '🥤', title: 'Use hipercalórico estratégico',      text: 'Nos dias em que não conseguir bater as calorias apenas pela comida.' },
    { icon: '😴', title: 'Durma 7–9 horas',                    text: 'O músculo cresce no descanso, não na academia. Sono é anabolismo grátis.' },
  ];
  container.innerHTML = tips.map(tip => `
    <div class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <div class="tip-text"><strong>${tip.title}</strong><span>${tip.text}</span></div>
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
  if (document.getElementById('panels')) {
    renderPanels();
    initDaySelector();
    initWeightProgress();
    renderWeeklyCounter();
    checkDayComplete('segunda');
  }
  if (document.getElementById('meals-container')) {
    renderMacros();
    renderMeals();
    renderTips();
    renderSupplements();
    initWeightDiet();
    initScrollAnimations();
  }
});

window.playVideo  = playVideo;
window.resetDay   = resetDay;
window.resetWeek  = resetWeek;
window.resetMeals = resetMeals;
