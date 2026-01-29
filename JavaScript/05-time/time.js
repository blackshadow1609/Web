// JavaScript source code
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}

function switchBackground() {
    const delay = document.getElementById("delay").value;
    const body = document.body;
    const imgElement = document.getElementById("switch-background");

    body.style.transition = `background-color ${delay}s, color ${delay}s`;

    if (body.classList.contains('white')) {
        body.classList.remove('white');
        body.classList.add('dark');
        imgElement.src = 'image/sun.png';
        imgElement.alt = 'Переключить на светлую тему';
    } else {
        body.classList.remove('dark');
        body.classList.add('white');
        imgElement.src = 'image/moon.png';
        imgElement.alt = 'Переключить на темную тему';
    }
}

// Переключение между цифровыми и аналоговыми часами
function switchTimeDisplay() {
    const timeSwitcher = document.getElementById("time-switcher");
    const digitalClock = document.getElementById("current-time");
    const analogClock = document.getElementById("analog-clock-container");

    if (digitalClock.style.display !== "none") {
        // Переключение на аналоговые часы
        digitalClock.style.display = "none";
        analogClock.style.display = "flex";
        timeSwitcher.textContent = "Показать цифровые часы";
    } else {
        // Переключение на цифровые часы
        digitalClock.style.display = "flex";
        analogClock.style.display = "none";
        timeSwitcher.textContent = "Показать аналоговые часы";
    }
}


function trackMouse(event) {
    const mouseElement = document.getElementById("mouse");
    if (mouseElement) {
        const x = event.clientX;
        const y = event.clientY;
        mouseElement.textContent = `X = ${x}, Y = ${y}`;
    }
}

// Часы и дата
function tickTimer() {
    const time = new Date();
    const fullTimeElement = document.getElementById("full-time");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const yearsElement = document.getElementById("years");
    const monthsElement = document.getElementById("months");
    const daysElement = document.getElementById("days");
    const dayOfWeekElement = document.getElementById("day-of-week");
    const currentDateElement = document.getElementById("current-date");
    const showDateCheckbox = document.getElementById("show-date");
    const showWeekdayCheckbox = document.getElementById("show-weekday");

    if (fullTimeElement) fullTimeElement.textContent = time.toString();
    if (hoursElement) hoursElement.textContent = addLeadingZero(time.getHours());
    if (minutesElement) minutesElement.textContent = addLeadingZero(time.getMinutes());
    if (secondsElement) secondsElement.textContent = addLeadingZero(time.getSeconds());
    if (yearsElement) yearsElement.textContent = addLeadingZero(time.getFullYear());
    if (monthsElement) monthsElement.textContent = addLeadingZero(time.getMonth() + 1);
    if (daysElement) daysElement.textContent = addLeadingZero(time.getDate());
    if (dayOfWeekElement) dayOfWeekElement.textContent = time.toLocaleDateString("ru", { weekday: 'long' });

    
    if (currentDateElement && showDateCheckbox) {
        currentDateElement.style.visibility = showDateCheckbox.checked ? "visible" : "hidden";
    }
    if (dayOfWeekElement && showWeekdayCheckbox) {
        dayOfWeekElement.style.visibility = showWeekdayCheckbox.checked ? "visible" : "hidden";
    }
}

// Аналоговые часы
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (hours % 12) * 30 + (minutes / 2);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
}


document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("theme-switcher").addEventListener("click", switchBackground);
    document.getElementById("time-switcher").addEventListener("click", switchTimeDisplay);
    document.addEventListener("mousemove", trackMouse);
    document.getElementById("show-date").addEventListener("change", tickTimer);
    document.getElementById("show-weekday").addEventListener("change", tickTimer);

   
    tickTimer(); 
    updateClock(); 

    setInterval(tickTimer, 100);
    
    setInterval(updateClock, 1000);
});