'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

const cureent0El = document.querySelector('#current--0')
const cureent1El = document.querySelector('#current--1')

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const initial = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    cureent0El.textContent = 0;
    cureent1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
};

initial();

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');
        diceEl.src = `assets/Dice-${dice}.png`;

        if (dice !== 1) {
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {

            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', function () {
    initial();
});