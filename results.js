document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirect-button');

    function calculate() {
        let totalTime = localStorage.getItem('totalTime') / (1000 * 60);
        let totalWords = localStorage.getItem('totalChars') / 5;
        let accuracy = localStorage.getItem('accuracy');
        let WPM = totalWords / totalTime;
        let adjustedWPM = WPM * (accuracy / 100);

        console.log('WPM: ' +WPM +' Accuracy: ' +accuracy +'%');
        console.log('Adjusted WPM: ' +adjustedWPM);
    }

    calculate();

    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            location.replace('index.html');
        });
    }
});