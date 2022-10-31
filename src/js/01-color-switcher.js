const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector(`button[data-stop]`);
const body = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;
const PROMPT_DELAY = 1000;

function renderBgcBody() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener(`click`, () => {
  renderBgcBody();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(() => {
    renderBgcBody();
  }, PROMPT_DELAY);
});

stopBtn.addEventListener(`click`, () => {
  clearTimeout(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
