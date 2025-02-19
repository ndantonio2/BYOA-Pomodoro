const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');

let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let timerInterval;
let isWorkMode = true;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title if timer is running
    if (isRunning) {
        document.title = `(${timeString}) ${isWorkMode ? 'Work' : 'Rest'} Timer`;
    } else {
        document.title = 'Pomodoro Timer';
    }
}

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.add('pause');
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startPauseButton.textContent = 'Start';
                startPauseButton.classList.remove('pause');
            }
        }, 1000);
    } else {
        isRunning = false;
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('pause');
        clearInterval(timerInterval);
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60; // Use current mode to determine reset time
    updateDisplay();
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});

modeToggleButton.addEventListener('click', () => {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    modeToggleButton.classList.toggle('rest');
    
    // Reset timer state
    isRunning = false;
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    updateDisplay();
    document.querySelector('.mode-label').textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
});

// Initialize display
updateDisplay();

// Add window blur/focus handlers
window.addEventListener('blur', () => {
    if (isRunning) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.title = `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}) ${isWorkMode ? 'Work' : 'Rest'} Timer`;
    }
});

window.addEventListener('focus', () => {
    if (!isRunning) {
        document.title = 'Pomodoro Timer';
    }
});

// Remove or comment out this line at the bottom of the file:
// modeToggleButton.textContent = 'Rest Mode'; 