const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const container = document.querySelector('.canvas-container')
canvas.width = container.clientWidth
canvas.height = container.clientHeight

const scale = 20

function setDefaultStrokeStyle(color, lineWidth) {
    context.strokeStyle = color
    context.lineWidth = lineWidth
}

function drawCoordinateAxes(width, height, step, stripLength) {
    context.beginPath()
    
    context.moveTo(0, height / 2)
    context.lineTo(width, height / 2)

    context.moveTo(width / 2, 0)
    context.lineTo(width / 2, height)

    for (let x = width / 2 + step; x <= width; x += step) {
        context.moveTo(x, height / 2 - stripLength / 2)
        context.lineTo(x, height / 2 + stripLength / 2)
    }

    for (let x = width / 2 - step; x >= 0; x -= step) {
        context.moveTo(x, height / 2 - stripLength / 2)
        context.lineTo(x, height / 2 + stripLength / 2)
    }

    for (let y = height / 2 + step; y <= height; y += step) {
        context.moveTo(width / 2 - stripLength / 2, y)
        context.lineTo(width / 2 + stripLength / 2, y)
    }

    for (let y = height / 2 - step; y >= 0; y -= step) {
        context.moveTo(width / 2 - stripLength / 2, y)
        context.lineTo(width / 2 + stripLength / 2, y)
    }

    context.stroke()
}

function drawGrid(width, height, step) {
    context.beginPath()

    for (let y = height / 2 + step; y <= height; y += step) {
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.moveTo(0, height / 2 - (y - height / 2));
        context.lineTo(width, height / 2 - (y - height / 2));
    }
    
    for (let x = width / 2 + step; x <= width; x += step) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.moveTo(width / 2 - (x - width / 2), 0);
        context.lineTo(width / 2 - (x - width / 2), height);
    }

    setDefaultStrokeStyle('gray', 0.25)
    context.stroke()

    setDefaultStrokeStyle('black', 1)
}

function drawRectangleVertex(centerX, centerY, width, height, color) {
    context.beginPath()

    context.moveTo(centerX - width / 2, centerY + height / 2)
    context.lineTo(centerX - width / 2, centerY - height / 2)
    context.lineTo(centerX + width / 2, centerY - height / 2)
    context.lineTo(centerX + width / 2, centerY + height / 2)
    context.closePath()

    context.fillStyle = color
    context.fill()
    context.stroke()
}

function drawCircleVertex(x, y, radius, color) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)

    context.fillStyle = color
    context.fill()
    context.stroke()
}

function drawTriangle(x, y, length, vertexShape, selectedColor) {
    const height = Math.sqrt(3) / 2 * length
    const x2 = x - length / 2
    const y2 = y + height
    const x3 = x + length / 2

    // заборона малювати поза межами canvas
    if (y < 0 || y2 > canvas.height || x2 < 0 || x3 > canvas.width) return
 
    context.beginPath()

    context.moveTo(x, y)
    context.lineTo(x2, y2)
    context.lineTo(x3, y2)
    context.closePath()

    context.stroke()
    context.fillStyle = selectedColor
    context.fill()

    if (vertexShape === 'square') {
        drawRectangleVertex(x, y, 5, 5)
        drawRectangleVertex(x2, y2, 5, 5)
        drawRectangleVertex(x3, y2, 5, 5)

    } else if (vertexShape === 'circle') {
        drawCircleVertex(x, y, 3)
        drawCircleVertex(x2, y2, 3)
        drawCircleVertex(x3, y2, 3)
    }
}

const btnDraw = document.querySelector(".btn-draw")
const btnClear = document.querySelector(".btn-clear")

setDefaultStrokeStyle('black', 1)
drawCoordinateAxes(canvas.width, canvas.height, scale, 8)
drawGrid(canvas.width, canvas.height, scale)

btnDraw.onclick = () => {
    const x = parseInt(document.getElementById('x-coord').value) * scale + canvas.width / 2
    const y = parseInt(document.getElementById('y-coord').value) * scale * (-1) + canvas.height / 2
    const length = parseInt(document.getElementById('side-length').value) * scale
    const vertexShape = document.getElementById('shape').value
    const selectedColor = document.getElementById('triangle-color').value

    // drawTriangle(200, 300, 100, 'circle', 'black')
    drawTriangle(x, y, length, vertexShape, selectedColor);
}

btnClear.onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawCoordinateAxes(canvas.width, canvas.height, scale, 8)
    drawGrid(canvas.width, canvas.height, scale)
}