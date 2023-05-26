import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.getElementById(`datetime-picker`);
const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector(`.timer`);
const fields = document.querySelectorAll(`.field`);
const urls = {
    daysSpan: document.querySelector('span[data-days]'),
    hoursSpan: document.querySelector('span[data-hours]'),
    minutesSpan: document.querySelector('span[data-minutes]'),
    secondsSpan: document.querySelector('span[data-seconds]'),
};

StartBtnBlock();

timer.style.display = "flex";

fields.forEach(field => {  
    field.style.display = "flex";
    field.style.flexDirection ="column";
    field.style.margin ="5px";
    field.style.textAlign ="center";
})

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

let selectedDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            Notify.failure('Please choose a date in the future!');
            StartBtnBlock();
            return;
        }

        startBtn.removeAttribute('disabled');
        selectedDate = selectedDates[0].getTime();
    },
};

startBtn.addEventListener('click', onCounterStart);

let isIntervalActive = false;

function addLeadingZero(value) {
    return value.padStart(2, 0);
}

function onCounterStart() {
    if (isIntervalActive) {
        Notify.warning(
            'The countdown has already started! Please, reload the page.'
        );
        return;
    }

    Notify.success('The countdown has begun.');

    const intervalId = setInterval(() => {
        let preventTimerResult = selectedDate - new Date().getTime();
        let convertedTimerResult = convertMs(preventTimerResult);

        urls.daysSpan.textContent = addLeadingZero(String(convertedTimerResult.days));
        urls.hoursSpan.textContent = addLeadingZero(String(convertedTimerResult.hours));
        urls.minutesSpan.textContent = addLeadingZero(String(convertedTimerResult.minutes));
        urls.secondsSpan.textContent = addLeadingZero(String(convertedTimerResult.seconds));

        if (preventTimerResult < 1000) {
            clearInterval(intervalId);
        }
    }, 1000);

    isIntervalActive = true;
}

function StartBtnBlock() {
    startBtn.setAttribute('disabled', 'true');  
}

flatpickr(calendar, options);