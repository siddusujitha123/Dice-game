'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Game state
let scores, currentScore, activePlayer, playing;

// Initialization function
const init = () => {
  scores = [0, 0]; // Total scores
  currentScore = 0; // Current round score
  activePlayer = 0; // 0 for Player 0, 1 for Player 1
  playing = true;   // Game state

  // Reset UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switch Player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active player class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice Button
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Hold Button
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;

    // 2. Update UI
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 3. Check if player won
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// New Game Button
btnNew.addEventListener('click', init);