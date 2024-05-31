// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Wait until the entire page is loaded
    window.addEventListener('load', function () {
        // Get the splash screen and main content elements
        var splashScreen = document.getElementById('splash-screen');
        var mainContent = document.getElementById('main-content');

        // Hide the splash screen and show the main content
        splashScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    });
});
