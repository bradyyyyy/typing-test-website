document.addEventListener('DOMContentLoaded', (event) => {
    const typedText = document.getElementById('typed-text');
    const originalText = document.getElementById('text-to-type');
    let typingStarted = false;
    let initialTime = 0
    let endingTime = 0;
    let totalChars = 0;
    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;

    async function getText() {
        const url = "https://random-word-api.vercel.app/api?words=25";

        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const words = data.join (' ');

            originalText.innerText = words;
        }

        catch (error) {
            console.error('Error fetching words:', error);
            originalText.innerText = 'The quick brown fox jumped over the lazy moon.';
        }
    }

    getText();

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
                calculateAccuracy();
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

            let currentPosition = document.getElementById('typed-text').innerText.length;

            if (!ignoredKeys.includes(event.key)) {
                if (event.key == originalText.innerText[currentPosition]) {
                    correctKeystrokes++;
                }
                else {
                    incorrectKeystrokes++;
                }
            console.log('Character typed: ' +event.key + ' Character to compare to: ' +originalText.innerText[currentPosition]);
            console.log('Correct Keystrokes: ' +correctKeystrokes + ' Incorrect Keystrokes: ' +incorrectKeystrokes);
            }
        });

    calculateAccuracy();
    }
    
    function calculateAccuracy() {
        let accuracy = (correctKeystrokes / (correctKeystrokes + incorrectKeystrokes) * 100);
        localStorage.setItem('accuracy', accuracy);
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