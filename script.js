const btn = document.getElementById('btn');
const output = document.getElementById('output');
const themeBtn = document.getElementById('theme-btn');

const storageKey = 'ratito-theme';
let count = 0;

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeBtn.textContent = isDark ? 'Voltar ao claro' : 'Ativar modo dark';
  themeBtn.setAttribute('aria-pressed', String(isDark));
  localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem(storageKey);
setTheme(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

btn.addEventListener('click', () => {
  count++;
  const messages = [
    'Ratito aprovou o clique.',
    'O mouse está satisfeito.',
    'Mais um teste vitorioso.',
    'Isso aqui tá ficando bom demais.',
  ];

  output.textContent = `${messages[(count - 1) % messages.length]} (${count} ${count === 1 ? 'clique' : 'cliques'})`;
});

themeBtn.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
  output.textContent = document.body.classList.contains('dark-mode')
    ? 'Modo dark ativado.'
    : 'Modo claro ativado.';
});
