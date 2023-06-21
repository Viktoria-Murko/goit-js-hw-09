import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataTimePicker: document.querySelector('#datetime-picker'),
  bodyEl: document.querySelector('body'),
};

const timerComponents = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const currentDate = Date.now();
refs.startBtn.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentDate) {
      Notify.warning('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
    }
    return selectedDates[0];
  },
};

flatpickr(refs.dataTimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimerComponents({ days, hours, minutes, seconds }) {
  timerComponents.days.textContent = days;
  timerComponents.hours.textContent = hours;
  timerComponents.minutes.textContent = minutes;
  timerComponents.seconds.textContent = seconds;
}

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    intervalId = setInterval(() => {
      let inputDate = new Date(refs.dataTimePicker.value);
      const deltaTime = inputDate.getTime() - currentDate;
      const time = convertMs(deltaTime);
      // updateTimerComponents(time);
      console.log(time);
      timerComponents.days.textContent = time.days;
      timerComponents.hours.textContent = time.hours;
      timerComponents.minutes.textContent = time.minutes;
      timerComponents.seconds.textContent = time.seconds;

      if (deltaTime <= 0) {
        this.stop();
      }
    }, 1000);
  },
  stop() {
    clearInterval(intervalId);
    this.isActive = false;
  },
};
