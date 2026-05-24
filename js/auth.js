/* ============================================================
   IAPersornal — auth.js
   Autenticação client-side com SHA-256 (Web Crypto API)
   Credenciais armazenadas em data/credentials.json como hashes.
   ============================================================ */

const AUTH_KEY     = 'iapersornal_auth';
const SESSION_MINS = 480; // 8 horas

/* ── Utilitário: SHA-256 via Web Crypto API ── */
async function sha256(message) {
  const msgBuffer  = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ── Verificar se sessão está ativa ── */
function isLoggedIn() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const { expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      sessionStorage.removeItem(AUTH_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/* ── Retornar dados do usuário logado ── */
function getSessionUser() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiry) return null;
    return data.userData || null;
  } catch {
    return null;
  }
}

/* ── Salvar sessão com dados completos do usuário ── */
function saveSession(userData) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify({
    user:     userData.id,
    userData: userData,
    expiry:   Date.now() + SESSION_MINS * 60 * 1000,
  }));
}

/* ── Destruir sessão (logout) ── */
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

/* ── Proteger página: redireciona para login se não autenticado ── */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.replace('login.html');
    return;
  }
  // Aplicar tema do usuário no body
  const user = getSessionUser();
  if (user) {
    document.body.dataset.user = user.id;
  }
}

/* ── Lógica da página de login ── */
async function initLogin() {
  const form      = document.getElementById('login-form');
  const userInput = document.getElementById('login-user');
  const passInput = document.getElementById('login-pass');
  const errorEl   = document.getElementById('login-error');
  const btnText   = document.getElementById('btn-text');
  const spinner   = document.getElementById('btn-spinner');

  // Se já está logado, redireciona para a página do usuário
  if (isLoggedIn()) {
    const user = getSessionUser();
    window.location.replace(user?.redirect || 'index.html');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    errorEl.classList.remove('show');

    // Loading state
    btnText.textContent = 'Verificando...';
    spinner.style.display = 'inline-block';
    form.querySelector('button[type="submit"]').disabled = true;

    const user = userInput.value.trim().toLowerCase();
    const pass = passInput.value;

    try {
      // Buscar credenciais do arquivo JSON
      const res  = await fetch('data/credentials.json');
      const data = await res.json();

      // Gerar hashes do que foi digitado
      const userHash = await sha256(user);
      const passHash = await sha256(pass);

      // Encontrar usuário correspondente
      const matched = data.users.find(
        u => u.username_hash === userHash && u.password_hash === passHash
      );

      if (matched) {
        saveSession(matched);
        form.classList.add('success');
        btnText.textContent = `✓ Olá, ${matched.displayName}!`;
        // Redireciona para a página específica do usuário
        setTimeout(() => window.location.replace(matched.redirect || 'index.html'), 900);
      } else {
        throw new Error('Usuário ou senha incorretos.');
      }
    } catch (err) {
      const msg = err.message === 'Usuário ou senha incorretos.'
        ? err.message
        : 'Erro ao verificar credenciais. Tente novamente.';
      errorEl.textContent = msg;
      errorEl.classList.add('show');

      // Shake no formulário
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);

      // Reset botão
      btnText.textContent = 'Entrar';
      spinner.style.display = 'none';
      form.querySelector('button[type="submit"]').disabled = false;

      userInput.focus();
    }
  });

  // Mostrar/ocultar senha
  const togglePass = document.getElementById('toggle-pass');
  if (togglePass) {
    togglePass.addEventListener('click', () => {
      const isText = passInput.type === 'text';
      passInput.type = isText ? 'password' : 'text';
      togglePass.textContent = isText ? '👁️' : '🙈';
    });
  }
}

/* ── Adicionar saudação e botão de logout na navbar ── */
function injectLogoutBtn() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const user = getSessionUser();

  // Saudação com nome do usuário
  if (user?.displayName) {
    const greeting = document.createElement('span');
    greeting.className = 'nav-user-greeting';
    greeting.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${user.displayName}`;
    nav.appendChild(greeting);
  }

  // Botão logout
  const btn = document.createElement('button');
  btn.className   = 'btn-logout';
  btn.innerHTML   = '<i class="fa-solid fa-arrow-right-from-bracket"></i> Sair';
  btn.onclick     = logout;
  nav.appendChild(btn);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('login-form')) {
    initLogin();
  } else {
    requireAuth();
    injectLogoutBtn();
  }
});
