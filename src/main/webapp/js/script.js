validate = (params) => {
    let x = params.get("x");
    let y = params.get("y");
    let r = params.get("r");
    let result = "";
    console.log(x, y, r);

    if (x == null) {
        result = "ERROR: x = null";
        console.log("ERROR: x = null");
    }
    if (y === '') {
        result = "ERROR: y = ''";
        console.log("ERROR: y = ''");
    }
    console.log(y, typeof y, Number.isNaN(y))
    if (Number.isNaN(Number(y))) {
        result = "ERROR: y not num";
        console.log("ERROR: y not num");
    }
    if (r == null) {
        result = "ERROR: r = null";
    }
    if (result === "")
        return true;
    else {
        outputText.hidden = false
        outputText.textContent = result;
        return false;
    }
}



