import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  let { delay, step, amount } = e.target.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  if (amount <= 0 || delay < 0 || step < 0) {
    Notify.failure(` Please input correct values (>=0)`);
    return;
  }

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  formEl.reset();
}

formEl.addEventListener('submit', onFormSubmit);
