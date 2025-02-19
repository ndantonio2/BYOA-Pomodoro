const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');
const focusPrompt = document.getElementById('focusPrompt');
const focusInput = document.getElementById('focusInput');
const focusSubmit = document.getElementById('focusSubmit');
const focusDisplay = document.getElementById('focusDisplay');
const focusText = document.getElementById('focusText');

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

function showFocusPrompt() {
    focusPrompt.style.display = 'flex';
    focusInput.focus();
}

function hideFocusPrompt() {
    focusPrompt.style.display = 'none';
}

function setFocus(focus) {
    focusText.textContent = focus;
    focusDisplay.classList.remove('hidden');
    hideFocusPrompt();
}

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        if (isWorkMode && !focusText.textContent) {
            showFocusPrompt();
            return;
        }
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
    focusText.textContent = '';
    focusDisplay.classList.add('hidden');
    focusInput.value = '';
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
    document.querySelector('.mode-label').textContent = isWorkMode ? 'Work' : 'Rest';
    focusText.textContent = '';
    focusDisplay.classList.add('hidden');
    focusInput.value = '';
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

// Add new event listener
focusSubmit.addEventListener('click', () => {
    const focus = focusInput.value.trim();
    if (focus) {
        setFocus(focus);
        // Start the timer
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
    }
});

// Remove or comment out this line at the bottom of the file:
// modeToggleButton.textContent = 'Rest Mode'; 