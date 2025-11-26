"use strict";

// Elements
const player0El = document.querySelector("#player-0");
const player1El = document.querySelector("#player-1");
const playerName0El = document.querySelector("#player__name-0");
const playerName1El = document.querySelector("#player__name-1");
const diceImageEl = document.querySelector(".dice-image");
const currentPlayer0El = document.querySelector("#player-current-0");
const currentPlayer1El = document.querySelector("#player-current-1");
const player0ScoreEl = document.querySelector("#player__score-0");
const player1ScoreEl = document.querySelector("#player__score-1");
const btnNew = document.querySelector(".btn__new");
const btnDice = document.querySelector(".btn__dice");
const btnHold = document.querySelector(".btn__hold");

// Variables
let isPlaying = true;
let currentScore = 0;
let activePlayer = 0;
let totalScores = [0, 0];

// Functions
const switchPlayers = function () {
  currentScore = 0;
  document.querySelector(`#player-current-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`#player-current-${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Removing Dice image from the start
diceImageEl.classList.add("hidden");

// Add logic to roll dice button
btnDice.addEventListener("click", function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceImageEl.src = `images/dice-${dice}.png`;
    diceImageEl.classList.remove("hidden");

    // When it's not equal to 1
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.querySelector(`#player-current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

// Add logic to hold button
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    diceImageEl.classList.add("hidden");
    totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
    document.querySelector(`#player__score-${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      document
        .querySelector(`#player-${activePlayer}`)
        .classList.add("player--winner");
      currentScore = 0;
      document.querySelector(`#player-current-${activePlayer}`).textContent = 0;
      isPlaying = false;
    } else {
      switchPlayers();
    }
  }
});

// Add logic to new game button
btnNew.addEventListener("click", function () {
  activePlayer = 0;
  diceImageEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  currentScore = 0;
  totalScores = [0, 0];
  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;
  isPlaying = true;
});
