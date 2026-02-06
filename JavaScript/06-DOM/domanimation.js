// JavaScript source code

let animationId = null;
let isMoving = false;
let xShift = 2;
let yShift = 2;

const animation = document.getElementById('animation');
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let elemWidth = 0;
let elemHeight = 0;
function initAnimation() {
    // Стили для блока
    animation.style.position = 'absolute';

    let colorIndex = 0;
    const colorSchemes = [
        { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
        { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#ffffff' },
        { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: '#333333' },
        { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: '#333333' },
        { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: '#333333' },
        { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', text: '#ffffff' },
    ];

    function changeColorScheme() {
        colorIndex = (colorIndex + 1) % colorSchemes.length;
        animation.style.background = colorSchemes[colorIndex].bg;
        animation.style.color = colorSchemes[colorIndex].text;
    }

    animation.style.background = colorSchemes[0].bg;
    animation.style.color = colorSchemes[0].text;

    // Если понажимать на блок цвета меняться будут
    animation.addEventListener('click', changeColorScheme);
    animation.style.padding = '15px 25px';
    animation.style.borderRadius = '8px';
    animation.style.fontWeight = 'bold';
    animation.style.textAlign = 'center';
    animation.style.boxShadow = '0 4px 8px rgba(0,0,0,0.8)';

    updateFontSize();

    animation.style.left = '0px';
    animation.style.top = '0px';

    updateTime();
    setInterval(updateTime, 1000);

    window.addEventListener('resize', updateWindowSize);
}
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    animation.textContent = timeString;

    updateElementSize();
}
function updateWindowSize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}
function updateElementSize() {
    elemWidth = animation.offsetWidth;
    elemHeight = animation.offsetHeight;
}
function updateFontSize() {
    const fontSizeInput = document.getElementById('fontSize');
    const fontSize = parseInt(fontSizeInput.value) || 16;
    animation.style.fontSize = fontSize + 'px';
    updateElementSize();
}
// Анимация движения
function animate() {
    if (!isMoving) return;

    let xPos = parseInt(animation.style.left) || 0;
    let yPos = parseInt(animation.style.top) || 0;

    xPos += xShift;
    yPos += yShift;

    if (xPos + elemWidth >= windowWidth || xPos <= 0) {
        xShift = -xShift;
        xPos = Math.max(0, Math.min(xPos, windowWidth - elemWidth));
    }

    if (yPos + elemHeight >= windowHeight || yPos <= 0) {
        yShift = -yShift;
        yPos = Math.max(0, Math.min(yPos, windowHeight - elemHeight));
    }

    animation.style.left = xPos + 'px';
    animation.style.top = yPos + 'px';

    const intervalInput = document.getElementById('interval');
    const fps = parseInt(intervalInput.value) || 60;
    const intervalTime = Math.max(8, Math.floor(1000 / fps));

    clearTimeout(animationId);
    animationId = setTimeout(animate, intervalTime);
}
function toggleMove() {
    isMoving = !isMoving;

    if (isMoving) {
        updateWindowSize();
        updateElementSize();
        animate();
    } else {
        clearTimeout(animationId);
    }
}

function stopMove() {
    isMoving = false;
    clearTimeout(animationId);
}

function changeSettings() {
    updateFontSize();

    if (isMoving) {
        clearTimeout(animationId);
        animate();
    }
}

window.onload = initAnimation;