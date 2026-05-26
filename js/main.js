/* ============================================================
   IAPersornal — main.js
   Split ABC | Hipertrofia Avançada | Drop Set / Superset / Rest-Pause
   Wesley | Seg(A) Ter(B) Qua(C) Qui(A) Sex(B)
   ============================================================ */

const START_WEIGHT = 55;
const GOAL_WEIGHT  = 65;
const TOTAL_KCAL   = 3750;

/* ── Cores por treino ── */
const DAY_COLORS = {
  segunda: '#FF6B00', // A — Peito
  terca:   '#3A86FF', // B — Costas
  quarta:  '#06D6A0', // C — Pernas
  quinta:  '#FF6B00', // A — Peito (2ª rodada)
  sexta:   '#3A86FF', // B — Costas (2ª rodada)
  sabado:  null,
  domingo: null,
};

/* ============================================================
   TREINO A — PEITO + TRÍCEPS (foco pesado em peitoral)
   Técnicas: Drop Set | Superset | Rest-Pause
   ≈ 75 min
   ============================================================ */
const workoutA = {
  focus:    'PEITO + TRÍCEPS',
  label:    'TREINO A',
  icon:     '🫀',
  duration: '~75 min',
  exercises: [
    {
      name:      'Supino Reto com Barra',
      sets:      '5 × 5–6 reps',
      muscle:    'PEITO / COMPOUND',
      youtubeId: 'vIGvt-vgrvY',
      technique: null,
      tip:       'Composto principal pesado. 2 séries de aquecimento antes. Escápulas retraídas e deprimidas, pés firmes. Progressão de carga toda semana — ISSO é o crescimento.',
    },
    {
      name:      'Supino Inclinado com Halteres',
      sets:      '4 × 8–10 reps',
      muscle:    'PEITO SUPERIOR',
      youtubeId: 'G-i3jMIbDmo',
      technique: null,
      tip:       'Banco 30–45°. Desce abrindo os cotovelos para máximo alongamento. Sobe em arco convergindo os halteres. Foco absoluto na porção clavicular do peitoral.',
    },
    {
      name:      'Crucifixo Inclinado ➜ Flexão Explosiva',
      sets:      '3 × 12 + falha',
      muscle:    'PEITO / PRÉ-EXAUSTÃO',
      youtubeId: 'ZjIKUMtW37c',
      technique: 'SUPERSET',
      tip:       'SUPERSET: 12 crucifixos inclinados (alongamento máximo) → sem descanso → flexões explosivas até a falha total. Pré-exaustão + recrutamento máximo. Brutal.',
    },
    {
      name:      'Peck Deck — Drop Set',
      sets:      '3 × 12 → 8 → falha',
      muscle:    'PEITO MEDIAL / ISOLAÇÃO',
      youtubeId: 'FwtqdGlRgig',
      technique: 'DROP SET',
      tip:       'DROP SET: 12 reps pesado → sem descanso, reduz 30% → 8 reps → reduz 20% → vai à FALHA TOTAL. Bombeamento máximo de peitoral. Cada gota de sangue no músculo.',
    },
    {
      name:      'Crossover na Polia (baixo para cima)',
      sets:      '3 × 15–20 reps',
      muscle:    'PEITO INFERIOR / FINALIZADOR',
      youtubeId: 'E3aha5zhlc0',
      technique: null,
      tip:       'Polia baixa. Cruze as mãos acima do peito em arco. Ênfase na porção inferior e medial. Peso leve, contração máxima e isométrica no topo por 1 segundo.',
    },
    {
      name:      'Tríceps Corda na Polia',
      sets:      '4 × 12–15 reps',
      muscle:    'TRÍCEPS / 3 CABEÇAS',
      youtubeId: '7le1JRUUagM',
      technique: null,
      tip:       'Cotovelos fixos ao lado do corpo. ABRA a corda ao final para ativar as 3 cabeças. Últ. série: Rest-Pause → falha → 15s → mais 6 reps → 15s → mais 4. Acaba.',
    },
    {
      name:      'Tríceps Francês ➜ Mergulho no Banco',
      sets:      '3 × 10 + 15 reps',
      muscle:    'TRÍCEPS / SUPERSET FINALIZADOR',
      youtubeId: 'RavQHfFxbdA',
      technique: 'SUPERSET',
      tip:       'SUPERSET: 10 Skull Crushers (excêntrico 3s, cotovelos apontados para cima) → sem descanso → 15 mergulhos no banco com peso corporal. Cabeça longa destruída.',
    },
  ],
};

/* ============================================================
   TREINO B — COSTAS + BÍCEPS
   Técnicas: Drop Set | Superset | Rest-Pause | 21s
   ≈ 75 min
   ============================================================ */
const workoutB = {
  focus:    'COSTAS + BÍCEPS',
  label:    'TREINO B',
  icon:     '🦅',
  duration: '~75 min',
  exercises: [
    {
      name:      'Barra Fixa com Peso (Pull-up)',
      sets:      '5 × 5–8 reps',
      muscle:    'LATÍSSIMO / COMPOUND',
      youtubeId: 'eGo4IYlbE5g',
      technique: null,
      tip:       'Use cinturão com peso extra se fizer 8+ com o corpo. Amplitude total: desce completamente, sobe o peito à barra. O exercício mais eficiente para largura de costas.',
    },
    {
      name:      'Remada Curvada com Barra',
      sets:      '4 × 6–8 reps',
      muscle:    'ESPESSURA / COSTAS MÉDIAS',
      youtubeId: 'VJHBEy2duVc',
      technique: null,
      tip:       'Composto pesado para espessura. Tronco a 45°, costas neutras. Puxe em direção ao umbigo. Comprima escápulas no pico. Progressão de carga semanal obrigatória.',
    },
    {
      name:      'Puxada Frontal ➜ Remada Unilateral',
      sets:      '3 × 10 + 10 cada',
      muscle:    'LATÍSSIMO / SUPERSET',
      youtubeId: '25XTUWnt_R4',
      technique: 'SUPERSET',
      tip:       'SUPERSET: 10 puxadas frontais (projetar peito para cima) → sem descanso → 10 remadas unilaterais cada lado (puxar para o quadril). Volume alto, intensidade máxima.',
    },
    {
      name:      'Pull-down Triângulo — Drop Set',
      sets:      '3 × 10 → 8 → falha',
      muscle:    'LATÍSSIMO INFERIOR / DROP',
      youtubeId: 'BOW9my4J_ek',
      technique: 'DROP SET',
      tip:       'DROP SET com pegada neutra: 10 reps pesado → reduz 25% → 8 reps → reduz 20% → até a FALHA ABSOLUTA. Queimação profunda no latíssimo inferior. Sem misericórdia.',
    },
    {
      name:      'Rosca Direta com Barra — Rest-Pause',
      sets:      '4 × 8–10 + Rest-Pause',
      muscle:    'BÍCEPS / MASSA',
      youtubeId: 'Et1wgGMGW8w',
      technique: 'REST-PAUSE',
      tip:       'REST-PAUSE nos 2 últimos sets: vai à falha → respira 15s → mais 4–6 reps → 15s → mais 2–4 reps. Cotovelos fixos, excêntrico 3 segundos. Volume máximo de bíceps.',
    },
    {
      name:      'Rosca Alternada ➜ Rosca Martelo',
      sets:      '3 × 10 + 12 reps',
      muscle:    'BÍCEPS + BRAQUIAL / SUPERSET',
      youtubeId: 'AuBN9_8Iihc',
      technique: 'SUPERSET',
      tip:       'SUPERSET: 10 roscas alternadas (supinação no topo para pico máximo) → sem descanso → 12 martelos (pegada neutra, espessura). Bíceps e braquial destruídos.',
    },
    {
      name:      'Rosca 21 com Barra',
      sets:      '3 × 21 (7+7+7)',
      muscle:    'BÍCEPS COMPLETO / FINALIZADOR',
      youtubeId: 'Et1wgGMGW8w',
      technique: 'GIANT SET',
      tip:       '21s: 7 reps na metade INFERIOR (fundo até 90°) → 7 reps na metade SUPERIOR (90° até o topo) → 7 reps COMPLETAS. Sem pausa entre fases. Finalização épica de bíceps.',
    },
  ],
};

/* ============================================================
   TREINO C — PERNAS + OMBROS
   Técnicas: Drop Set | Superset Antagonista | Rest-Pause
   ≈ 80 min
   ============================================================ */
const workoutC = {
  focus:    'PERNAS + OMBROS',
  label:    'TREINO C',
  icon:     '🦵',
  duration: '~80 min',
  exercises: [
    {
      name:      'Agachamento Livre com Barra',
      sets:      '5 × 5–6 reps',
      muscle:    'QUADRÍCEPS / GLÚTEOS / REI',
      youtubeId: 'rM6SDUdl9fs',
      technique: null,
      tip:       'Rei dos exercícios. 2 séries de aquecimento + 5 séries pesadas. Abaixo do paralelo. Joelhos na linha dos pés, core rigidamente contraído. Base de toda hipertrofia.',
    },
    {
      name:      'Leg Press 45° — Drop Set',
      sets:      '4 × 12 → 10 → falha',
      muscle:    'QUADRÍCEPS / DROP',
      youtubeId: 'waAxlYvtCcI',
      technique: 'DROP SET',
      tip:       'DROP SET: carregue pesado para 12 reps → retire plaquinhas → 10 reps → retire mais → FALHA ABSOLUTA. Volume de quadríceps em outro nível. Queimação épica.',
    },
    {
      name:      'Cadeira Extensora ➜ Mesa Flexora',
      sets:      '3 × 15 + 15 reps',
      muscle:    'QUAD + ISQUIO / ANTAGONISTA',
      youtubeId: 'Svq2T3L9oKo',
      technique: 'SUPERSET',
      tip:       'SUPERSET ANTAGONISTA: 15 extensoras → sem descanso → 15 mesa flexora. Músculos opostos: enquanto um trabalha, o outro recupera. Volume máximo, tempo mínimo.',
    },
    {
      name:      'Stiff com Barra',
      sets:      '4 × 8–10 reps',
      muscle:    'POSTERIOR / GLÚTEOS',
      youtubeId: '1uDiW5--re4',
      technique: null,
      tip:       'Joelhos levemente flexionados. Sinta o alongamento profundo no posterior. Costas neutras. Excêntrico controlado em 3 segundos. Cadeia posterior blindada.',
    },
    {
      name:      'Panturrilha em Pé — Drop Set',
      sets:      '4 × 20 → 15 → falha',
      muscle:    'PANTURRILHA / DROP',
      youtubeId: 'nQmWQ3shmTw',
      technique: 'DROP SET',
      tip:       'DROP SET: 20 reps pesado (pause 2s no topo, desce abaixo do degrau) → drop 30% → 15 reps → drop → falha. Panturrilha responde a volume alto. Sem moleza.',
    },
    {
      name:      'Desenvolvimento com Barra ➜ Elevação Lateral',
      sets:      '4 × 8 + 15 reps',
      muscle:    'DELTÓIDE FRONTAL + LATERAL / SUPERSET',
      youtubeId: 'eufDL9MmF8A',
      technique: 'SUPERSET',
      tip:       'SUPERSET: 8 desenvolvimentos pesados (compound) → sem descanso → 15 elevações laterais (isolação leve). Deltóide frontal e lateral destruídos. Ombros 3D garantidos.',
    },
    {
      name:      'Face Pull ➜ Encolhimento com Barra',
      sets:      '3 × 15 + 15 reps',
      muscle:    'DELTÓIDE POST + TRAPÉZIO / SUPERSET',
      youtubeId: 'rep-qVOkqgk',
      technique: 'SUPERSET',
      tip:       'SUPERSET finalizador: 15 face pulls (deltóide posterior + manguito) → sem descanso → 15 encolhimentos pesados (trapézio). Postura perfeita e ombros completos.',
    },
  ],
};

/* ── Mapeamento dias → treinos (split ABC repetido) ── */
const workouts = {
  segunda: { ...workoutA, fullName: 'Segunda-feira' },
  terca:   { ...workoutB, fullName: 'Terça-feira'   },
  quarta:  { ...workoutC, fullName: 'Quarta-feira'  },
  quinta:  { ...workoutA, fullName: 'Quinta-feira'  },
  sexta:   { ...workoutB, fullName: 'Sexta-feira'   },
  sabado:  null,
  domingo: null,
};

/* ============================================================
   REFEIÇÕES
   ============================================================ */
const meals = [
  { time: '07h', emoji: '☀️', name: 'Café da Manhã',  kcal: 700,
    items: ['4 ovos mexidos com azeite','2 fatias de pão integral com pasta de amendoim','1 banana grande','1 copo de leite integral (300 ml)'] },
  { time: '10h', emoji: '🥗', name: 'Lanche da Manhã', kcal: 400,
    items: ['1 iogurte grego integral','1 punhado de castanhas (30g)','1 fruta (manga ou maçã)'] },
  { time: '13h', emoji: '🍽️', name: 'Almoço',           kcal: 800,
    items: ['200g de frango grelhado ou carne vermelha magra','4 colheres de arroz branco','1 concha de feijão','Salada à vontade com azeite','1 colher extra de azeite'] },
  { time: '16h', emoji: '🥤', name: 'Pré-Treino',       kcal: 450,
    items: ['Shake: 300 ml leite integral + 2 col. aveia + 1 banana + 1 col. pasta de amendoim','Opcional: 1 dose de whey protein'] },
  { time: '19h', emoji: '💪', name: 'Pós-Treino',       kcal: 500,
    items: ['1 dose de whey protein com leite','2 batatas-doces médias','150g de peito de frango'] },
  { time: '21h', emoji: '🌙', name: 'Jantar',            kcal: 600,
    items: ['Omelete com 4 ovos + queijo + legumes','2 fatias de pão integral','1 copo de leite com achocolatado (não diet)'] },
  { time: '23h', emoji: '😴', name: 'Ceia',              kcal: 300,
    items: ['Iogurte grego com mel e granola','OU 2 colheres de pasta de amendoim com banana'] },
];

/* ============================================================
   HELPERS
   ============================================================ */
function lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
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
    if (c !== container) { const f = c.querySelector('.card-video__iframe'); if (f) f.src = ''; c.classList.remove('playing'); }
  });
  const iframe = container.querySelector('.card-video__iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  container.classList.add('playing');
}

/* ============================================================
   PROGRESSO DE PESO (meta editável)
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
    const w = parseFloat(curInput.value)   || START_WEIGHT;
    const g = parseFloat(goalInput?.value) || lsGet('goalWeight', GOAL_WEIGHT);
    lsSet('currentWeight', w); updateWeightBar(w, g, fill, pct);
  });
  if (goalInput) {
    goalInput.addEventListener('input', () => {
      const w = parseFloat(curInput.value) || lsGet('currentWeight', START_WEIGHT);
      const g = parseFloat(goalInput.value) || GOAL_WEIGHT;
      lsSet('goalWeight', g); updateWeightBar(w, g, fill, pct);
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
  const now = new Date(), jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `week_${now.getFullYear()}_${week}`;
}
function renderWeeklyCounter() {
  const el = document.getElementById('weekly-text');
  if (!el) return;
  el.textContent = `Você treinou ${lsGet(getWeekKey(), []).length}/5 dias esta semana`;
}
function markTodayTrained() {
  const key = getWeekKey(), data = lsGet(key, []), today = new Date().toDateString();
  if (!data.includes(today)) { data.push(today); lsSet(key, data); }
  renderWeeklyCounter();
}
function resetWeek() { lsSet(getWeekKey(), []); renderWeeklyCounter(); }

/* ============================================================
   RENDERIZAR CARDS
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

const TECHNIQUE_META = {
  'SUPERSET':   { label: '⚡ SUPERSET',   cls: 'technique--superset'  },
  'DROP SET':   { label: '📉 DROP SET',   cls: 'technique--dropset'   },
  'REST-PAUSE': { label: '⏸ REST-PAUSE', cls: 'technique--restpause' },
  'GIANT SET':  { label: '🔥 GIANT SET',  cls: 'technique--giantset'  },
};

function buildTechniqueBadge(technique) {
  if (!technique) return '';
  const meta = TECHNIQUE_META[technique] || { label: technique, cls: 'technique--default' };
  return `<span class="technique-badge ${meta.cls}">${meta.label}</span>`;
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
          <strong>Sugestão:</strong> 15 min de alongamento + caminhada leve de 20–30 min.</p>
          <div class="motivational">"O descanso não é fraqueza — é parte do treino. Na segunda você volta mais forte." 💪</div>
        </div>`;
    } else {
      const saved        = lsGet(`exercises_${day}`, {});
      const savedWeights = lsGet(`weights_${day}`, {});

      const cardsHtml = data.exercises.map((ex, i) => {
        const wVal      = savedWeights[i] ?? '';
        const doneClass = saved[i] ? 'done' : '';
        return `
          <div class="exercise-card ${doneClass}" id="card-${day}-${i}" style="--card-color:${color}">
            <div class="card-color-strip" style="background:${color}"></div>
            ${buildVideoHtml(ex.youtubeId, ex.name)}
            <div class="card-body">
              <div class="card-badges">
                <span class="card-muscle" style="background:${color}">${ex.muscle}</span>
                ${buildTechniqueBadge(ex.technique)}
              </div>
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
                    data-day="${day}" data-idx="${i}" ${saved[i] ? 'checked' : ''}/>
                  <label class="card-check-label" for="chk-${day}-${i}">Concluído</label>
                </div>
                <button class="btn-rest-timer" onclick="openRestTimer()">
                  <i class="fa-solid fa-stopwatch"></i> Descanso
                </button>
              </div>
            </div>
          </div>`;
      }).join('');

      const labelBadge = data.label
        ? `<span class="workout-label-badge workout-label--${data.label.split(' ')[1]?.toLowerCase()}">${data.label}</span>`
        : '';
      const durBadge = data.duration
        ? `<span class="duration-badge"><i class="fa-solid fa-clock"></i> ${data.duration}</span>`
        : '';

      panel.innerHTML = `
        <div class="day-panel-header">
          <span class="day-panel-title" style="color:${color}">${data.fullName}</span>
          ${labelBadge}
          <span class="focus-badge" style="border-color:${color};color:${color};background:${color}22">${data.focus}</span>
          ${durBadge}
        </div>
        <div class="exercise-grid">${cardsHtml}</div>`;
    }
    container.appendChild(panel);
  });

  container.addEventListener('change', e => {
    if (e.target.classList.contains('card-checkbox')) {
      const { day, idx } = e.target.dataset;
      const saved = lsGet(`exercises_${day}`, {});
      saved[idx] = e.target.checked;
      lsSet(`exercises_${day}`, saved);
      document.getElementById(`card-${day}-${idx}`)?.classList.toggle('done', e.target.checked);
      // Haptic + workout clock
      if (e.target.checked) {
        if (typeof hapticFeedback === 'function') hapticFeedback([40, 20, 40]);
        if (typeof startWorkoutClock === 'function') startWorkoutClock();
      }
      checkDayComplete(day);
      updateProgressBar(day);
      if (e.target.checked) markTodayTrained();
    }
  });

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
  const data = workouts[day]; if (!data) return;
  const saved = lsGet(`exercises_${day}`, {});
  const done  = Object.values(saved).filter(Boolean).length;
  const total = data.exercises.length;
  const complete = done >= total && total > 0;
  document.getElementById('completion-banner')?.classList.toggle('show', complete);
  if (complete) {
    // Prepare share data
    window._currentWorkoutShare = {
      label:      data.label || '',
      focus:      data.focus || '',
      doneCount:  done,
      totalCount: total,
      duration:   typeof getWorkoutElapsed === 'function' ? getWorkoutElapsed() : '',
    };
    if (typeof launchConfetti === 'function') launchConfetti(50);
    if (typeof hapticFeedback === 'function') hapticFeedback([50, 50, 200]);
  }
}

function updateProgressBar(day) {
  const data = workouts[day];
  const wrap = document.getElementById('workout-progress');
  if (!data || !wrap) return;
  const saved = lsGet(`exercises_${day}`, {});
  const done  = Object.values(saved).filter(Boolean).length;
  const total = data.exercises.length;
  const pct   = total > 0 ? Math.round(done / total * 100) : 0;
  wrap.style.display = total > 0 ? 'flex' : 'none';
  const fill = document.getElementById('workout-progress-fill');
  const text = document.getElementById('workout-progress-text');
  const pctEl= document.getElementById('workout-progress-pct');
  if (fill)  fill.style.width = pct + '%';
  if (text)  text.textContent  = `${done} / ${total} exercícios`;
  if (pctEl) pctEl.textContent = pct + '%';
}

function animateCards(day) {
  const panel = document.getElementById(`panel-${day}`);
  if (!panel) return;
  panel.querySelectorAll('.exercise-card, .rest-card').forEach((card, i) => {
    card.classList.remove('animate-in');
    setTimeout(() => card.classList.add('animate-in'), i * 80);
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
      btns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
      document.querySelectorAll('.day-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(`panel-${day}`);
      if (panel) { panel.classList.add('active'); animateCards(day); }
      const banner = document.getElementById('completion-banner');
      if (banner) { banner.classList.remove('show'); checkDayComplete(day); updateProgressBar(day); }
      document.querySelectorAll('.card-video.playing').forEach(c => {
        const f = c.querySelector('.card-video__iframe'); if (f) f.src = ''; c.classList.remove('playing');
      });
    });
  });
}

function resetDay() {
  const activeBtn = document.querySelector('.day-btn.active'); if (!activeBtn) return;
  const day = activeBtn.dataset.day;
  lsSet(`exercises_${day}`, {});
  const panel = document.getElementById(`panel-${day}`);
  if (panel) {
    panel.querySelectorAll('.card-checkbox').forEach(cb => cb.checked = false);
    panel.querySelectorAll('.exercise-card').forEach(c => c.classList.remove('done'));
  }
  document.getElementById('completion-banner')?.classList.remove('show');
}

/* ============================================================
   DIETA
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
    lsSet('currentWeight', w);
    updateWeightBar(w, lsGet('goalWeight', GOAL_WEIGHT), fill, pct);
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
      <div class="macro-bar"><div class="macro-bar-fill" style="width:0%;background:${m.color}" data-target="${m.bar}"></div></div>
    </div>`).join('');
  setTimeout(() => {
    container.querySelectorAll('.macro-bar-fill').forEach(b => b.style.width = b.dataset.target + '%');
  }, 200);
}

function renderMeals() {
  const container = document.getElementById('meals-container');
  if (!container) return;
  const saved = lsGet('meals_checked', {});
  container.innerHTML = meals.map((meal, i) => `
    <div class="meal-card ${saved[i] ? 'done' : ''}" id="meal-card-${i}">
      <div class="meal-header" onclick="toggleMealItems(${i})">
        <span class="meal-time">${meal.time}</span>
        <span class="meal-emoji">${meal.emoji}</span>
        <span class="meal-name">${meal.name}</span>
        <span class="meal-kcal">${meal.kcal} kcal</span>
        <input type="checkbox" class="meal-check" id="mcheck-${i}" data-idx="${i}" data-kcal="${meal.kcal}"
          ${saved[i] ? 'checked' : ''} onclick="event.stopPropagation()" />
      </div>
      <div class="meal-items ${saved[i] ? 'show' : ''}" id="meal-items-${i}">
        ${meal.items.map(it => `<div class="meal-item">${it}</div>`).join('')}
      </div>
    </div>`).join('');
  container.querySelectorAll('.meal-card').forEach((c, i) => setTimeout(() => c.classList.add('animate-in'), i * 70));
  updateKcalCounter();
  container.addEventListener('change', e => {
    if (!e.target.classList.contains('meal-check')) return;
    const idx = parseInt(e.target.dataset.idx), sv = lsGet('meals_checked', {});
    sv[idx] = e.target.checked; lsSet('meals_checked', sv);
    document.getElementById(`meal-card-${idx}`)?.classList.toggle('done', e.target.checked);
    updateKcalCounter();
  });
}

function updateKcalCounter() {
  const el = document.getElementById('kcal-done'); if (!el) return;
  const sv = lsGet('meals_checked', {}); let total = 0;
  meals.forEach((m, i) => { if (sv[i]) total += m.kcal; });
  el.innerHTML = `<strong>${total.toLocaleString('pt-BR')}</strong> <span>/ ${TOTAL_KCAL.toLocaleString('pt-BR')} kcal consumidas hoje</span>`;
}

function resetMeals() {
  lsSet('meals_checked', {});
  document.querySelectorAll('.meal-check').forEach(cb => cb.checked = false);
  document.querySelectorAll('.meal-card').forEach(c => c.classList.remove('done'));
  updateKcalCounter();
}

function toggleMealItems(i) {
  const el = document.getElementById(`meal-items-${i}`);
  if (el) el.classList.toggle('show');
}

function renderTips() {
  const container = document.getElementById('tips-container'); if (!container) return;
  const tips = [
    { icon: '🔔', title: 'Coma de 3 em 3 horas',            text: 'Configure alarme no celular. Consistência é chave para hard gainers.' },
    { icon: '🥜', title: 'Prefira alimentos calóricos',      text: 'Amendoim, banana, arroz, ovos, queijo — densos em calorias e nutrientes.' },
    { icon: '🫒', title: 'Enriqueça as refeições',           text: 'Adicione azeite, pasta de amendoim e leite integral a tudo que puder.' },
    { icon: '💧', title: 'Não beba água antes das refeições', text: 'Evita saciedade precoce. Beba após ou 30 min antes das principais.' },
    { icon: '🥤', title: 'Use hipercalórico estratégico',    text: 'Nos dias em que não conseguir bater as calorias apenas pela comida.' },
    { icon: '😴', title: 'Durma 7–9 horas',                  text: 'O músculo cresce no descanso, não na academia. Sono é anabolismo grátis.' },
  ];
  container.innerHTML = tips.map(t => `
    <div class="tip-card">
      <strong>${t.icon} ${t.title}</strong>
      <p>${t.text}</p>
    </div>`).join('');
  container.querySelectorAll('.tip-card').forEach((c, i) => setTimeout(() => c.classList.add('animate-in'), i * 80));
}

function renderSupplements() {
  const container = document.getElementById('supplements-container'); if (!container) return;
  const supps = [
    { name: 'Whey Protein',        dose: '1–2 doses/dia',       reason: 'Fechar meta de proteína de forma prática e rápida.' },
    { name: 'Creatina',            dose: '3–5g/dia',             reason: 'Aumenta força, volume muscular e recuperação.' },
    { name: 'Hipercalórico',       dose: 'Conforme necessidade', reason: 'Para dias com pouca fome — difícil bater 3.500 kcal.' },
    { name: 'Vitamina D3 + Zinco', dose: 'Conforme rótulo',      reason: 'Suporte hormonal e imunidade — essencial no inverno.' },
  ];
  container.innerHTML = supps.map(s => `
    <div class="supplement-card">
      <div class="supplement-icon">💊</div>
      <div class="supplement-info">
        <strong>${s.name}</strong>
        <span>${s.dose} — ${s.reason}</span>
      </div>
    </div>`).join('');
  container.querySelectorAll('.supplement-card').forEach((c, i) => setTimeout(() => c.classList.add('animate-in'), i * 80));
}

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
    renderPanels(); initDaySelector(); initWeightProgress(); renderWeeklyCounter();
    checkDayComplete('segunda'); updateProgressBar('segunda');
  }
  if (document.getElementById('meals-container')) {
    renderMacros(); renderMeals(); renderTips(); renderSupplements(); initWeightDiet(); initScrollAnimations();
  }
});

window.playVideo       = playVideo;
window.resetDay        = resetDay;
window.resetWeek       = resetWeek;
window.resetMeals      = resetMeals;
window.toggleMealItems = toggleMealItems;
