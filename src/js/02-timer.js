import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const DateTimePickerEl = document.querySelector("#datetime-picker");
const startBtnEl = document.querySelector("button[data-start]");
const daysValueEl = document.querySelector("span[data-days]");
const hoursValueEl = document.querySelector("span[data-hours]");
const minutesValueEl = document.querySelector("span[data-minutes]");
const secondsValueEl = document.querySelector("span[data-seconds]");

let timerRefresh = null;

startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      //   return alert("Please choose a date in the future");
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      startBtnEl.disabled = false;
    }
  },
};

flatpickr(DateTimePickerEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function startTimer() {
  timerRefresh = setInterval(() => {
    const selectedDate = DateTimePickerEl.value;
    const targetDate = new Date(selectedDate).getTime();
    console.log(targetDate);
    const currentDate = new Date().getTime();
    console.log(currentDate);
    const deltaTime = targetDate - currentDate;
    console.log(deltaTime);
    const time = convertMs(deltaTime);
    console.log(time);
    daysValueEl.textContent = `${time.days}`;
    hoursValueEl.textContent = `${time.hours}`;
    minutesValueEl.textContent = `${time.minutes}`;
    secondsValueEl.textContent = `${time.seconds}`;
  }, 1000);
};

startBtnEl.addEventListener("click", startTimer);
