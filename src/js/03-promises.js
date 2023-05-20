import Notiflix from "notiflix";

const formEl = document.querySelector(".form");
const  delayInput = document.querySelector(`[name="delay"]`);
const stepInput = document.querySelector(`[name="step"]`);
const  amountInput = document.querySelector(`[name="amount"]`)

formEl.addEventListener("submit", onFormSubmit);

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
            if (shouldResolve) {
                resolve({position,delay})
            }  else {
                reject({position, delay})
            }
            }, delay)
    });
}

function onFormSubmit(e){
    e.preventDefault();

    let amount = parseInt(amountInput.value);
    let delay = parseInt(delayInput.value);
    let step = parseInt(stepInput.value);

    for (let position = 1; position <= amount; position += 1) {
        createPromise(position, delay + step*(position - 1))
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
    }
    formEl.reset(); 
}


