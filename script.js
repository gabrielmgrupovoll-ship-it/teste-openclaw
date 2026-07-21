const btn = document.getElementById('btn');
const output = document.getElementById('output');
const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');
const titleEl = document.querySelector('title');
const descriptionEl = document.querySelector('meta[name="description"]');

const storageKey = 'ratito-theme';
const langKey = 'ratito-lang';
let count = 0;

const copy = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'Ratito Lab • teste-openclaw',
    description: 'Ratito Lab: uma landing page tech para testar UI, tema e microinterações.',
    'hero.badge': 'OpenClaw // Ratito Lab',
    'hero.title': 'Ratito Lab',
    'hero.copy': 'Uma interface de teste com pegada tech: limpa, responsiva e pronta para validar layout, tema escuro e pequenas interações sem drama.',
    'hero.cta': 'Abrir painel',
    'theme.btn.dark': 'Ativar modo noturno',
    'lang.btn': 'English',
    'pills.modular': 'ui modular',
    'pills.saved': 'tema salvo',
    'pills.responsive': 'responsivo',
    'pills.micro': 'microinterações',
    'intro.label': 'Build status',
    'intro.title': 'Um teste com cara de dashboard',
    'intro.copy': 'O Ratito Lab foi pensado como uma landing page tech para experimentar estrutura visual, contraste, ritmo de leitura e interação instantânea.',
    'metrics.identity': 'identidade única',
    'metrics.themes': 'temas visuais',
    'metrics.tests': 'testes possíveis',
    'action.label': 'Telemetry',
    'action.title': 'Roda um ping no Ratito',
    'action.copy': 'O botão responde com mensagens rotativas para deixar a página menos estática.',
    'action.btn': 'Executar ping',
    'action.hint': 'Dica: cada clique incrementa o contador e muda o feedback.',
    'stack.label': 'Stack',
    'stack.title': 'Leve, direto e fácil de manter',
    'stack.item1': 'HTML sem dependências externas',
    'stack.item2': 'CSS com tokens, contraste e foco visível',
    'stack.item3': 'JS pequeno com estado de tema persistido',
    'stack.codeTitle': 'ratito.config',
    'stack.code': 'theme: light | dark\ninteraction: click-ping\nlayout: responsive\naim: clean-tech-ui',
    'footer.copy': 'Feito para o teste-openclaw. Ratito operando em modo tech.',
    'footer.top': 'Voltar ao topo',
    pingMessages: [
      'Ratito respondeu ao ping.',
      'Pipeline de clique validado.',
      'Sinal verde na interface.',
      'Tudo certo: a UI está viva.',
    ],
    pingLabel: ['execução', 'execuções'],
    themeText: ['Ativar modo noturno', 'Voltar ao claro'],
    themeOutput: ['Modo claro ativado.', 'Modo noturno ativado.'],
    langLabel: ['English', 'Português'],
  },
  en: {
    htmlLang: 'en',
    title: 'Ratito Lab • teste-openclaw',
    description: 'Ratito Lab: a tech landing page to test UI, theme, and microinteractions.',
    'hero.badge': 'OpenClaw // Ratito Lab',
    'hero.title': 'Ratito Lab',
    'hero.copy': 'A tech-flavored test interface: clean, responsive, and ready to validate layout, dark mode, and small interactions without drama.',
    'hero.cta': 'Open panel',
    'theme.btn.dark': 'Enable night mode',
    'lang.btn': 'Português',
    'pills.modular': 'modular UI',
    'pills.saved': 'saved theme',
    'pills.responsive': 'responsive',
    'pills.micro': 'microinteractions',
    'intro.label': 'Build status',
    'intro.title': 'A test with dashboard energy',
    'intro.copy': 'Ratito Lab was designed as a tech landing page to experiment with visual structure, contrast, reading rhythm, and instant interaction.',
    'metrics.identity': 'unique identity',
    'metrics.themes': 'visual themes',
    'metrics.tests': 'possible tests',
    'action.label': 'Telemetry',
    'action.title': 'Run a ping on Ratito',
    'action.copy': 'The button responds with rotating messages to keep the page from feeling static.',
    'action.btn': 'Run ping',
    'action.hint': 'Tip: each click increments the counter and changes the feedback.',
    'stack.label': 'Stack',
    'stack.title': 'Light, direct, and easy to maintain',
    'stack.item1': 'HTML with no external dependencies',
    'stack.item2': 'CSS with tokens, contrast, and visible focus',
    'stack.item3': 'Small JS with persisted theme state',
    'stack.codeTitle': 'ratito.config',
    'stack.code': 'theme: light | dark\ninteraction: click-ping\nlayout: responsive\naim: clean-tech-ui',
    'footer.copy': 'Built for teste-openclaw. Ratito running in tech mode.',
    'footer.top': 'Back to top',
    pingMessages: [
      'Ratito answered the ping.',
      'Click pipeline validated.',
      'Green light on the interface.',
      'All good: the UI is alive.',
    ],
    pingLabel: ['run', 'runs'],
    themeText: ['Enable night mode', 'Back to light'],
    themeOutput: ['Light mode enabled.', 'Night mode enabled.'],
    langLabel: ['English', 'Português'],
  },
};

let currentLang = 'pt';

function getPreferredTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function applyLanguage(lang) {
  currentLang = lang;
  const dict = copy[lang];

  document.documentElement.lang = dict.htmlLang;
  document.title = dict.title;
  if (descriptionEl) descriptionEl.setAttribute('content', dict.description);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = dict[key];
    if (typeof value === 'string') {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.value = value;
      } else {
        el.textContent = value;
      }
    }
  });

  langBtn.textContent = dict['lang.btn'];
  langBtn.setAttribute('aria-pressed', String(lang === 'en'));
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? dict['theme.btn.dark'] : (lang === 'pt' ? 'Ativar modo noturno' : 'Enable night mode');
}

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  const dict = copy[currentLang];
  themeBtn.textContent = isDark ? (currentLang === 'pt' ? 'Voltar ao claro' : 'Back to light') : dict['theme.btn.dark'];
  themeBtn.setAttribute('aria-pressed', String(isDark));

  try {
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
  } catch {
    // storage indisponível, segue o jogo.
  }
}

function setLanguage(lang) {
  applyLanguage(lang);

  try {
    localStorage.setItem(langKey, lang);
  } catch {
    // storage indisponível, segue o jogo.
  }
}

const savedTheme = (() => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
})();

const savedLang = (() => {
  try {
    return localStorage.getItem(langKey);
  } catch {
    return null;
  }
})();

setLanguage(savedLang === 'en' ? 'en' : 'pt');
setTheme(savedTheme ? savedTheme === 'dark' : getPreferredTheme() === 'dark');

btn.addEventListener('click', () => {
  count += 1;
  const messages = copy[currentLang].pingMessages;
  const label = count === 1 ? copy[currentLang].pingLabel[0] : copy[currentLang].pingLabel[1];
  output.textContent = `${messages[(count - 1) % messages.length]} (${count} ${label})`;
});

themeBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  setTheme(isDark);
  output.textContent = isDark ? (currentLang === 'pt' ? 'Modo noturno ativado.' : 'Night mode enabled.') : (currentLang === 'pt' ? 'Modo claro ativado.' : 'Light mode enabled.');
});

langBtn.addEventListener('click', () => {
  const nextLang = currentLang === 'pt' ? 'en' : 'pt';
  setLanguage(nextLang);
  output.textContent = nextLang === 'pt' ? 'Idioma alterado para português.' : 'Language switched to English.';
});
