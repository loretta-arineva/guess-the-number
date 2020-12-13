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
const numBtn = document.querySelector("#num-btn");
const inp = document.querySelector("#num-guess");
const mysteryNum = document.querySelector(".mystery-num");
const body = document.querySelector("body");
const displayFeedack = document.querySelector(".display-feedback");
const revealBtn = document.querySelector("#reveal");
const score = document.querySelector("#score");
const highscore = document.querySelector("#highscore");
let guesses = 0;
let highestScore = 0;

function genRandNum() {
  return Math.floor(Math.random() * 20) + 1;
};

let randNum = genRandNum();

function reset() {
  randNum = genRandNum();
  console.log(randNum);
  inp.value = "";
  body.classList.remove("win-body");
  inp.classList.remove("win-text");
  mysteryNum.classList.remove("win-text");
  numBtn.innerHTML = "Check!";
  inp.removeAttribute("disabled", "disabled");
  displayFeedack.innerHTML = "Guess The Number!";
  mysteryNum.innerHTML = "?";

}

console.log(randNum);

function checkAnswer() {
  let usrNum = +inp.value;
  if (usrNum === randNum && numBtn.innerHTML === "Check!") {
    mysteryNum.innerHTML = randNum;
    body.classList.add("win-body");
    inp.classList.add("win-text");
    mysteryNum.classList.add("win-text");
    displayFeedack.innerHTML = "Correct!";
    inp.setAttribute("disabled", "disabled");
    displayFeedack.style.color = "white";
    numBtn.innerHTML = "Play again?";
    guesses++;
    score.innerHTML = guesses;

  } else if (usrNum !== randNum) {
    displayFeedack.classList.remove("incorrectDisplay");

    void displayFeedack.offsetWidth;
    displayFeedack.classList.add("incorrectDisplay");
    displayFeedack.innerHTML = "Try again";
    displayFeedack.style.color = "red";

  } else if (numBtn.innerHTML === "Play again?") {
    reset();
  }

}
numBtn.addEventListener("click", checkAnswer);
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});