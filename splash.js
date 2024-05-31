// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Get the splash screen and main content elements
    var splashScreen = document.getElementById('splash-screen');
    var mainContent = document.getElementById('main-content');

    // Hide the splash screen and show the main content after 5 seconds
    setTimeout(function () {
        splashScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 5000); // 5000 milliseconds = 5 seconds
});
