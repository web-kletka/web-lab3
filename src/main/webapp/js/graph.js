const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

const R = 100;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const checkboxes = document.querySelectorAll(".checkR");
const resChecks = document.getElementById("resultCheckBox");
const dynamic_checked = document.querySelectorAll(".check_dynamic").item(0);

function decimalWithComplement(code) {
    let num = parseInt(code, 2);
    if (num >= 2 ** (code.length - 1)) {
        num = num - 2 ** code.length;
    }
    return num;
}


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        let res = ""
        checkboxes.forEach(cb => {
            if (cb.checked === true) {
                res += "1"
            }
            else {
                res += "0"
            }
        });
        console.log("BIN: " + res)
        let result = parseInt(decimalWithComplement(res))
        console.log("DEC: " + result)
        if (result <= 5 && result >= -5) {
            resChecks.textContent = result
            document.getElementById("myform:r").value = result;
            drawGraphic(result * 25)
            console.log("OK")
        }
        else {
            this.checked = !this.checked;
            console.log("BAD")
        }
    });
});


dynamic_checked.addEventListener('change', function (){
    checkboxes.forEach(checkbox => {
        checkbox.dispatchEvent(new Event('change'));
    });
})

window.addEventListener('load', () => {
    checkboxes.forEach(checkbox => {
        checkbox.dispatchEvent(new Event('change'));
    });
});

function drawGraphic(r){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#003366';
    ctx.fillRect(centerX, centerY - r, r / 2, r);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + r / 2, centerY);
    ctx.lineTo(centerX, centerY + r / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, Math.abs(r) / 2, (r < 0 ? 0 : 1) * Math.PI, r / Math.abs(r) * 1.5 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX + 5, 5);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 5, 5);

    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 5, centerY - 5)
    ctx.moveTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 5, centerY + 5)

    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';

    ctx.fillText('-1', centerX - R / 4 , centerY - 5);
    ctx.fillText('-2', centerX - R / 2, centerY - 5);
    ctx.fillText('-3', centerX - R / 4 * 3, centerY - 5);
    ctx.fillText('-4', centerX - R, centerY - 5);
    ctx.fillText('-5', centerX - (R + R / 4), centerY - 5);


    ctx.fillText('1', centerX + R / 4 , centerY - 5);
    ctx.fillText('2', centerX + R / 2, centerY - 5);
    ctx.fillText('3', centerX + R / 4 * 3, centerY - 5);
    ctx.fillText('4', centerX + R, centerY - 5);
    ctx.fillText('5', centerX + (R + R / 4), centerY - 5);

    ctx.fillText('x', canvas.width - 7, centerY - 10);

    ctx.fillText('-1', centerX + 5, centerY + R / 4);
    ctx.fillText('-2', centerX + 5, centerY + R / 2);
    ctx.fillText('-3', centerX + 5, centerY + R / 4 * 3);
    ctx.fillText('-4', centerX + 5, centerY + R);
    ctx.fillText('-5', centerX + 5, centerY + (R + R / 4));

    ctx.fillText('1', centerX + 5, centerY - R / 4);
    ctx.fillText('2', centerX + 5, centerY - R / 2);
    ctx.fillText('3', centerX + 5, centerY - R / 4 * 3);
    ctx.fillText('4', centerX + 5, centerY - R);
    ctx.fillText('5', centerX + 5, centerY - (R + R / 4));

    ctx.fillText('y', centerX + 10,  7);

    isDynamicChecked()
}

function isDynamicChecked(){
    if (dynamic_checked.checked) {
        points.forEach(point => {
            drawPoint(point.x, point.y, getColor(point.x, point.y, Number(resChecks.textContent)) ? "green" : "red");
        });
    }
    else{
        points.forEach(point => {
            drawPoint(point.x, point.y, point.color);
        });
    }
}

function drawPoint(graphX, graphY, color){

    console.log("draw POINT1", graphX, graphY, color, R)
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log("center", centerX, centerY, color)

    let x = centerX + graphX * R / 4;
    let y = centerY - graphY * R / 4;

    console.log("draw POINT2", x, y, color)

    ctx.arc(x, y,2,0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function getColor(x, y, r){
    let a = (Math.sign(r) * x > 0) && (Math.sign(r) * y > 0) && (Math.sign(r) * x <Math.sign(r) *  r / 2) && (Math.sign(r) * y < Math.sign(r) *  r);
    let b = (Math.sign(r) * x > 0) && (Math.sign(r) * y < 0) && (Math.sign(r) * y > Math.sign(r) * x - Math.abs(r) / 2);
    let c = (Math.sign(r) * x < 0) && (Math.sign(r) * y > 0) && ((r / 2) ** 2 > x ** 2 + y ** 2);
    return a || b || c;
}

