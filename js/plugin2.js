function Timer(timerContainerSelector, timeEndContainerSelecor, audiosrc) {
    let countdown;
    let timerContainer = document.querySelector(timerContainerSelector);
    let endTimeContainer = document.querySelector(timeEndContainerSelecor);
    let audio = new Audio(audiosrc);

    /**
     * Функция запуска таймера
     * @param {number} seconds 
     */
    this.start = function (seconds) {       
        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;
            
            
        displayTimeLeft(seconds);
        displayEndTime(then);
    
        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
    
            if (secondsLeft < 0) {
                audio.play();
                return clearInterval(countdown);
            }
                
                displayTimeLeft(secondsLeft);
            }, 1000);
    }   

    /**
     * Ф-я сброса таймера
     */
    this.stop = function() {
        clearInterval(countdown);
        timerContainer.innerHTML = '';
        endTimeContainer.innerHTML = '';
        document.title = '';
        audio.pause();
        audio.currentTime = 0;
        // TODO: Подумать над комментариями ниже)))
        // console.log(this.test);
        // console.log(this);
    }
 
    /**
     * Функция для вывода таймера в разметку. Принимает секунды и выводит их в разметку в правильном формате.
     * @param {number} seconds  - текущее время таймера в секундах
     * @returns {void}
     */
    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const reminderSeconds = seconds % 60;
        const hours = Math.floor(minutes / 60);
        const reminderMinutes = minutes % 60;
        const days = Math.floor(hours / 24);
        const reminderHours = hours % 24;
        const display = hours > 23 ? `${days+'d'}:${reminderHours < 10 ? '0' : ''}${reminderHours+'h'}:${reminderMinutes < 10 ? '0' : ''}${reminderMinutes+'m'}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds+'s'}` : hours ? `${hours < 10 ? '0' : ''}${hours}:${reminderMinutes < 10 ? '0' : ''}${reminderMinutes}:${reminderSeconds < 10 ? "0" : ""}${reminderSeconds}` : `${minutes < 10 ? "0" : ""}${minutes}:${reminderSeconds < 10 ? "0" : ""}${reminderSeconds}`;
        document.title = display;
        timerContainer.textContent = display;
    }
    /** 
     * Функция вывода даты окончания работы таймера.
     * @param {number} timestamp - время окончания работы таймера в млс
     */
    function displayEndTime(timestamp) {
        const now = Date.now();
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const days = date.getDate();
        const month = date.getMonth();
        const display = date - now > 86400000 ? `Be back in ${days < 10 ? "0" : ""}${days}.${month < 10 ? "0" : ""}${month} at  ${hours}:${minutes < 10 ? "0" : ""}${minutes}` : `Be back at ${hours} : ${minutes < 10 ? "0" : ""}${minutes}`;
        endTimeContainer.textContent = display;
    }
}

const form = document.forms['customForm'];
const inputMinutes = form['minutes'];
const btns = document.querySelectorAll("[data-time]");
const stopbtn = document.querySelector('.stop__timer');
const myTimer = new Timer('.display__time-left', '.display__end-time', "audio/bell.mp3");

/**
 * Ф-я startTimerOnForm принимает минуты, введенные пользователем в input и по ним запускает timer
 * @param {e} event 
 */
function startTimerOnForm(e) {
    event.preventDefault();

    if (inputMinutes.value != +inputMinutes.value || inputMinutes.value < 0) alert('Вы ввели некорректное время')
    else return myTimer.start(parseFloat(inputMinutes.value) * 60);
}

/**
 * Ф-я startTimerOnClick запускает таймер по клику на кнопку
 * @param {*} e 
 */

function startTimerOnClick(e) {
    const seconds = parseFloat(this.dataset.time);
    myTimer.start(seconds);
}

/**
 * Ф-я stopTimerOnClick останавливает таймер по клику на кнопку
 * @param {*} e 
 */
function stopTimerOnClick(e) {
    myTimer.stop();
}

btns.forEach(btn => btn.addEventListener("click", startTimerOnClick));
form.addEventListener("submit", startTimerOnForm);
 // TODO: Подумать о потере контекста))
stopbtn.addEventListener("click",  myTimer.stop.bind(myTimer));