import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const calendar = document.getElementById(`datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);
const timer = document.querySelector(`.timer`);
const fields = document.querySelectorAll(`.field`);
const days = document.querySelector(`[data-days]`);
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector(`[data-seconds]`);

let timerInterval = null;

startBtn.setAttribute(`disabled`, true);

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

function addLeadingZero(value){
    return String(value).padStart(2, '0'); 
}

function onScreenLoad(object){ 
    hours.textContent = addLeadingZero(object.hours);
    minutes.textContent = addLeadingZero(object.minutes);
    seconds.textContent = addLeadingZero(object.seconds);
}

function counter(chosenDate){   
    const currentDate = new Date();
    const countdownTime = convertMs(chosenDate.getTime() - currentDate.getTime());
    // console.log('Countdown Time:', countdownTime);
    onScreenLoad(countdownTime);
    if ((countdownTime.days === 0 && countdownTime.hours === 0 && countdownTime.minutes === 0 && countdownTime.seconds === 0)){
        clearInterval(timerInterval);
        days.textContent = padStart(0);
        hours.textContent = padStart(0);
        minutes.textContent = padStart(0);
        seconds.textContent = padStart(0);
    }
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const currentDate = new Date;
        const chosenDate = selectedDates[0];

        if(chosenDate < currentDate){
            Notiflix.Notify.failure('Please choose a date in the future');
        }else{
            startBtn.removeAttribute(`disabled`, true);
            // console.log(chosenDate.getTime());
            // console.log(currentDate.getTime());
            startBtn.addEventListener('click', startCounter);
            
            function startCounter(){                    
                clearInterval(timerInterval);
                timerInterval = setInterval(()=> counter(chosenDate), 1000);
                startBtn.setAttribute(`disabled`, true);
            }
        }        
    },
};

flatpickr(calendar, options)

