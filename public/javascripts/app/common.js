const THEME_KEY = 'mp-theme';

let enableDisable = (containerId, enabled) => {
    const container = document.getElementById(containerId);
    const focusableElements = container.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((el) => {
        el.disabled = !enabled;
    });
};

function applyTheme(theme) {
    const next = theme === 'modern' ? 'modern' : 'classic';
    const classic = document.getElementById('theme-classic');
    const modern = document.getElementById('theme-modern');
    if (classic) classic.disabled = next === 'modern';
    if (modern) modern.disabled = next !== 'modern';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-theme-option') === next ? 'true' : 'false');
    });
    document.dispatchEvent(new CustomEvent('mp-theme-change', { detail: next }));
}

function initThemeSwitcher() {
    applyTheme(localStorage.getItem(THEME_KEY) || 'classic');
    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
        btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-option')));
    });
}

document.addEventListener('DOMContentLoaded', initThemeSwitcher);