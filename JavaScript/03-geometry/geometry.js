// JavaScript source code
function drawSquare() {
    const input = document.getElementById("square-size");
    const result = document.getElementById("square-result");
    const size = parseInt(input.value);

    if (isNaN(size) || size < 0) {
        result.innerHTML = '';
        return;
    }

    if (size > 50) {
        result.innerHTML = '<p style="color: red;">Максимальный размер: 50</p>';
        return;
    }

    if (size === 0) {
        result.innerHTML = '<p>Размер квадрата: 0x0</p>';
        return;
    }

    let squareHTML = `<p>Квадрат ${size}x${size}:</p><pre style="font-family: monospace; line-height: 1;">`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            squareHTML += '* ';
        }
        squareHTML += '\n';
    }

    squareHTML += '</pre>';
    result.innerHTML = squareHTML;
}
function drawTriangle() {
    const input = document.getElementById("triangle-size");
    const result = document.getElementById("triangle-result");
    const height = parseInt(input.value);

    if (isNaN(height) || height < 0) {
        result.innerHTML = '';
        return;
    }

    if (height > 50) {
        result.innerHTML = '<p style="color: red;">Максимальная высота: 50</p>';
        return;
    }

    if (height === 0) {
        result.innerHTML = '<p>Высота треугольника: 0</p>';
        return;
    }

    let triangleHTML = `<p>Треугольник высотой ${height}:</p><pre style="font-family: monospace; line-height: 1;">`;

    for (let i = 1; i <= height; i++) {
        for (let j = 0; j < i; j++) {
            triangleHTML += '* ';
        }
        triangleHTML += '\n';
    }

    triangleHTML += '</pre>';
    result.innerHTML = triangleHTML;
}
function drawInvertedTriangle() {
    const input = document.getElementById("triangle-inverted");
    const result = document.getElementById("triangle-inverted-result");
    const height = parseInt(input.value);

    if (isNaN(height) || height < 0) {
        result.innerHTML = '';
        return;
    }

    if (height > 50) {
        result.innerHTML = '<p style="color: red;">Максимальная высота: 50</p>';
        return;
    }

    let triangleHTML = `<p>Треугольник высотой ${height}:</p><pre style="font-family: monospace; line-height: 1;">`;

    for (let i = height; i >= 1; i--) {
        for (let j = 0; j < i; j++) {
            triangleHTML += '* ';
        }
        triangleHTML += '\n';
    }

    triangleHTML += '</pre>';
    result.innerHTML = triangleHTML;
}

function drawRightTriangle() {
    const input = document.getElementById("triangle-right");
    const result = document.getElementById("triangle-right-result");
    const height = parseInt(input.value);

    if (isNaN(height) || height < 0) {
        result.innerHTML = '';
        return;
    }

    if (height > 50) {
        result.innerHTML = '<p style="color: red;">Максимальная высота: 50</p>';
        return;
    }

    if (height === 0) {
        result.innerHTML = '<p>Высота треугольника: 0</p>';
        return;
    }
    
    let triangleHTML = `<p>Треугольник высотой ${height}:</p><pre style="font-family: monospace; line-height: 1;">`;

    for (let i = height; i >= 1; i--) {
        
        for (let j = 0; j < (height - i); j++) {
            triangleHTML += '  ';
        }
        
        for (let k = 0; k < i; k++) {
            triangleHTML += '* ';
        }
        triangleHTML += '\n';
    }

    triangleHTML += '</pre>';
    result.innerHTML = triangleHTML;
}
function drawLeftTriangle() {
    const input = document.getElementById("triangle-left");
    const result = document.getElementById("triangle-left-result");
    const height = parseInt(input.value);

    if (isNaN(height) || height < 0) {
        result.innerHTML = '';
        return;
    }

    if (height > 50) {
        result.innerHTML = '<p style="color: red;">Максимальная высота: 50</p>';
        return;
    }

    if (height === 0) {
        result.innerHTML = '<p>Высота треугольника: 0</p>';
        return;
    }
    
    let triangleHTML = `<p>Треугольник высотой ${height} :</p><pre style="font-family: monospace; line-height: 1;">`;

    for (let i = 1; i <= height; i++) {
        
        for (let j = 0; j < (height - i); j++) {
            triangleHTML += '  ';
        }
        
        for (let k = 0; k < i; k++) {
            triangleHTML += '* ';
        }
        triangleHTML += '\n';
    }

    triangleHTML += '</pre>';
    result.innerHTML = triangleHTML;
}
function drawDiamond() {
    const input = document.getElementById("diamond-size");
    const result = document.getElementById("diamond-result");
    const halfHeight = parseInt(input.value);

    if (isNaN(halfHeight) || halfHeight < 0) {
        result.innerHTML = '';
        return;
    }

    if (halfHeight > 25) {
        result.innerHTML = '<p style="color: red;">Максимальная высота половины: 25</p>';
        return;
    }

    if (halfHeight === 0) {
        result.innerHTML = '<p>Высота ромба: 0</p>';
        return;
    }
    
    const totalHeight = halfHeight * 2 - 1;

    let diamondHTML = `<p>Ромб (высота: ${totalHeight}):</p><pre style="font-family: monospace; line-height: 1;">`;

    
    for (let i = 0; i < halfHeight; i++) {
        
        for (let j = 0; j < halfHeight - i - 1; j++) {
            diamondHTML += ' ';
        }
        
        diamondHTML += '/';
        
        for (let j = 0; j < i * 2; j++) {
            diamondHTML += ' ';
        }
        
        diamondHTML += '\\';
        diamondHTML += '\n';
    }

    for (let i = halfHeight - 2; i >= 0; i--) {
       
        for (let j = 0; j < halfHeight - i - 1; j++) {
            diamondHTML += ' ';
        }
        
        diamondHTML += '\\';
        
        for (let j = 0; j < i * 2; j++) {
            diamondHTML += ' ';
        }
        diamondHTML += '/';
        diamondHTML += '\n';
    }

    diamondHTML += '</pre>';
    result.innerHTML = diamondHTML;
}
function drawBorderedGrid() {
    const rowsInput = document.getElementById("rows2");
    const colsInput = document.getElementById("cols2");
    const sizeInput = document.getElementById("cell-size");
    const result = document.getElementById("bordered-grid-result");

    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    let cellSize = parseInt(sizeInput.value);

    if (isNaN(rows) || rows < 2) rows = 2;
    if (isNaN(cols) || cols < 2) cols = 2;
    if (isNaN(cellSize) || cellSize < 2) cellSize = 2;
    if (rows > 10) rows = 10;
    if (cols > 10) cols = 10;
    if (cellSize > 8) cellSize = 8;

    rowsInput.value = rows;
    colsInput.value = cols;
    sizeInput.value = cellSize;

    const totalRows = rows * cellSize;
    const totalCols = cols * cellSize;

    let gridHTML = `<p>Chess Board ${rows}x${cols} cells (${cellSize}x${cellSize} each):</p><pre style="font-family: monospace; line-height: 1; font-size: 16px;">`;

    for (let i = 0; i < totalRows; i++) {
        const cellRow = Math.floor(i / cellSize);

        for (let j = 0; j < totalCols; j++) {
            const cellCol = Math.floor(j / cellSize);

            if ((cellRow + cellCol) % 2 === 0) {
                gridHTML += '-';
            } else {
                gridHTML += '+';
            }
        }
        gridHTML += '\n';
    }

    gridHTML += '</pre>';
    result.innerHTML = gridHTML;
}

function drawPascalPyramid() {
    const input = document.getElementById("pascal-rows");
    const result = document.getElementById("pascal-result");
    const rows = parseInt(input.value);

    if (isNaN(rows) || rows < 1) {
        result.innerHTML = '<p style="color: red;">Минимальное количество строк: 1</p>';
        return;
    }

    if (rows > 15) {
        result.innerHTML = '<p style="color: red;">Максимальное количество строк: 15</p>';
        return;
    }

    const pyramid = [];
    for (let i = 0; i < rows; i++) {
        pyramid[i] = [1];
        for (let j = 1; j < i; j++) {
            pyramid[i][j] = pyramid[i - 1][j - 1] + pyramid[i - 1][j];
        }
        if (i > 0) pyramid[i][i] = 1;
    }

    let pyramidHTML = `
        <p>Треугольник Паскаля (${rows} строк):</p>
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        ">
    `;

    for (let i = 0; i < rows; i++) {
        pyramidHTML += `
            <div style="
                display: flex;
                justify-content: center;
                gap: 5px;
            ">
        `;

        for (let j = 0; j <= i; j++) {
            pyramidHTML += `
                <div style="
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #4a90e2;
                    border-radius: 6px;
                    background-color: #f0f8ff;
                    font-size: 18px;
                    font-weight: bold;
                    box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
                ">
                    ${pyramid[i][j]}
                </div>
            `;
        }

        pyramidHTML += '</div>';
    }

    pyramidHTML += '</div>';
    result.innerHTML = pyramidHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация шахматной доски
    drawBorderedGrid();
    // Инициализация треугольника Паскаля
    drawPascalPyramid();

    console.log("Hello World! from geometry.js");
});