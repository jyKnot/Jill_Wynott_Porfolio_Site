document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5; // Increase progress slower
        loadingText.textContent = `${progress}%`;

        if (progress >= 100) { // Ensure it stops at 100
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.transition = 'opacity 1s ease';
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 2000); // Wait for the fade-out transition to complete
            }, 800); // Pause briefly at 100%
        }
    }, 35); // Slightly increase interval duration

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
            const themeClass = button.getAttribute('data-theme');
            document.body.classList.add(themeClass);
        });
    });
});