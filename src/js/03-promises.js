import Notiflix from "notiflix";

const formEl = document.querySelector('.form');
const amount = document.querySelector('[name="amount"]');
const firstDelay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  let delayStep = Number(firstDelay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i , delayStep)
    .then(({ position, delay }) => {
       Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`
      );
    });
    delayStep += Number(step.value);
  }
});

function createPromise(position, delay) {  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
