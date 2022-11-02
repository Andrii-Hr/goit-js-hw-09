import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStartTimer = document.querySelector('button[data-start]');
buttonStartTimer.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDateUnix = selectedDates[0].getTime();

    if (Date.now() > selectedDateUnix) {
      Notiflix.Notify.failure('Please choose a date in the future');

      buttonStartTimer.disabled = true;
      return;
    } else {
      buttonStartTimer.disabled = false;
    }
    // console.log(selectedDates[0]);
  },
};

const inputDataEl = document.querySelector('#datetime-picker');
flatpickr(inputDataEl, options);

buttonStartTimer.addEventListener('click', () => {
  buttonStartTimer.disabled = true;
  inputDataEl.disabled = true;
  const timer = {
    timerDeadline: new Date(inputDataEl.value),
    intervalId: null,
    rootSelector: document.querySelector('.timer'),
    dataDays: document.querySelector('.value[data-days]'),
    dataHours: document.querySelector('.value[data-hours]'),
    dataMinutes: document.querySelector('.value[data-minutes]'),
    dataSeconds: document.querySelector('.value[data-seconds]'),
    meta() {
      const ms = this.timerDeadline - Date.now();
      if (ms <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = convertMs(ms);

      this.dataDays.textContent = addLeadingZero(days);
      this.dataHours.textContent = addLeadingZero(hours);
      this.dataMinutes.textContent = addLeadingZero(minutes);
      this.dataSeconds.textContent = addLeadingZero(seconds);
    },
    start() {
      this.meta();
      clearTimeout(this.intervalId);
      this.intervalId = setInterval(() => {this.meta();
        
      }, 1000);
    },

    stop() {
      clearInterval(this.intervalId);
    },
  };
  timer.start();
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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
