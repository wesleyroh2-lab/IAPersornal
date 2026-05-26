/**
 * firebase-config.js — IAPersornal Chat
 *
 * Para ativar o chat em tempo real:
 * 1. Acesse https://console.firebase.google.com
 * 2. Crie um projeto > Realtime Database > Criar banco de dados
 * 3. Regras de segurança: modo de teste (temporário) ou configure regras abaixo
 * 4. Clique em "Configurações do projeto" > "Seus apps" > "Web app" > Copie a config
 * 5. Substitua os valores DEMO abaixo pelos seus
 *
 * REGRAS RECOMENDADAS (Firebase Realtime Database):
 * {
 *   "rules": {
 *     "chat": {
 *       ".read": "auth != null",
 *       ".write": "auth != null"
 *     },
 *     "presence": {
 *       ".read": true,
 *       ".write": true
 *     }
 *   }
 * }
 */

// ─── Configuração ─────────────────────────────────────────────────────────────
// Troque DEMO_MODE para false e preencha com suas chaves reais para ativar Firebase.

window.FIREBASE_CONFIG = {
  DEMO_MODE: true,          // true = apenas localStorage (sem backend)

  // Preencha abaixo com seus dados do Firebase Console:
  apiKey:            "COLE_SUA_API_KEY_AQUI",
  authDomain:        "COLE_SEU_AUTH_DOMAIN.firebaseapp.com",
  databaseURL:       "https://COLE_SEU_DATABASE.firebaseio.com",
  projectId:         "COLE_SEU_PROJECT_ID",
  storageBucket:     "COLE_SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "COLE_SEU_SENDER_ID",
  appId:             "COLE_SEU_APP_ID"
};
