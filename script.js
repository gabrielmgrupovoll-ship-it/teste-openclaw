const btn = document.getElementById('btn');
const output = document.getElementById('output');

let count = 0;

btn.addEventListener('click', () => {
  count++;
  output.textContent = `Clicado ${count} ${count === 1 ? 'vez' : 'vezes'}`;
});
