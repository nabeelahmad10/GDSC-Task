const WORK_DURATION = 25;

const display = document.getElementById('display');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resumeTimerBtn = document.getElementById('resume-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');
const customTimeInput = document.getElementById('custom-time');
const sessionCountSpan = document.getElementById('session-count');
const seasonCompleted = document.getElementById('season-completed');

let minutes = parseInt(customTimeInput.value) || WORK_DURATION; 
let seconds = 0;
let isRunning = false;
let intervalId;

function updateDisplay() {
  display.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

function decrementTime() {
  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }
  updateDisplay();
  if (minutes === 0 && seconds === 0) {
    clearInterval(intervalId);
    display.textContent = 'Time Out!';
    handleTimerCompletion();
  }
}

function handleTimerCompletion() {
  sessionCountSpan.textContent = parseInt(sessionCountSpan.textContent) + 1; 
  checkForSeasonCompletion();
  seasonCompleted.style.display = 'block'; 
}

function checkForSeasonCompletion() {
  if (parseInt(sessionCountSpan.textContent) >= 4) {
    seasonCompleted.style.display = 'block';
  }
}

startTimerBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    resumeTimerBtn.disabled = true; 
    minutes = parseInt(customTimeInput.value) || WORK_DURATION; 
    updateDisplay();
    intervalId = setInterval(decrementTime, 1000);
  }
});

pauseTimerBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    pauseTimerBtn.disabled = true;
    resumeTimerBtn.disabled = false; 
    clearInterval(intervalId);
  }
});

resumeTimerBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    pauseTimerBtn.disabled = false;
    resumeTimerBtn.disabled = true; 
    intervalId = setInterval(decrementTime, 1000);
  }
});

resetTimerBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(intervalId);
  minutes = parseInt(customTimeInput.value) || WORK_DURATION; 
  seconds = 0;
  updateDisplay();
  progress.style.width = '0%';
  seasonCompleted.style.display = 'none'; 
 
  startTimerBtn.disabled = false;
  pauseTimerBtn.disabled = true; 
  resumeTimerBtn.disabled = true; 
});

shortBreakBtn.addEventListener('click', () => {
  minutes = 5;
  seconds = 0;
  updateDisplay();
});

longBreakBtn.addEventListener('click', () => {
  minutes = 15;
  seconds = 0;
  updateDisplay();
});
