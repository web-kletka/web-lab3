canvas.addEventListener('click', function(event) {

    const r = Number(document.getElementById("resultCheckBox").textContent);
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left; // Координата X мыши

    const mouseY = event.clientY - rect.top;  // Координата Y мыши

    // Преобразование координат
    let graphX = mouseX - centerX; // Относительно центра графика
    let graphY = centerY - mouseY; // Инвертируем Y координату

    console.log('Координаты клика:', graphX, graphY);

    let x = centerX + graphX;
    let y = centerY - graphY;

    // drawPoint(x, y, "red")

    console.log('r, R:', r, R);

    graphX = graphX * (r / R);
    graphY = graphY * (r / R);

    console.log('Координаты клика:', graphX, graphY);

    document.getElementById('myform:x').value = graphX.toFixed(5);
    document.getElementById('myform:y').value = graphY.toFixed(5);


});


