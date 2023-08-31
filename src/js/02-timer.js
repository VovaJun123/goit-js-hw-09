// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Report } from 'notiflix/build/notiflix-report-aio';

// document.body.style.backgroundColor = '#ece5da';
// const TIMER_DELAY = 1000;
// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;


// const startBtn = document.querySelector('[data-start-timer]');
// const dataDays = document.querySelector('[data-days]');
// const dataHours = document.querySelector('[data-hours]');
// const dataMinutes = document.querySelector('[data-minutes]');
// const dataSeconds = document.querySelector('[data-seconds]');

// const flatpickrInput = document.querySelector('#datetime-picker');

// startBtn.disabled = true;
// startBtn.addEventListener('click', onStartCounter);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       Report.failure(
//         '🥺 Ooops...',
//         'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
//         'Okay'
//       );
//     } else {
//       selectedDate = selectedDates[0].getTime();
//       startBtn.disabled = false;
//       Report.success(
//         '🥰 Congratulation! Click on start!',
//         '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
//         'Okay'
//       );
//     }
//   },
// };

// const fp = flatpickr(flatpickrInput, options);

// Report.info(
//   '👋 Greeting, my Friend!',
//   'Please, choose a date and click on start',
//   'Okay'
// );

// function onStartCounter() {
//   counter.start();
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// const counter = {
//   start() {
//     intervalId = setInterval(() => {
//       currentDate = Date.now();
//       const deltaTime = selectedDate - currentDate;
//       updateTimerface(convertMs(deltaTime));
//       startBtn.disabled = true;
//       flatpickrInput.disabled = true;

//       if (deltaTime <= 1000) {
//         this.stop();
//         Report.info(
//           '👏 Congratulation! Timer stopped!',
//           'Please, if you want to start timer, choose a date and click on start or reload this page',
//           'Okay'
//         );
//       }
//     }, TIMER_DELAY);
//   },

//   stop() {
//     startBtn.disabled = true;
//     flatpickrInput.disabled = false;
//     clearInterval(intervalId);
//     return;
//   },
// };

// function updateTimerface({ days, hours, minutes, seconds }) {
//   dataDays.textContent = `${days}`;
//   dataHours.textContent = `${hours}`;
//   dataMinutes.textContent = `${minutes}`;
//   dataSeconds.textContent = `${seconds}`;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// import flatpickr from 'flatpickr';



import flatpickr from "./path/to/flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

let timerDays = document.querySelector('span[data-days]');
let timerHours = document.querySelector('span[data-hours]');
let timerMinutes = document.querySelector('span[data-minutes]');
let timerSeconds = document.querySelector('span[data-seconds]');

const currentDate = new Date();

startBtn.disabled = true;
let timerId;

const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - currentDate.getTime() < 0) {
      Notiflix.Report.warning(
        'WARNING!',
        'Please choose a date in the feature',
        'Ok'
      );
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        const timerId = setInterval(() => {
          const currentTime = new Date();
          const ms = selectedDates[0].getTime() - currentTime.getTime();

          timerDays.textContent = convertMs(ms).days;
          timerHours.textContent = convertMs(ms).hours;
          timerMinutes.textContent = convertMs(ms).minutes;
          timerSeconds.textContent = convertMs(ms).seconds;

          if (ms < 1000) {
            clearInterval(timerId);
            timerDays.textContent = '00';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
          }
        }, 1000);
      });
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));