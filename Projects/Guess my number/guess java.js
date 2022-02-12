'use strict'


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

let displayMessage = function (message) {
    document.querySelector('.start-guess').textContent = message
};


document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.box').value);
    console.log(guess, typeof guess);

    if (!guess) {
        // document.querySelector('.start-guess').textContent = 'No number!';
        displayMessage('No number!')
    } else if (guess === secretNumber) {
        // document.querySelector('.start-guess').textContent = 'Correct number!';
        displayMessage('Correct number!');
        document.querySelector('body').style.backgroundColor = '#1aff00';
        document.querySelector('.question').textContent = secretNumber;

        document.querySelector('.question').style.padding = '10px 50px';

        if (score > highscore) {
            highscore = score;
            document.querySelector('.high-score').textContent = highscore;
        }
    }



    // Larger cpde to understand the concept //

    //     } else if (guess > secretNumber) {
    //         if (score > 1) {
    //             document.querySelector('.start-guess').textContent = 'Number is too high!';
    //             score--;
    //             document.querySelector('.score').textContent = score;
    //         } else {
    //             document.querySelector('.start-guess').textContent = 'You lost the game!';
    //             document.querySelector('.score').textContent = 0;
    //         }
    //     } else if (guess < secretNumber) {
    //         if (score > 1) {
    //             document.querySelector('.start-guess').textContent = 'Number is too low!';
    //             score--;
    //             document.querySelector('.score').textContent = score;
    //         } else {
    //             document.querySelector('.start-guess').textContent = 'You lost the game!';
    //             document.querySelector('.score').textContent = 0;
    //         }
    //     }
    // });


    // short code for when guessing is wrong//

    else if (guess !== secretNumber) {
        if (score > 1)
            // document.querySelector('.start-guess').textContent = guess > secretNumber ? 'Number is  too high' : 'Number is too low';
            displayMessage(guess > secretNumber ? 'Number is  too high' : 'Number is too low');
        score--;

        document.querySelector('.score').textContent = score;
    } else {
        // document.querySelector('.start-guess').textContent = 'You lost';
        displayMessage('You lost the game!');
        document.querySelector('.score').textContent = 0;
    }
});


document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    // document.querySelector('.start-guess').textContent = 'Start guessing...';
    displayMessage('Start guessing...')
    document.querySelector('.score').textContent = score;
    document.querySelector('.question').textContent = '?';
    document.querySelector('.box').value = '';

    document.querySelector('body').style.backgroundColor = 'grey';
    document.querySelector('.question').style.padding = '10px 25px';

});