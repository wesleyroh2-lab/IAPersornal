# 🏋️ IAPersornal — Personal Trainer com IA

Site estático de plano de treino + dieta personalizado por inteligência artificial, hospedado gratuitamente no **GitHub Pages**.

---

## 🌐 Acesso

**🔗 Site ao vivo:** [https://wesleyroh2-lab.github.io/IAPersornal/](https://wesleyroh2-lab.github.io/IAPersornal/)

> **Para ativar o GitHub Pages:**
> 1. Vá em **Settings → Pages**
> 2. Source: `Deploy from a branch` → branch **`main`** → pasta **`/ (root)`**
> 3. Clique **Save** e aguarde ~1 minuto

> Para ativar, vá em **Settings → Pages → Source → branch: `main`, pasta: `/ (root)`** e salve.

---

## 📋 Perfil

| Campo         | Valor                      |
|---------------|----------------------------|
| Idade         | 29 anos                    |
| Peso atual    | 55 kg                      |
| Meta          | 65 kg+                     |
| Prazo         | Março de 2027              |
| Foco          | Peito + todos os grupos    |
| Tipo          | Hard Gainer                |
| Objetivo      | Hipertrofia muscular       |

---

## 📁 Estrutura de Arquivos

```
IAPersornal/
├── index.html      ← Plano de Treino (página principal)
├── dieta.html      ← Plano Nutricional
├── css/
│   └── style.css   ← Estilos dark mode esportivo
├── js/
│   └── main.js     ← Toda a lógica e dados
└── README.md
```

---

## ✨ Funcionalidades

### Página de Treino (`index.html`)
- 📅 **Seletor de dias** — Segunda a Domingo com animação de troca
- 💪 **6 dias de treino** completos (Peito, Costas, Pernas, Ombros, Braços, Peito+Core)
- 🧘 **Domingo** com card de descanso ativo e mensagem motivacional
- ✅ **Checklist** de exercícios com `localStorage` (persiste ao fechar o browser)
- 🏆 **Banner de conclusão** ao marcar todos os exercícios do dia
- 📆 **Contador semanal** de dias treinados (reset automático por semana)
- ⚖️ **Barra de progresso de peso** editável (55 kg → 65 kg)

### Página de Dieta (`dieta.html`)
- 🎯 **Card de meta** com data limite e progresso visual editável
- 🔥 **Macros diários** com barras de progresso (Calorias, Proteína, Carbs, Gorduras)
- 🍽️ **7 refeições** do dia com checklist e contador de kcal acumuladas
- 💡 **6 dicas** para Hard Gainers com cards visuais
- 💊 **4 suplementos** sugeridos com dosagem e justificativa
- 💧 **Seção de hidratação** com alerta sobre não beber antes das refeições

---

## 🎨 Design

- **Tema:** Dark Mode Esportivo
- **Background:** `#0a0a0a`
- **Cor principal:** `#FF6B00` (laranja neon)
- **Cor secundária:** `#FFD700` (dourado)
- **Fonte títulos:** Bebas Neue (Google Fonts)
- **Fonte corpo:** Nunito (Google Fonts)
- **Layout:** Mobile-first, responsivo (480px / 768px / 1024px)

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 com Custom Properties (variáveis)
- JavaScript vanilla (sem frameworks)
- `localStorage` para persistência de dados
- Font Awesome 6 (CDN)
- Google Fonts (CDN)
- **Zero dependências de build** — funciona direto no GitHub Pages

---

## 🚀 Como hospedar no GitHub Pages

1. Faça push do código para a branch `main`
2. No repositório, vá em **Settings → Pages**
3. Em **Source**, selecione `Deploy from a branch`
4. Escolha branch `main` e pasta `/ (root)`
5. Clique em **Save**
6. Aguarde ~1 minuto e acesse: `https://<seu-usuario>.github.io/<repositorio>/`

---

## 📱 Compatibilidade

Testado em Chrome, Firefox, Safari e Edge. Funciona em dispositivos móveis, tablets e desktop.
