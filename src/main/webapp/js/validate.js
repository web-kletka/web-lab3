


function validateForm(){
    document.getElementById("yError").textContent = "";
    document.getElementById("xError").textContent = "";
    document.getElementById("rError").textContent = "";
    document.getElementById("notError").textContent = "";

    const yValue = parseFloat(document.getElementById("form:y").value.replace(',', '.'));
    const rValue = document.getElementById("form:hidden-r").value;
    const xValue = document.getElementById("form:x").value;

    let isValid = true;

    if (isNaN(yValue) || yValue < -3 || yValue > 3) {
        document.getElementById("yError").textContent = "Введите корректное значение Y∊[-5;5]";
        isValid = false;
    }

    if (xValue === null || xValue < -5 || xValue > 5) {
        document.getElementById("xError").textContent = "Укажите корректное значение X∊[-5;5]";
        isValid = false;
    }
    console.log(rValue)
    if (isNaN(rValue) || Number(rValue) < 1 || Number(rValue) > 5) {
        document.getElementById("rError").textContent = "Укажите корректное значение R∊[1;5]";
        isValid = false;
    }

    return isValid;
}


