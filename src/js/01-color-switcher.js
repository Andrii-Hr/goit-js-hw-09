const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector(`button[data-stop]`);


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let intervalId = null;
  const PROMPT_DELAY = 1000;


startBtn.addEventListener(`click`, ()=>{
    intervalId = setInterval(()=>{
    const currentColor = getRandomHexColor();
    document.body.style.backgroundColor =  currentColor;
    startBtn.disabled = true;
    // stopBtn.disabled = false;
},PROMPT_DELAY )
});

stopBtn.addEventListener(`click`,()=>{
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;
    // stopBtn.disabled = true;
} )
