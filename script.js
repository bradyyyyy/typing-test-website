document.addEventListener('DOMContentLoaded', (event) => {
    const typedText = document.getElementById('typed-text');
    let typingStarted = false;
    let initialTime = 0
    let endingTime = 0;
    let totalChars = 0;

    if (typedText) {
        typedText.addEventListener('input', (event) => {

            if (!typingStarted) {
                initialTime = new Date();
                typingStarted = true;
                console.log('Typing started at: ' + initialTime);
            }

            let maxLength = document.getElementById('text-to-type').innerText.length;
            let currentLength = document.getElementById('typed-text').innerText.length;

            console.log('currentLength:' + currentLength);
            if (currentLength == maxLength) {
                endingTime = new Date();
                console.log('Typing finished at: ' + endingTime);
                showResults();
            }
        });
    }

    if (typedText) {
        typedText.addEventListener('keydown', (event) => {
            const ignoredKeys = [
                'Backspace', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown',
                'ArrowLeft', 'ArrowRight', 'Escape', 'CapsLock', 'Tab', 'Enter', 'Delete'
            ];

            if (!ignoredKeys.includes(event.key)) {
                totalChars += 1;
                console.log('Total chars typed: ' +totalChars);
                localStorage.setItem('totalChars', totalChars);
            }
        });
    }

    function calculateTime() {
        let totalTime = endingTime - initialTime;
        localStorage.setItem('totalTime', totalTime);
    }

    function showResults() {
        calculateTime();
        location.replace('result.html');
    }
});