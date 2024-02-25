const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.canvas-container');
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

drawGrid(canvas.width, canvas.height);

function drawTriangle() {
    const x = parseInt(document.getElementById('xCoord').value);
    const y = parseInt(document.getElementById('yCoord').value);
    const length = parseInt(document.getElementById('sideLength').value);
    const selectedColor = document.getElementById('colorSelector').value;
    const vertexShape = document.getElementById('shape').value;

    const height = Math.sqrt(3) / 2 * length;
    const x2 = x - length / 2;
    const y2 = y + height;
    const x3 = x + length / 2;
    const y3 = y + height;
 
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = selectedColor;
    ctx.fill();

    if (vertexShape === 'square') {
        ctx.fillRect(x, y, 5, 5);
        ctx.fillRect(x2, y2, 5, 5);
        ctx.fillRect(x3, y3, 5, 5);
    } 
    else if (vertexShape === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x3, y3, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawGrid(width, height) {
    ctx.beginPath();
    const step = 20;

    for (let x = 0; x <= width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.strokeStyle = 'gray';
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}