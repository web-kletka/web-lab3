
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;

    const mouseY = event.clientY - rect.top;

    console.log("mouse: ", mouseX, mouseX)

    let graphX = mouseX - centerX;
    let graphY = centerY - mouseY;

    console.log('Координаты клика:', graphX, graphY);

    graphX = graphX * 4 / R;
    graphY = graphY * 4 / R;

    console.log('Координаты клика:', graphX, graphY);

    document.getElementById('myform:x').value = graphX.toFixed(5);
    document.getElementById('myform:y').value = graphY.toFixed(5);

    document.getElementById("myform:responseButton").click()

});


