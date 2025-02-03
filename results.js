document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirect-button');
    const wpmResult = document.getElementById('wpm');
    const accuracyResult = document.getElementById('accuracy');
    const adjustedWPMResult = document.getElementById('adjustedWPM');

    function calculate() {
        let totalTime = localStorage.getItem('totalTime') / (1000 * 60);
        let totalWords = localStorage.getItem('totalChars') / 5;
        let accuracy = parseFloat(localStorage.getItem('accuracy'));
        let WPM = totalWords / totalTime;
        let adjustedWPM = WPM * (accuracy / 100);

        console.log('WPM: ' +WPM +' Accuracy: ' +accuracy +'%');
        console.log('Adjusted WPM: ' +adjustedWPM);

        wpmResult.textContent = 'WPM: ' +WPM.toFixed(2);
        accuracyResult.textContent = 'Accuracy: ' +accuracy.toFixed(2) +'%';
        adjustedWPMResult.textContent = 'Adjusted WPM: ' +adjustedWPM.toFixed(2);
    }

    calculate();

    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            location.replace('index.html');
        });
    }
});