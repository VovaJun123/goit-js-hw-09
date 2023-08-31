// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// document.body.style.backgroundColor = '#f7eff4';
// const form = document.querySelector('form.form');
// const options = {
//   position: 'center-bottom',
//   distance: '15px',
//   borderRadius: '15px',
//   timeout: 10000,
//   clickToClose: true,
//   cssAnimationStyle: 'from-right',
// };

// form.addEventListener('click', onPromiseCreate);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function onPromiseCreate(e) {
//   e.preventDefault();
//   const { delay, step, amount } = e.currentTarget.elements;
//   let inputDelay = Number(delay.value);
//   let inputStep = Number(step.value);
//   let inputAmount = Number(amount.value);

//   for (let i = 1; i <= inputAmount; i += 1) {
//     inputDelay += inputStep;

//     createPromise(i, inputDelay)
//       .then(({ position, delay }) => {
//         Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`,
//           options
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`,
//           options
//         );
//       });
//     e.currentTarget.reset();
//   }
// }

import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

function submit(evt) {
  evt.preventDefault();
  let delay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);
  let position;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay = delay + step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

elements.form.addEventListener('submit', submit);