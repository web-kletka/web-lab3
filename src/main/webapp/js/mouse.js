
graphCanvas.addEventListener('click', event => {
    const errorElements = ['yError', 'xError', 'rError', 'notError'];
    errorElements.forEach(id => document.getElementById(id).textContent = '');

    const radius = document.getElementById("form:hidden-r").value
    if (!radius) {
        document.getElementById('notError').textContent = 'Выберите значение R перед взаимодействием с графиком';
        return;
    }

    const rect = graphCanvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    const graphX = Math.round((clickX - centerX) / scale);
    const graphY = (centerY - clickY) / scale;

    document.getElementById("form:y").value = graphY
    document.getElementById("form:x").value = graphX

    document.getElementById("form:check-button").click()
});
