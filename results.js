document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirect-button');

    function calculate() {
        let totalTime = localStorage.getItem('totalTime') / (1000 * 60);
        let totalWords = localStorage.getItem('totalChars') / 5;
        let WPM = totalWords / totalTime;

        console.log('WPM: ' +WPM);
    }

    calculate();

    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            location.replace('index.html');
        });
    }
});