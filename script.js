'use strict';

// - Generate a random number
// - Store random number
// - Get button to compare values
// - Check if input value === guessed number
// - Each time check is clicked delete input value
// - Update score
// - Keep track of highest score
// - Reset button generates new number
// If num is correct, change bg and mystery num output

// Is highscore num of attempts?
// User picks range?
const modeBtn = document.querySelector("#mode");
const modeOutput = document.querySelector(".mode");
const displayFeedback = document.querySelector(".display-feedback");
const inp = document.querySelector("#num-guess");
const numBtn = document.querySelector("#num-btn");
const mysteryNum = document.querySelector(".mystery-num");
const body = document.querySelector("body");
const score = document.querySelector("#score");
const highscore = document.querySelector("#highscore");
const guessOutput = document.querySelector(".guess-output");
let usrNum;
let highscoreVal;

let guesses = 0;
let highestScore = 0;


function genRandNum(num) {
  return Math.floor(Math.random() * num) + 1;
};
// Genereta random number from the beginning
let randNum = genRandNum(20);

console.log(randNum);

// Reset
function reset(num) {
  // Generate new number
  randNum = genRandNum(num);
  console.log(randNum);

  // Reset all values
  body.classList.remove("win-body");
  inp.classList.remove("win-text");
  mysteryNum.classList.remove("win-text");
  inp.removeAttribute("disabled", "disabled");

  guesses = 0;
  inp.value = "";
  score.innerHTML = 0;
  mysteryNum.innerHTML = "?";
  numBtn.innerHTML = "Check!";
  guessOutput.innerHTML = "Start guessing...";
  displayFeedback.innerHTML = "Guess The Number!";
}


// Guess Feedback
function updateOutput(usrNum, randNum, guessOutput) {
  if (usrNum < randNum) {
    guessOutput.innerHTML = "Guess too low...";
  } else if (usrNum > randNum) {
    guessOutput.innerHTML = "Guess too high...";
  } else {
    guessOutput.innerHTML = "Yes!";
  }
}

function correctGuess(mysteryNum, randNum, inp, displayFeedback, numBtn) {
  mysteryNum.innerHTML = randNum;
  body.classList.add("win-body");
  inp.classList.add("win-text");
  mysteryNum.classList.add("win-text");
  displayFeedback.innerHTML = "Correct!";
  inp.setAttribute("disabled", "disabled");
  displayFeedback.style.color = "white";
  numBtn.innerHTML = "Play again?";
}

// Check if answer is correct
function isCorrect(usrNum, randNum, numBtn, mysteryNum,
  inp, displayFeedback, highscoreVal, guesses) {

  // If user guessed right
  if (usrNum === randNum && numBtn.innerHTML === "Check!") {
    correctGuess(mysteryNum, randNum, inp, displayFeedback, numBtn);

    if (highscoreVal > guesses) {
      highscore.innerHTML = guesses;
    } else if (highscoreVal === 0) {
      highscore.innerHTML = guesses;
    }

  } else if (usrNum !== randNum) { // if user did not guess right
    displayFeedback.classList.remove("incorrectDisplay");

    void displayFeedback.offsetWidth;
    displayFeedback.classList.add("incorrectDisplay");
    displayFeedback.innerHTML = "Try again";
    displayFeedback.style.color = "red";

  } else if (numBtn.innerHTML === "Play again?") { //if user wants to play again
    if (modeBtn.innerHTML === "Easy!") {
      reset(50);
    } else {
      reset(20);
    }
  }
}

function checkAnswer() {
  // Track score
  guesses++;
  score.innerHTML = guesses;
  highscoreVal = +highscore.innerHTML;

  // Get user input and highscore
  usrNum = +inp.value;

  // Update feedback
  updateOutput(usrNum, randNum, guessOutput);

  // Check if number is correct
  isCorrect(usrNum, randNum, numBtn, mysteryNum,
    inp, displayFeedback, highscoreVal, guesses);
}

// Test user answer on pressing enter
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// Test user answer on button click
numBtn.addEventListener("click", checkAnswer);

modeBtn.addEventListener("click", function() {
  if (modeBtn.innerHTML === "Easy!") {
    modeBtn.innerHTML = "Hard!";
    console.log(randNum);
    modeOutput.innerHTML = "50";
    reset(50);
  } else {
    modeBtn.innerHTML = "Easy!";
    console.log(randNum);
    modeOutput.innerHTML = "20";
    reset(20);
  }
});