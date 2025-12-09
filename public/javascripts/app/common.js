let enableDisable = (containerId, enabled) => {
    const container = document.getElementById(containerId);
    const focusableElements = container.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // Disable tabbing for each found element
    focusableElements.forEach((el) => {
        el.disabled = !enabled;
    });
};