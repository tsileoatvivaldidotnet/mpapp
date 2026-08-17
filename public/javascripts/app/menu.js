let txtFunction = null;
let funcs = ['/customer/search', '/schedule', '', '', '', '', '', '', '/admin'];

function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'classic';
}

function syncMenuForTheme(theme) {
    if (!txtFunction) return;
    if (theme === 'modern') {
        if (document.activeElement === txtFunction) txtFunction.blur();
    } else {
        txtFunction.focus();
    }
}

function init() {
    txtFunction = document.getElementById('txtFunction');
    txtFunction.addEventListener('keyup', menuKeyUp);
    syncMenuForTheme(currentTheme());
    document.addEventListener('mp-theme-change', (e) => syncMenuForTheme(e.detail));
}

function menuSelect(func) {
    location.href = location.href.replace('/menu', funcs[func-1]);
}

function menuKeyUp(e) {
    if (e.code == 'Enter') {
        const elt = document.getElementById('divFunctionError');
        const val = parseInt(txtFunction.value);
        if (Number.isNaN(val) || (val != 1 && val != 2 && val != 9)) {
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
