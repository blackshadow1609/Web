// JavaScript source code

let soundEnabled = true;
let lastSecond = -1;

function switchBackground() {
    let delay = document.getElementById("delay").value;

    document.body.style.transition = `color ${delay}s, background ${delay}s`;

    const imgElement = document.getElementById("switch-background");

    if (document.body.classList.contains('white')) {
        document.body.classList.remove('white');
        document.body.classList.add('dark');
        imgElement.src = 'image/sun.png';
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('white');
        imgElement.src = 'image/moon.png';
    }
}

document.addEventListener
    (
        "mousemove",
        function (event) {
            let x = event.clientX;
            let y = event.clientY;
            document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;

        }
    );

/*----------------------------------------------------------------------------------------*/

let countdownInterval = null;
function playTickSound() {
    if (!soundEnabled) return;

    try {
        const tickSound = document.getElementById("tick-sound");
        tickSound.currentTime = 0; 
        tickSound.play().catch(e => console.log("Не удалось воспроизвести звук тика:", e));
    } catch (error) {
        console.log("Ошибка воспроизведения звука тика:", error);
    }
}

function playAlarmSound() {
    if (!soundEnabled) return;

    try {
        const alarmSound = document.getElementById("alarm-sound");
        alarmSound.currentTime = 0;

        alarmSound.play().then(() => {
            alarmSound.onended = function () {
                setTimeout(() => {
                    alarmSound.currentTime = 0;
                    alarmSound.play();
                }, 500);
            };
        }).catch(e => console.log("Не удалось воспроизвести сигнал:", e));
    } catch (error) {
        console.log("Ошибка воспроизведения сигнала:", error);
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundButton = document.getElementById("sound-toggle");
    if (soundButton) {
        soundButton.textContent = soundEnabled ? "Звук ВКЛ" : "Звук ВЫКЛ";
    }
}
document.getElementById("btn-start").onclick = function startCountdownTimer() {
    let targetDate = document.getElementById("target-date");
    let targetTime = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");

    if (btnStart.value === "Start") {
        if (!targetDate.value || !targetTime.value) {
            alert("Пожалуйста, выберите дату и время!");
            return;
        }

        btnStart.value = "Stop";
        targetDate.disabled = targetTime.disabled = true;

        lastSecond = -1;

        tickCountdown();
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        countdownInterval = setInterval(tickCountdown, 100);
    }
    else {
        btnStart.value = "Start";
        targetDate.disabled = targetTime.disabled = false;

        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        const tickSound = document.getElementById("tick-sound");
        const alarmSound = document.getElementById("alarm-sound");
        tickSound.pause();
        tickSound.currentTime = 0;
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}
function tickCountdown() {
    let now = new Date();

    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");

    if (!targetDateControl.value || !targetTimeControl.value) {
        alert("Пожалуйста, выберите дату и время!");
        document.getElementById("btn-start").value = "Start";
        targetDateControl.disabled = targetTimeControl.disabled = false;
        return;
    }

    let targetDateTime = new Date(targetDateControl.value + 'T' + targetTimeControl.value + ':00');
    /*targetDateTime = new Date(targetDateTime.getTime() - targetDateTime.getTimezoneOffset() * 60000);*/


    let duration = targetDateTime - now;

    const currentSecond = Math.floor((duration % 60000) / 1000);

    if (soundEnabled && currentSecond !== lastSecond && duration > 0) {
        playTickSound();
        lastSecond = currentSecond;
    }

    if (duration <= 0) {
        const timeUnits = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
        timeUnits.forEach(unit => {
            if (document.getElementById(unit)) {
                document.getElementById(unit).textContent = "00";
            }
        });

        if (soundEnabled && countdownInterval) {
            playAlarmSound();
        }

        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        document.getElementById("btn-start").value = "Start";
        targetDateControl.disabled = targetTimeControl.disabled = false;

        if (confirm("Время истекло! Нажмите OK чтобы остановить сигнал.")) {
            const alarmSound = document.getElementById("alarm-sound");
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        return;
    }

    let years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;

    if (duration > 0) {
        const tempNow = new Date(now);

        years = targetDateTime.getFullYear() - tempNow.getFullYear();

        months = targetDateTime.getMonth() - tempNow.getMonth();
        if (months < 0) {
            years--;
            months += 12;
        }

        const dateAfterYearsMonths = new Date(tempNow);
        dateAfterYearsMonths.setFullYear(
            tempNow.getFullYear() + years,
            tempNow.getMonth() + months,
            tempNow.getDate()
        );

        if (dateAfterYearsMonths > targetDateTime) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
            dateAfterYearsMonths.setMonth(dateAfterYearsMonths.getMonth() - 1);
        }

        const daysDiff = Math.floor((targetDateTime - dateAfterYearsMonths) / (1000 * 60 * 60 * 24));
        days = daysDiff;

        const dateAfterDays = new Date(dateAfterYearsMonths);
        dateAfterDays.setDate(dateAfterDays.getDate() + days);

        const remainingMs = targetDateTime - dateAfterDays;
        hours = Math.floor(remainingMs / (1000 * 60 * 60));
        minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    }

    if (document.getElementById("years")) {
        document.getElementById("years").textContent = years.toString().padStart(2, '0');
        document.getElementById("months").textContent = months.toString().padStart(2, '0');
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    if (document.getElementById("target-date-value")) {
        document.getElementById("target-date-value").textContent = targetDateTime.toLocaleDateString();
        document.getElementById("target-time-value").textContent = targetDateTime.toLocaleTimeString();
        document.getElementById("current-time-value").textContent = now.toLocaleString();
        document.getElementById("duration").textContent = duration + " мс";
        document.getElementById("timestamp").textContent = Math.floor(duration / 1000) + " сек";
    }
}

