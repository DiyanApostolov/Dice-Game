'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');
const bntRules = document.querySelector('.btn--rules');
const btnCloseRules = document.querySelector('.close-modal');

let scores, currentScore, activePlayer, playing;
let wins = [0, 0];

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

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

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to the next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};

const holdScores = function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Checl if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .getElementById(`current--${activePlayer}`)
        .textContent = 0;
      if (activePlayer === 0) {
        wins[0] += 1;
        document.getElementById('wins--0')
        .textContent = `WINS: ${wins[0]}`;
        } else{
          wins[1] += 1;
        document.getElementById('wins--1')
        .textContent = `WINS: ${wins[1]}`;
        }
    } else {
      // Switch the next player
      switchPlayer();
    }
  }
};

const rules = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  playing = false;
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  if (scores[0] < 100 && scores[1] < 100) {
    playing = true;
  }
};

// Roling dice functionality
bntRoll.addEventListener('click', rollDice);
document.addEventListener('keyup', function (e) {
  if (e.key === 'q' || e.key === 'Q') {
    rollDice();
  }
});

// Hold button functionality
bntHold.addEventListener('click', holdScores);
document.addEventListener('keyup', function (e) {
  if (e.key === 's' || e.key === 'S') {
    holdScores();
  }
});

// New Game button functionality
bntNew.addEventListener('click', init);
document.addEventListener('keyup', function (e) {
  if (e.key === 'n' || e.key === 'N') {
    init();
  }
});

// Rules button functionality
bntRules.addEventListener('click', rules);
document.addEventListener('keydown', function (e) {
  if (e.key === 'r' || e.key === 'R') {
    rules();
  }
});

btnCloseRules.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
