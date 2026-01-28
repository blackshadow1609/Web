// JavaScript source code
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}

// Работа с изображениями и цветом
function setImage() {
    const fileInput = document.getElementById("image-file");
    const photo = document.getElementById("photo");

    if (fileInput.files.length === 0) {
        return;
    }

    const file = fileInput.files[0];

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        photo.src = e.target.result;
    };

    reader.onerror = function () {
        alert('Ошибка при чтении файла');
    };

    reader.readAsDataURL(file);
}

function setBackground() {
    const colorTool = document.getElementById('choose-color');
    const colorSample = document.getElementById('color-sample');

    if (colorTool && colorSample) {
        colorSample.style.backgroundColor = colorTool.value;
    }
}

// Переключение темы
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

// Отслеживание мыши
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

    // Управление видимостью
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

// Работа с массивами
function displayArrays() {
    const outputContainer = document.getElementById("arrays-output");
    if (!outputContainer) return;

    outputContainer.innerHTML = "";

    // Контейнер для вывода
    const pre = document.createElement("pre");

    // Массив 1
    const arr = [3, 5, 8, 13, 21];
    pre.textContent += "Массив 1: " + arr.join("\t") + "\n\n";

    // Массив 2
    const values = [true, false, '+', 3.14, "Hello", 2.7];
    pre.textContent += "Массив 2: " + values.join(", ") + "\n\n";

    // Матрица 3x3
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    pre.textContent += "Матрица 3x3:\n";
    matrix.forEach(row => {
        pre.textContent += row.join("\t") + "\n";
    });
    pre.textContent += "\n";

    // Зубчатый массив
    const jaggedArr = [
        [3, 5, 8, 13, 21],
        ["Хорошо", "живет", "на", "свете", "Винни", "Пух"],
        [34, 55, 89]
    ];

    pre.textContent += "Зубчатый массив:\n";
    jaggedArr.forEach(row => {
        pre.textContent += row.join("\t") + "\n";
    });

    outputContainer.appendChild(pre);

    // Вывод в консоль
    console.log("Массив 1:", arr);
    console.log("Массив 2:", values);
    console.table(values);
    console.log("Матрица:", matrix);
    console.table(matrix);
    console.log("Зубчатый массив:", jaggedArr);
    console.table(jaggedArr);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Настройка обработчиков событий
    document.getElementById("image-file").addEventListener("change", setImage);
    document.getElementById("choose-color").addEventListener("change", setBackground);
    document.getElementById("theme-switcher").addEventListener("click", switchBackground);
    document.getElementById("time-switcher").addEventListener("click", switchTimeDisplay);
    document.addEventListener("mousemove", trackMouse);
    document.getElementById("show-date").addEventListener("change", tickTimer);
    document.getElementById("show-weekday").addEventListener("change", tickTimer);

    // Отображение массивов
    displayArrays();

    // Запуск таймеров
    tickTimer(); // Первый вызов
    updateClock(); // Первый вызов

    // Обновление каждые 100 мс
    setInterval(tickTimer, 100);
    // Обновление аналоговых часов каждую секунду
    setInterval(updateClock, 1000);

    // Инициализация цвета
    const colorTool = document.getElementById('choose-color');
    if (colorTool) {
        colorTool.value = '#3498db'; 
        setBackground();
    }
});