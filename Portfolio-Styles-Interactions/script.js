document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleButtons = document.querySelectorAll('.theme-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            body.className = ''; // Clear existing classes
            body.classList.add(theme); // Add the selected theme class
        });
    });
});