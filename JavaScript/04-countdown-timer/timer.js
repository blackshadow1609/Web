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
        soundButton.textContent = soundEnabled ? "🔊 Звук ВКЛ" : "🔇 Звук ВЫКЛ";
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

    let targetDateValue = new Date(targetDateControl.value);
    let targetTimeValue = new Date(targetTimeControl.value);

    let targetDateTime = new Date(targetDateValue);
    let timeParts = targetTimeControl.value.split(':');
    targetDateTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);

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

    const totalSeconds = Math.floor(duration / 1000);

    const secondsPerYear = 365.25 * 24 * 60 * 60;
    const years = Math.floor(totalSeconds / secondsPerYear);
    const remainingAfterYears = totalSeconds % secondsPerYear;

    const secondsPerMonth = 30.44 * 24 * 60 * 60;
    const months = Math.floor(remainingAfterYears / secondsPerMonth);
    const remainingAfterMonths = remainingAfterYears % secondsPerMonth;

    const days = Math.floor(remainingAfterMonths / 86400);
    const hours = Math.floor((remainingAfterMonths % 86400) / 3600);
    const minutes = Math.floor((remainingAfterMonths % 3600) / 60);
    const seconds = remainingAfterMonths % 60;

    if (document.getElementById("years")) {
        document.getElementById("years").textContent = years.toString().padStart(2, '0');
        document.getElementById("months").textContent = months.toString().padStart(2, '0');
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    if (document.getElementById("target-date-value")) {
        document.getElementById("target-date-value").textContent = targetDateValue;
        document.getElementById("target-time-value").textContent = targetTimeValue;
        document.getElementById("current-time-value").textContent = now;
        document.getElementById("duration").textContent = duration;
        document.getElementById("timestamp").textContent = totalSeconds;
    }
}

