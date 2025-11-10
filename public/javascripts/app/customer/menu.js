let txtFunction = null;
let funcs = ['search', 'schedule'];

function init() {
    txtFunction = document.getElementById('txtFunction');
    txtFunction.focus();
    txtFunction.addEventListener('keyup', menuKeyUp);
}

function menuSelect(func) {
    location.href = location.href.replace('menu', funcs[func-1]);
}

function menuKeyUp(e) {
    if (e.code == 'Enter') {
        const elt = document.getElementById('divFunctionError');
        const val = parseInt(txtFunction.value);
        if (val == NaN || (val != 1 && val != 2)) {
            showHideElement(elt,true);
        }
        else {
            showHideElement(elt, false);
            menuSelect(val);
        }
    }
}

function showHideElement(elt, show) {
    if (show) {
        elt.style.display = "";
    }
    else {
        elt.style.display = "none";
    }

}
document.addEventListener("DOMContentLoaded", init);
