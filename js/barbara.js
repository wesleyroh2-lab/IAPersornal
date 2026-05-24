/* ============================================================
   IAPersornal — barbara.js   Treino Emagrecimento Barbara | Seg–Sáb | Com peso por exercício
   ============================================================ */

const START_WEIGHT_B = 65;
const GOAL_WEIGHT_B  = 55;

const DAY_COLORS_B = {
  segunda:'#8B5CF6', terca:'#EC4899', quarta:'#06D6A0',
  quinta:'#3B82F6',  sexta:'#EC4899', sabado:'#F59E0B', domingo: null,
};

const workoutsB = {
  segunda: {
    fullName:'Segunda-feira', focus:'HIIT FULL BODY', duration:'~45 min',
    exercises:[
      {name:'Agachamento com Salto',    sets:'3 × 15 reps',          muscle:'PERNAS / GLÚTEOS', youtubeId:'gnz5OFSO2IU', tip:'Desça em agachamento e suba explosiva com salto. Aterrisse suavemente. Queima muitas calorias e define os glúteos.'},
      {name:'Burpee Modificado',        sets:'3 × 10 reps',          muscle:'CORPO INTEIRO',    youtubeId:'HnRIzMKs-uM', tip:'Sem o salto no início. Deça, estique as pernas, volte e levante. Ideal para iniciantes. Intensidade alta.'},
      {name:'Mountain Climbers',        sets:'3 × 30 segundos',      muscle:'CORE / CARDIO',    youtubeId:'DTVVwQs-zoM', tip:'Posição de prancha, alterne os joelhos em direção ao peito rapidamente. Core contraído o tempo todo.'},
      {name:'High Knees (Joelho Alto)', sets:'3 × 30 segundos',      muscle:'CARDIO / PERNAS',  youtubeId:'uWXxhzpMIqg', tip:'Corra no lugar elevando os joelhos até a altura do quadril. Braços em movimento. Ritmo acelerado.'},
      {name:'Prancha',                  sets:'3 × 40 segundos',      muscle:'CORE',             youtubeId:'Yu0wjtD5FkU', tip:'Corpo reto como uma tábua. Abdômen e glúteos contraídos. Não deixe o quadril cair. Respire normalmente.'},
    ],
  },
  terca: {
    fullName:'Terça-feira', focus:'GLÚTEOS + COXAS', duration:'~50 min',
    exercises:[
      {name:'Hip Thrust (Elevação Pélvica)', sets:'4 × 15 reps',        muscle:'GLÚTEOS',            youtubeId:'5KYtuo5Y-sg', tip:'Apoie os ombros no banco. Empurre o quadril para cima contraindo os glúteos no topo. Segure 1 segundo.'},
      {name:'Agachamento Sumô',              sets:'4 × 15 reps',        muscle:'COXAS / GLÚTEOS',    youtubeId:'SozaXNWVZxA', tip:'Pés mais abertos que os ombros, bicos virados para fora. Trabalha mais a coxa interna e os glúteos.'},
      {name:'Stiff com Halteres',            sets:'3 × 12 reps',        muscle:'POSTERIOR / GLÚTEOS',youtubeId:'po5ihi0-5rk', tip:'Joelhos levemente dobrados, desça os halteres sentindo o posterior alongar. Costas retas.'},
      {name:'Afundo (Lunge)',                sets:'3 × 12 cada perna',  muscle:'PERNAS / GLÚTEOS',   youtubeId:'tIp498vBIAM', tip:'Passo largo à frente, desça o joelho traseiro em direção ao chão. Joelho dianteiro não ultrapassa o pé.'},
      {name:'Cadeira Abdutora',              sets:'3 × 15 reps',        muscle:'ABDUTORES / GLÚTEOS',youtubeId:'E5r5OmVfxpU', tip:'Abra as pernas contraindo os glúteos laterais. Volte devagar. Não use peso excessivo no começo.'},
    ],
  },
  quarta: {
    fullName:'Quarta-feira', focus:'CORE + CARDIO', duration:'~40 min',
    exercises:[
      {name:'Abdominal Bicicleta', sets:'3 × 20 reps',     muscle:'ABDÔMEN / OBLÍQUOS', youtubeId:'apmprS8H1MY', tip:'Alterne cotovelo com joelho oposto. Movimento lento e controlado. Não puxe o pescoço.'},
      {name:'Prancha',             sets:'3 × 45 segundos',  muscle:'CORE COMPLETO',      youtubeId:'Yu0wjtD5FkU', tip:'Posição firme, corpo reto. Abdômen fortemente contraído. Pense em empurrar o umbigo para a espinha.'},
      {name:'Abdominal Crunch',    sets:'3 × 20 reps',     muscle:'ABDÔMEN',            youtubeId:'c4yjTN9uKRY', tip:'Enrole o tronco superior — não levante inteiro. Expire ao subir. Controle a descida.'},
      {name:'Mountain Climbers',   sets:'3 × 30 segundos', muscle:'CORE / CARDIO',      youtubeId:'DTVVwQs-zoM', tip:'Mantenha o core estável enquanto alterna as pernas rapidamente.'},
      {name:'High Knees',          sets:'3 × 30 segundos', muscle:'CARDIO',             youtubeId:'uWXxhzpMIqg', tip:'Sprint no lugar elevando os joelhos. Braços ativos. Mantenha o ritmo.'},
    ],
  },
  quinta: {
    fullName:'Quinta-feira', focus:'PARTE SUPERIOR', duration:'~50 min',
    exercises:[
      {name:'Flexão de Braços (Joelho)', sets:'3 × 12 reps', muscle:'PEITO / TRÍCEPS', youtubeId:'EpmypyjPqdo', tip:'Com joelho no chão para adaptação. Corpo alinhado da cabeça ao joelho. Desça controlado, suba firme.'},
      {name:'Remada com Halter',         sets:'3 × 12 reps', muscle:'COSTAS',          youtubeId:'SUvZiVClLKw', tip:'Apoie o joelho e a mão no banco. Puxe o halter em direção ao quadril. Sinta as costas trabalhando.'},
      {name:'Elevação Lateral',          sets:'3 × 12 reps', muscle:'OMBROS',          youtubeId:'jannLx4RxKo', tip:'Halteres leves. Levante os braços lateralmente até a altura dos ombros. Controle a descida em 2 seg.'},
      {name:'Rosca com Halter',          sets:'3 × 12 reps', muscle:'BÍCEPS',          youtubeId:'AuBN9_8Iihc', tip:'Alterne os braços. Cotovelos fixos. Suba girando o pulso para cima para máxima contração.'},
      {name:'Tríceps no Banco',          sets:'3 × 15 reps', muscle:'TRÍCEPS',         youtubeId:'jH9RXQjbXqs', tip:'Apoie as mãos no banco atrás do corpo. Dobre os cotovelos e desça o quadril. Empurre de volta.'},
    ],
  },
  sexta: {
    fullName:'Sexta-feira', focus:'GLÚTEOS + HIIT', duration:'~50 min',
    exercises:[
      {name:'Hip Thrust com Halter',      sets:'4 × 15 reps',        muscle:'GLÚTEOS',                  youtubeId:'5KYtuo5Y-sg', tip:'Versão com halter apoiado no quadril. Progressão do hip thrust básico. Glúteo contrai fortemente no topo.'},
      {name:'Afundo Reverso',             sets:'3 × 12 cada perna',  muscle:'GLÚTEOS / COXAS',          youtubeId:'FM2Butrvejo', tip:'Passo para trás (mais seguro que afundo frontal). Menos estresse no joelho. Foco total no glúteo.'},
      {name:'Agachamento Sumô com Salto', sets:'3 × 12 reps',        muscle:'COXAS / GLÚTEOS / CARDIO', youtubeId:'gnz5OFSO2IU', tip:'Posição sumô, agache e salte explosivamente. Aterrisse suave. Intenso para queimar gordura.'},
      {name:'Cadeira Abdutora',           sets:'3 × 20 reps',        muscle:'ABDUTORES',                youtubeId:'E5r5OmVfxpU', tip:'Use peso moderado e foque na qualidade da contração, não na velocidade.'},
      {name:'Burpee',                     sets:'3 × 10 reps',        muscle:'CORPO INTEIRO',            youtubeId:'CrGAnJEfcmY', tip:'Finalize o treino com tudo! Explosivo e completo. Recupere 60 seg entre as séries. Você consegue!'},
    ],
  },
  sabado: {
    fullName:'Sábado', focus:'CARDIO + CORE LEVE', duration:'~40 min',
    exercises:[
      {name:'Polichinelo',        sets:'3 × 40 segundos',      muscle:'CARDIO / CORPO INTEIRO', youtubeId:'LtvN9aEJG4I', tip:'Salte abrindo pernas e braços simultaneamente. Ritmo confortável mas constante.'},
      {name:'High Knees',         sets:'3 × 30 segundos',      muscle:'CARDIO',                 youtubeId:'uWXxhzpMIqg', tip:'Aqueça o corpo progressivamente. Ritmo moderado hoje — é dia de cardio leve.'},
      {name:'Prancha Lateral',    sets:'3 × 30 seg cada lado', muscle:'OBLÍQUOS / CORE',        youtubeId:'thZZtS9gapk', tip:'Apoio no cotovelo e pé lateral. Quadril elevado, corpo reto. Trabalha os oblíquos intensamente.'},
      {name:'Russian Twist',      sets:'3 × 20 reps',          muscle:'OBLÍQUOS',               youtubeId:'rma5HDT6TiQ', tip:'Sentada com pés no ar, gire o tronco de lado a lado. Quanto maior o ângulo do tronco, mais intenso.'},
      {name:'Abdominal Bicicleta',sets:'3 × 20 reps',          muscle:'ABDÔMEN / OBLÍQUOS',     youtubeId:'apmprS8H1MY', tip:'Finalize com bicicleta controlada. Movimento lento e com foco. Feche a semana forte, Barbara! 💜'},
    ],
  },
  domingo: null,
};

/* ── Helpers ── */
function lsGet(k,d=null){try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):d;}catch{return d;}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

/* ── Player ── */
function playVideo(container, videoId) {
  if (!videoId) return;
  document.querySelectorAll('.card-video.playing').forEach(c => {
    if (c!==container){const f=c.querySelector('.card-video__iframe');if(f)f.src='';c.classList.remove('playing');}
  });
  container.querySelector('.card-video__iframe').src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  container.classList.add('playing');
}

/* ── Progresso de peso com meta editável ── */
function initWeightProgressB() {
  const curInput  = document.getElementById('current-weight');
  const goalInput = document.getElementById('goal-weight');
  const fill      = document.getElementById('weight-fill');
  const pct       = document.getElementById('weight-percent');
  if (!curInput) return;
  // Salva peso inicial na primeira visita para calcular progresso correto
  if (!lsGet('initialWeightB')) lsSet('initialWeightB', lsGet('currentWeightB', START_WEIGHT_B));
  const savedCur  = lsGet('currentWeightB', START_WEIGHT_B);
  const savedGoal = lsGet('goalWeightB', GOAL_WEIGHT_B);
  curInput.value  = savedCur;
  if (goalInput) goalInput.value = savedGoal;
  updateWeightBarB(savedCur, savedGoal, fill, pct);
  curInput.addEventListener('input', () => {
    const w = parseFloat(curInput.value) || START_WEIGHT_B;
    const g = parseFloat(goalInput?.value) || lsGet('goalWeightB', GOAL_WEIGHT_B);
    lsSet('currentWeightB', w); updateWeightBarB(w, g, fill, pct);
  });
  if (goalInput) {
    goalInput.addEventListener('input', () => {
      const w = parseFloat(curInput.value) || lsGet('currentWeightB', START_WEIGHT_B);
      const g = parseFloat(goalInput.value) || GOAL_WEIGHT_B;
      lsSet('goalWeightB', g); updateWeightBarB(w, g, fill, pct);
    });
  }
}

function updateWeightBarB(current, goal, fill, pctEl) {
  const initial = lsGet('initialWeightB', START_WEIGHT_B);
  const range   = initial - goal;
  const done    = Math.max(0, Math.min(initial - current, range));
  const percent = range > 0 ? Math.round((done / range) * 100) : 0;
  if (fill)  fill.style.width = Math.max(0, Math.min(100, percent)) + '%';
  if (pctEl) pctEl.textContent = `${percent}% concluído  •  ${current} kg → ${goal} kg`;
}

/* ── Contador semanal ── */
function getWeekKey() {
  const now=new Date(), jan1=new Date(now.getFullYear(),0,1);
  return `week_barbara_${now.getFullYear()}_${Math.ceil(((now-jan1)/86400000+jan1.getDay()+1)/7)}`;
}
function renderWeeklyCounter() {
  const el=document.getElementById('weekly-text');
  if(el) el.textContent=`Você treinou ${lsGet(getWeekKey(),[]).length}/6 dias esta semana`;
}
function markTodayTrained() {
  const key=getWeekKey(), data=lsGet(key,[]), today=new Date().toDateString();
  if(!data.includes(today)){data.push(today);lsSet(key,data);}
  renderWeeklyCounter();
}
function resetWeek(){lsSet(getWeekKey(),[]);renderWeeklyCounter();}

/* ── Build vídeo ── */
function buildVideoHtml(youtubeId, name) {
  return `<div class="card-video" onclick="playVideo(this,'${youtubeId}')">
    <img class="card-video__thumb" src="https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg" alt="${name}" loading="lazy" onerror="this.parentElement.classList.add('thumb-error')"/>
    <div class="card-video__overlay">
      <div class="card-video__play-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div>
      <span class="card-video__label">Ver execução</span>
    </div>
    <iframe class="card-video__iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>
  </div>`;
}

/* ── Render panels ── */
function renderPanels() {
  const container = document.getElementById('panels');
  if (!container) return;
  Object.keys(workoutsB).forEach(day => {
    const data = workoutsB[day], color = DAY_COLORS_B[day] || '#555577';
    const panel = document.createElement('div');
    panel.className = 'day-panel'; panel.id = `panel-${day}`;
    if (day === 'segunda') panel.classList.add('active');
    if (!data) {
      panel.innerHTML = `<div class="rest-card">
        <div class="rest-icon">🧘‍♀️</div><h2>DESCANSO ATIVO</h2>
        <p>Seu corpo precisa desse tempo para recuperar e evoluir.<br/><strong>Sugestão:</strong> caminhada leve de 30 min ou alongamento completo.</p>
        <div class="motivational">"Cada treino é um passo a mais. Descanse hoje para arrasar amanhã." 💜</div>
      </div>`;
    } else {
      const saved = lsGet(`exercises_barbara_${day}`, {}), savedW = lsGet(`weights_barbara_${day}`, {});
      const cardsHtml = data.exercises.map((ex, i) => `
        <div class="exercise-card ${saved[i]?'done':''}" id="card-${day}-${i}" style="--card-color:${color}">
          <div class="card-color-strip" style="background:${color}"></div>
          ${buildVideoHtml(ex.youtubeId, ex.name)}
          <div class="card-body">
            <span class="card-muscle" style="background:${color}">${ex.muscle}</span>
            <div class="card-name">${ex.name}</div>
            <div class="card-sets">${ex.sets}</div>
            <div class="card-tip">${ex.tip}</div>
            <div class="card-weight-row">
              <i class="fa-solid fa-dumbbell"></i>
              <input type="number" class="card-weight-input" id="w-${day}-${i}"
                data-day="${day}" data-idx="${i}" placeholder="Peso" min="0" step="2.5" value="${savedW[i]??''}"/>
              <span class="cwl">kg</span>
            </div>
            <div class="card-actions">
              <div class="card-check-area">
                <input type="checkbox" class="card-checkbox" id="chk-${day}-${i}"
                  data-day="${day}" data-idx="${i}" ${saved[i]?'checked':''}/>
                <label class="card-check-label" for="chk-${day}-${i}">Concluído</label>
              </div>
              <button class="btn-rest-timer" onclick="openRestTimer()">
                <i class="fa-solid fa-stopwatch"></i> Descanso
              </button>
            </div>
          </div>
        </div>`).join('');
      const dur = data.duration ? `<span class="duration-badge"><i class="fa-solid fa-clock"></i> ${data.duration}</span>` : '';
      panel.innerHTML = `
        <div class="day-panel-header">
          <span class="day-panel-title" style="color:${color}">${data.fullName}</span>
          <span class="focus-badge" style="border-color:${color};color:${color};background:${color}22">${data.focus}</span>
          ${dur}
        </div>
        <div class="exercise-grid">${cardsHtml}</div>`;
    }
    container.appendChild(panel);
  });
  container.addEventListener('change', e => {
    if (e.target.classList.contains('card-checkbox')) {
      const {day, idx} = e.target.dataset;
      const saved = lsGet(`exercises_barbara_${day}`, {});
      saved[idx] = e.target.checked; lsSet(`exercises_barbara_${day}`, saved);
      document.getElementById(`card-${day}-${idx}`)?.classList.toggle('done', e.target.checked);
      checkDayComplete(day); if (e.target.checked) markTodayTrained();
    }
  });
  container.addEventListener('input', e => {
    if (!e.target.classList.contains('card-weight-input')) return;
    const {day,idx}=e.target.dataset, wts=lsGet(`weights_barbara_${day}`,{});
    wts[idx]=e.target.value!==''?parseFloat(e.target.value):null;
    lsSet(`weights_barbara_${day}`,wts);
  });
  animateCards('segunda');
}

function checkDayComplete(day) {
  const data=workoutsB[day]; if(!data)return;
  const done=Object.values(lsGet(`exercises_barbara_${day}`,{})).filter(Boolean).length;
  document.getElementById('completion-banner')?.classList.toggle('show', done>=data.exercises.length&&data.exercises.length>0);
}
function animateCards(day) {
  document.getElementById(`panel-${day}`)?.querySelectorAll('.exercise-card,.rest-card').forEach((c,i)=>{
    c.classList.remove('animate-in'); setTimeout(()=>c.classList.add('animate-in'),i*90);
  });
}
function initDaySelector() {
  const btns=document.querySelectorAll('.day-btn');
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    const day=btn.dataset.day;
    btns.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    document.querySelectorAll('.day-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById(`panel-${day}`)?.classList.add('active');
    animateCards(day);
    const banner=document.getElementById('completion-banner');
    if(banner){banner.classList.remove('show');checkDayComplete(day);}
    document.querySelectorAll('.card-video.playing').forEach(c=>{
      const f=c.querySelector('.card-video__iframe');if(f)f.src='';c.classList.remove('playing');
    });
  }));
}
function resetDay() {
  const btn=document.querySelector('.day-btn.active'); if(!btn)return;
  const day=btn.dataset.day; lsSet(`exercises_barbara_${day}`,{});
  const panel=document.getElementById(`panel-${day}`);
  panel?.querySelectorAll('.card-checkbox').forEach(cb=>cb.checked=false);
  panel?.querySelectorAll('.exercise-card').forEach(c=>c.classList.remove('done'));
  document.getElementById('completion-banner')?.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('panels')){
    renderPanels(); initDaySelector(); initWeightProgressB(); renderWeeklyCounter(); checkDayComplete('segunda');
  }
});
window.playVideo=playVideo; window.resetDay=resetDay; window.resetWeek=resetWeek;
