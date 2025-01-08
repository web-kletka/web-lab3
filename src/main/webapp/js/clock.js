const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;

ctx.translate(centerX, centerX);

const maxClockRadius = centerX * 0.9;

function updateClock() {
    clearCanvas();
    renderClockFace(maxClockRadius);
    renderClockNumbers(maxClockRadius);
    renderClockHands(maxClockRadius);
}

function clearCanvas() {
    const fullSize = canvas.width * 2;
    ctx.clearRect(-fullSize / 2, -fullSize / 2, fullSize, fullSize);
}

function renderClockFace(radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Центральная точка
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function renderClockNumbers(radius) {
    const fontSize = radius * 0.15;
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';

    for (let i = 1; i <= 12; i++) {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const x = radius * 0.85 * Math.cos(angle);
        const y = radius * 0.85 * Math.sin(angle);
        ctx.fillText(i.toString(), x, y);
    }
}

function renderClockHands(radius) {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Углы для стрелок
    const hourAngle = (hours * Math.PI) / 6 + (minutes * Math.PI) / 360;
    const minuteAngle = (minutes * Math.PI) / 30 + (seconds * Math.PI) / 1800;
    const secondAngle = (seconds * Math.PI) / 30;

    drawHand(hourAngle, radius * 0.5, radius * 0.05);
    drawHand(minuteAngle, radius * 0.7, radius * 0.04);
    drawHand(secondAngle, radius * 0.85, radius * 0.02, '#aa99c1');
}

function drawHand(angle, length, width, color = '#cb00c1') {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.restore();
}

setInterval(updateClock, 1000);
updateClock();

const dateElement = document.getElementById("date");
dateElement.textContent = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
});
