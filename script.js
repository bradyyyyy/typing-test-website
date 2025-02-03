document.addEventListener('DOMContentLoaded', (event) => {

    const hiddenInput = document.getElementById('hidden-input');
    const originalText = document.getElementById('text-to-type');
    
    let targetText = "";
    let typingStarted = false;
    let initialTime = 0;
    let endingTime = 0;
    let totalChars = 0;
    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
  
    async function getText() {
      const url = "https://random-word-api.vercel.app/api?words=6";
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const words = data.join(' ');
        originalText.innerText = words;
      } catch (error) {
        console.error('Error fetching words:', error);
        originalText.innerText = 'The quick brown fox jumped over the lazy moon.';
      }
      splitTextToSpans();
    }
  
    function splitTextToSpans() {
      targetText = originalText.textContent.trim();
      originalText.textContent = '';
      for (let char of targetText) {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('pending');
        originalText.appendChild(span);
      }
    }
  
    getText();
  
    if (hiddenInput) {
      hiddenInput.addEventListener('input', () => {

        if (!typingStarted) {
          initialTime = new Date();
          typingStarted = true;
          console.log('Typing started at: ' + initialTime);
        }
        
        const inputValue = hiddenInput.value;
        const spans = originalText.querySelectorAll('span');
  
        spans.forEach((span, index) => {
          const char = inputValue[index];
          if (char == null) {

            span.classList.remove('correct', 'incorrect');
            span.classList.add('pending');
          } else if (char === span.textContent) {

            span.classList.add('correct');
            span.classList.remove('incorrect', 'pending');
          } else {

            span.classList.add('incorrect');
            span.classList.remove('correct', 'pending');
          }
        });

        const currentIndex = inputValue.length;
        spans.forEach(span => span.classList.remove('cursor'));
        if (currentIndex < spans.length) {
            spans[currentIndex].classList.add('cursor');
        }
  
        let maxLength = targetText.length;
        let currentLength = inputValue.length;
        console.log('currentLength: ' + currentLength);
        if (currentLength === maxLength) {
          endingTime = new Date();
          console.log('Typing finished at: ' + endingTime);
          calculateAccuracy();
          showResults();
        }
      });
    }
  
    if (hiddenInput) {
      hiddenInput.addEventListener('keydown', (event) => {
        const ignoredKeys = [
          'Backspace', 'Shift', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown',
          'ArrowLeft', 'ArrowRight', 'Escape', 'CapsLock', 'Tab', 'Enter', 'Delete'
        ];
  
        if (!ignoredKeys.includes(event.key)) {
          totalChars += 1;
          console.log('Total chars typed: ' + totalChars);
          localStorage.setItem('totalChars', totalChars);
        }
  
        let currentPosition = hiddenInput.value.length;
        if (!ignoredKeys.includes(event.key)) {
          if (event.key === targetText[currentPosition]) {
            correctKeystrokes++;
          } else {
            incorrectKeystrokes++;
          }
          console.log('Character typed: ' + event.key + ' | Expected: ' + targetText[currentPosition]);
          console.log('Correct Keystrokes: ' + correctKeystrokes + ' | Incorrect Keystrokes: ' + incorrectKeystrokes);
        }
        calculateAccuracy();
      });
    }
  
    function calculateAccuracy() {
      let accuracy = (correctKeystrokes / (correctKeystrokes + incorrectKeystrokes)) * 100;
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
  