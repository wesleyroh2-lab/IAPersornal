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

/* ── Salvar sessão ── */
function saveSession(username) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify({
    user:   username,
    expiry: Date.now() + SESSION_MINS * 60 * 1000,
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
  }
}

/* ── Lógica da página de login ── */
async function initLogin() {
  const form     = document.getElementById('login-form');
  const userInput = document.getElementById('login-user');
  const passInput = document.getElementById('login-pass');
  const errorEl  = document.getElementById('login-error');
  const btnText  = document.getElementById('btn-text');
  const spinner  = document.getElementById('btn-spinner');

  // Se já está logado, vai direto para a home
  if (isLoggedIn()) {
    window.location.replace('index.html');
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

      // Comparar com os hashes armazenados
      const match = data.users.some(
        u => u.username_hash === userHash && u.password_hash === passHash
      );

      if (match) {
        saveSession(user);
        // Animação de sucesso antes de redirecionar
        form.classList.add('success');
        btnText.textContent = '✓ Entrando...';
        setTimeout(() => window.location.replace('index.html'), 800);
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

      // Focar no campo usuário
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

/* ── Adicionar botão de logout na navbar das páginas protegidas ── */
function injectLogoutBtn() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;
  const btn = document.createElement('button');
  btn.className   = 'btn-logout';
  btn.textContent = 'Sair';
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
