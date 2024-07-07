document.addEventListener('DOMContentLoaded', (event) => {
    const typedText = document.getElementById('typed-text');
    const redirectButton = document.getElementById('redirect-button');
    let typingStarted = false;
    let initialTime, endingTime;

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

        typedText.addEventListener('keydown', (event) => {
            console.log('Key: ' + event.key);
        });
    }

    function calculateTime() {
        console.log('Testing');
    }

    function showResults() {
        location.replace('result.html');
        calculateTime();
    }

    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            location.replace('index.html');
        });
    }
});