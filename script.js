const typedText = document.getElementById('typed-text');
const redirectButton = document.getElementById('redirect-button');
let typingStarted = false;
let initialTime, endingTime;
var count = 0;

typedText.addEventListener('keydown', (event) => {
    console.log('Key: ' +event.key);

    if (!typingStarted) {
        initialTime = new Date();
        typingStarted = true;
        console.log('Typing started at: ' + initialTime);
    }

    let maxLength = document.getElementById('text-to-type').innerText.length;
    let currentLength = document.getElementById('typed-text').innerText.length; 

    console.log('currentLength:' +currentLength);
    if (currentLength == maxLength-1) {
        endingTime = new Date();
        console.log('Typing finished at: ' + endingTime);
        showResults();
    }
        
});

function showResults () {
    location.replace('result.html')
}

redirectButton.addEventListener('click', () => {
    location.replace('index.html');
});
