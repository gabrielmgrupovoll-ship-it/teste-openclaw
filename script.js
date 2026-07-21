const btn = document.getElementById('btn');
const output = document.getElementById('output');
const themeBtn = document.getElementById('theme-btn');

const storageKey = 'ratito-theme';
let count = 0;

function getPreferredTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeBtn.textContent = isDark ? 'Voltar ao claro' : 'Ativar modo noturno';
  themeBtn.setAttribute('aria-pressed', String(isDark));

  try {
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
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

setTheme(savedTheme ? savedTheme === 'dark' : getPreferredTheme() === 'dark');

btn.addEventListener('click', () => {
  count += 1;

  const messages = [
    'Ratito respondeu ao ping.',
    'Pipeline de clique validado.',
    'Sinal verde na interface.',
    'Tudo certo: a UI está viva.',
  ];

  const label = count === 1 ? 'execução' : 'execuções';
  output.textContent = `${messages[(count - 1) % messages.length]} (${count} ${label})`;
});

themeBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  setTheme(isDark);
  output.textContent = isDark ? 'Modo noturno ativado.' : 'Modo claro ativado.';
});
