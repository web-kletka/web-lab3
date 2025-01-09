const checkboxes = document.querySelectorAll(".check-box-r");

checkboxes.forEach((checkbox, index) => {

    const hiddenInput = document.getElementById("form:hidden-r");

    checkbox.checked = false;
    console.log((index + 1) + " : " + hiddenInput.value);

    if (index + 1 === Number(hiddenInput.value)) {
        checkbox.checked = true;
        console.log("OK");
    }

    // Добавляем обработчик событий
    checkbox.addEventListener("change", function () {
        // Сбрасываем все остальные чекбоксы
        checkboxes.forEach((cb) => {
            if (cb !== this) cb.checked = false;
        });

        // Устанавливаем значение только для активного чекбокса
        if (this.checked) {
            hiddenInput.value = index + 1; // Учитываем индекс чекбокса
            renderGraph(index + 1);
        } else {
            hiddenInput.value = ""; // Сбрасываем значение
        }
    });
});


window.addEventListener('load', () => {
    console.log("---" + document.getElementById("form:hidden-r").value)
    renderGraph(document.getElementById("form:hidden-r").value)
})

const graphCanvas = document.querySelector('#graphCanvas');
const context = graphCanvas.getContext('2d');
const range = 11;

function renderGraph(R) {
    context.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    drawCoordinateAxes(scale);
    drawMarkers(scale);

    context.fillStyle = 'rgba(255,0,234,0.89)';

    context.beginPath();
    context.arc(centerX, centerY, scale * R, Math.PI, 1.5 * Math.PI, false);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.fill();

    context.fillRect(centerX, centerY, scale * R, -scale * R);


    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX, centerY + scale * R / 2);
    context.lineTo(centerX + scale * R, centerY);
    context.closePath();
    context.fill();

    points.forEach(point => {
        drawPoint(point.x, point.y, point.color)
    })
}

function drawCoordinateAxes(scale) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;

    context.strokeStyle = '#fff';
    context.lineWidth = 1.5;


    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(graphCanvas.width, centerY);
    context.moveTo(centerX, 0);
    context.lineTo(centerX, graphCanvas.height);
    context.stroke();


    context.beginPath();
    context.moveTo(graphCanvas.width - 10, centerY - 5);
    context.lineTo(graphCanvas.width, centerY);
    context.lineTo(graphCanvas.width - 10, centerY + 5);
    context.moveTo(centerX - 5, 10);
    context.lineTo(centerX, 0);
    context.lineTo(centerX + 5, 10);
    context.stroke();
}

function drawMarkers(scale) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;

    context.fillStyle = '#fff';
    context.font = '12px Arial';

    for (let i = -5; i <= 5; i++) {
        if (i !== 0) {
            const x = centerX + i * scale;
            context.beginPath();
            context.moveTo(x, centerY - 5);
            context.lineTo(x, centerY + 5);
            context.stroke();
            context.textAlign = i === -5 ? 'left' : i === 5 ? 'right' : 'center';
            context.fillText(i.toString(), x, centerY + 15);

            const y = centerY - i * scale;
            context.beginPath();
            context.moveTo(centerX - 5, y);
            context.lineTo(centerX + 5, y);
            context.stroke();
            context.textBaseline = i === 5 ? 'top' : i === -5 ? 'bottom' : 'middle';
            context.fillText(i.toString(), centerX + 15, y);
        }
    }
}

function drawPoint(x, y, color) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    const pixelX = centerX + x * scale;
    const pixelY = centerY - y * scale;

    context.fillStyle = color;
    context.beginPath();
    context.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    context.fill();
}

function renderAllPoints(R) {
    const tableRows = document.querySelector('#resultsTable tbody').rows;

    if (!R) return;

    Array.from(tableRows).forEach(row => {
        const x = parseFloat(row.cells[0].innerText);
        const y = parseFloat(row.cells[1].innerText);
        const r = parseFloat(row.cells[2].innerText);
        const isHit = row.cells[3].innerText === 'Попадание';

        if (R === r) drawPoint(x, y, isHit);
    });
}


function adjustCanvas() {
    graphCanvas.width = graphCanvas.offsetWidth;
    graphCanvas.height = graphCanvas.offsetHeight;
    console.log(`Canvas resized to: ${graphCanvas.width}x${graphCanvas.height}`);
    renderGraph(0);
    renderAllPoints(0);
}

document.addEventListener('DOMContentLoaded', () => {
    adjustCanvas();
});

