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
    context.font = '20px Arial'
    context.fillStyle = 'red'
    context.textAlign = 'center'
    context.fillText('X', width - scale, height / 2 - scale) // x label
    context.fillText('Y', width / 2 + scale, scale) // y label
    
    context.beginPath()
    
    // horizontal line drawing
    context.moveTo(0, height / 2)
    context.lineTo(width, height / 2)

    // vertical line drawing
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2, height)

    // x arrow drawing
    context.moveTo(width, height / 2)
    context.lineTo(width - scale / 1.5, height / 2 - scale / 3)
    context.moveTo(width, height / 2)
    context.lineTo(width - scale / 1.5, height / 2 + scale / 3)

    // y arrow drawing
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2 - scale / 3, scale / 1.5)
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2 + scale / 3, scale / 1.5)

    // x coordinate lines drawing
    for (let x = width / 2 + step; x <= width; x += step) {
        context.moveTo(x, height / 2 - stripLength / 2)
        context.lineTo(x, height / 2 + stripLength / 2)
        context.moveTo(width - x, height / 2 - stripLength / 2)
        context.lineTo(width - x, height / 2 + stripLength / 2)
    }

    // y coordinate lines drawing
    for (let y = height / 2 + step; y <= height; y += step) {
        context.moveTo(width / 2 - stripLength / 2, y)
        context.lineTo(width / 2 + stripLength / 2, y)
        context.moveTo(width / 2 - stripLength / 2, height - y)
        context.lineTo(width / 2 + stripLength / 2, height - y)
    }

    context.stroke()
}

function drawGrid(width, height, step) {
    context.beginPath()

    // horizontal grid lines drawing
    for (let y = height / 2 + step; y <= height; y += step) {
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.moveTo(0, height / 2 - (y - height / 2));
        context.lineTo(width, height / 2 - (y - height / 2));
    }
    
    // vertical grid lines drawing
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

function drawSquareVertexes(centerX, centerY, width, height, color) {
    context.beginPath()

    // drawing 3 triangle vertexes with rectangle form 
    context.moveTo(centerX - width / 2, centerY + height / 2)
    context.lineTo(centerX - width / 2, centerY - height / 2)
    context.lineTo(centerX + width / 2, centerY - height / 2)
    context.lineTo(centerX + width / 2, centerY + height / 2)
    context.closePath()

    context.fillStyle = color
    context.fill()
    context.stroke()
}

function drawCircleVertexes(x, y, radius, color) {
    context.beginPath()

    // drawing 3 triangle vertexes with circle form
    context.arc(x, y, radius, 0, Math.PI * 2)

    context.fillStyle = color
    context.fill()
    context.stroke()
}

function drawTriangle(x1, y1, x2, y2, vertexShape, selectedColor) {
    const x3 = x1 + (x2 - x1) / 2 - Math.sqrt(3) * (y2 - y1) / 2
    const y3 = y1 + (y2 - y1) / 2 + Math.sqrt(3) * (x2 - x1) / 2

    // checking if triangle fits canvas box
    // if (y < 0 || y2 > canvas.height || x2 < 0 || x3 > canvas.width) return
 
    context.beginPath()

    // drawing triangle
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineTo(x3, y3)
    context.closePath()

    context.stroke()
    context.fillStyle = selectedColor
    context.fill()

    // checking selected vertex shapes
    if (vertexShape === 'square') {
        drawSquareVertexes(x1, y1, 5, 5)
        drawSquareVertexes(x2, y2, 5, 5)
        drawSquareVertexes(x3, y3, 5, 5)

    } else if (vertexShape === 'circle') {
        drawCircleVertexes(x1, y1, 3)
        drawCircleVertexes(x2, y2, 3)
        drawCircleVertexes(x3, y3, 3)
    }
}

const btnDraw = document.querySelector(".btn-draw")
const btnClear = document.querySelector(".btn-clear")

setDefaultStrokeStyle('black', 1)
drawCoordinateAxes(canvas.width, canvas.height, scale, 8)
drawGrid(canvas.width, canvas.height, scale)

btnDraw.onclick = () => {
    // getting values from user input
    const x1 = parseFloat(document.getElementById('x1-coord').value) * scale + canvas.width / 2
    const x2 = parseFloat(document.getElementById('x2-coord').value) * scale + canvas.width / 2
    const y1 = parseFloat(document.getElementById('y1-coord').value) * scale * (-1) + canvas.height / 2
    const y2 = parseFloat(document.getElementById('y2-coord').value) * scale * (-1) + canvas.height / 2
    const vertexShape = document.getElementById('shape').value
    const selectedColor = document.getElementById('triangle-color').value

    // drawTriangle(0, 0, 6, 0, 'circle', 'red')
    drawTriangle(x1, y1, x2, y2, vertexShape, selectedColor);
}

btnClear.onclick = () => {
    // clearing previously drawed triangles
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawCoordinateAxes(canvas.width, canvas.height, scale, 8)
    drawGrid(canvas.width, canvas.height, scale)
}