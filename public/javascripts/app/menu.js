let txtFunction = null;
const funcs = ['/customer/search', '/schedule', '', '', '', '', '', '', '/admin'];

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

    document.querySelector('.menu-list').addEventListener('click', (e) => {
        const item = e.target.closest('[data-menu-fn]');
        if (!item) return;
        menuSelect(parseInt(item.dataset.menuFn, 10));
    });

    syncMenuForTheme(currentTheme());
    document.addEventListener('mp-theme-change', (e) => syncMenuForTheme(e.detail));
}

function menuSelect(func) {
    const path = funcs[func - 1];
    if (!path) return;
    location.href = location.href.replace('/menu', path);
}

function menuKeyUp(e) {
    if (e.code !== 'Enter') return;
    const elt = document.getElementById('divFunctionError');
    const val = parseInt(txtFunction.value, 10);
    if (Number.isNaN(val) || (val !== 1 && val !== 2 && val !== 9)) {
        elt.classList.remove('hidden');
    } else {
        elt.classList.add('hidden');
        menuSelect(val);
    }
}

document.addEventListener('DOMContentLoaded', init);
