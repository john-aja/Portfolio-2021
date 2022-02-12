'use strict'


const account1 = {
    owner: 'John Ram',
    transactions: [200, 1520, -582, 1258, -551, 3000, 1170, -330],
    interestRate: 1.2,
    pin: 1111,

    transactionsDates: [
        '2019-01-28T09:15:04.904Z',
        '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z',
        '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z',
        '2020-03-12T10:51:36.790Z',
    ],
    currency: 'USD',
    locale: 'en-US',

};

const account2 = {
    owner: 'Ram Jon',
    transactions: [1258, -580, 1697, -20, -335, 1550, 1900, 780],
    interestRate: 1.5,
    pin: 2222,

    transactionsDates: [
        '2019-02-25T14:18:46.235Z',
        '2019-02-05T16:33:06.386Z',
        '2019-03-10T14:43:26.374Z',
        '2019-04-25T18:49:59.371Z',
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2021-09-29T12:01:20.894Z',
    ],
    currency: 'INR',
    locale: 'en-IN',

};

const accounts = [account1, account2];

const labelWelcome = document.querySelector('.greet');
const labelDate = document.querySelector('.current-date');
const labelBalance = document.querySelector('.amount');
const labelSumIn = document.querySelector('.summary-1')
const labelSumOut = document.querySelector('.summary-2');
const labelInterest = document.querySelector('.summary-3');
const labelTimer = document.querySelector('.time');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.transactions');
const btnLogin = document.querySelector('.enter');
const btnTransfer = document.querySelector('.btn-transfer-to');
const btnLoan = document.querySelector('.btn-loan');
const btnClose = document.querySelector('.btn-close');
const btnSort = document.querySelector('.btn-sort');
const inputLoginUsername = document.querySelector('.username');
const inputLoginPin = document.querySelector('.login-pin');
const inputTransferTo = document.querySelector('.input-transfer-to');
const inputTransferAmount = document.querySelector('.input-transfer-amount');
const inputLoanAmount = document.querySelector('.input-loan');
const inputCloseUsername = document.querySelector('.close-user');
const inputClosePin = document.querySelector('.close-pin');


//  time stamp //

const formatDate = function (transDate, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

    const daysPassed = calcDaysPassed(new Date(), transDate);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`
    else {
        // const day = `${transDate.getDate()}`.padStart(2, 0);
        // const month = `${transDate.getMonth()}`.padStart(2, 0);
        // const year = transDate.getFullYear();
        return new Intl.DateTimeFormat(locale).format(transDate);
    }
}

// currency //

const formatCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}


//  displaying transactions //

const displayMovements = function (acc, sort = false) {

    containerMovements.innerHTML = '';


    //  Sorting transactions // Sort button f() //
    const trans = sort ? acc.transactions.slice().sort((a, b) => a - b) : acc.transactions;

    trans.forEach(function (tran, i) {
        const type = tran > 0 ? 'deposit' : 'withdrawal';

        // displaying date and currency for transactions //

        const transDate = new Date(acc.transactionsDates[i])
        const displayDate = formatDate(transDate, acc.locale)

        const formattedTrans = formatCurrency(tran, acc.locale, acc.currency);


        // displaying transactions //

        const html = `<div class="transactions">
        <div class="transaction type-${type}">${i + 1} ${type}</div>
        <div class="date">  ${displayDate} </div>
        <div class="transacted">${formattedTrans}</div>
    </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};



// Displaying balance //

const calcDisplayBalance = function (acc) {
    const balance = acc.transactions.reduce((acc, mov) => acc + mov, 0);

    acc.balance = balance
    labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency)
};


// Manipulate IN //

const calcDisplaySummary = function (acc) {
    const income = acc.transactions.filter(tran => tran > 0).reduce((acc, tran) => acc + tran, 0);
    labelSumIn.textContent = formatCurrency(income, acc.locale, acc.currency);


    // Manipulate OUT //

    const out = acc.transactions.filter(tran => tran < 0).reduce((acc, tran) => acc + tran, 0);
    labelSumOut.textContent = formatCurrency(Math.abs(out), acc.locale, acc.currency);


    // Manipulate INTEREST //

    const interest = acc.transactions.filter(tran => tran > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i, arr) => { return int >= 1; }).reduce((acc, int) => acc + int, 0);
    labelInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
};

// Creating usernames //

const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
    });
};

createUsername(accounts);


const updateUI = function (acc) {

    // display transactions //
    displayMovements(acc);

    // display balance //
    calcDisplayBalance(acc);

    // display summary //
    calcDisplaySummary(acc);
};


let currentAccount, timer;


// // //  FAKE LOGIN //

// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;




// Implementing Login Feature //

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {

        // display greeting//
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]} `;
        containerApp.style.opacity = 100;



        //  Current Date //

        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        };
        labelDate.textContent = `As of ${new Intl.DateTimeFormat(currentAccount.locale, options).format(now)}`;


        // clearing credentials //
        inputLoginPin.value = inputLoginUsername.value = '';
        inputLoginPin.blur();

        // display all values //
        updateUI(currentAccount)

        // logout timer//
        if (timer) clearInterval(timer);
        timer = startLogoutTimer()

    } else {
        alert("Enter correct credentials!");
    };
});

//  Transferring Amount //

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferTo.value = inputTransferAmount.value = '';

    if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.username !== currentAccount.username) {

        currentAccount.transactionsDates.push(new Date().toISOString());
        receiverAcc.transactionsDates.push(new Date().toISOString());

        alert('Transfer Succeed');
        currentAccount.transactions.push(-amount);
        receiverAcc.transactions.push(amount);

        // displaying updated value //
        updateUI(currentAccount);

        // reset time//
        clearInterval(timer);
        timer = startLogoutTimer()

    } else {
        alert('Account or amount not exist');
    }
});


//  Implementing Loan Feature //

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(Number(inputLoanAmount.value));

    if (amount > 0 && currentAccount.transactions.some(tran => tran >= amount * 0.1)) {

        setTimeout(function () {
            //  update loan amount to balance //
            currentAccount.transactions.push(amount);
            currentAccount.transactionsDates.push(new Date().toISOString());

            // update UI //
            updateUI(currentAccount);

            // reset time//
            clearInterval(timer);
            timer = startLogoutTimer()
        }, 3000);



        inputLoanAmount.value = '';
    } else {
        alert('Sorry! Not able to process the requested loan.')
    };
});


// Closing Account //

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);

        // Hide UI //
        containerApp.style.opacity = 0;
        alert('Account Removed Successfully');
        inputClosePin.value = inputCloseUsername.value = '';
    } else {
        alert('Incorrect Credentials')
    }
});


// Sort button //

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});


//  set up logout time //

const startLogoutTimer = function () {

    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(Math.trunc(time % 60)).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;


        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = 'Login to get started';
            containerApp.style.opacity = 0;
        };

        time--;
    };

    let time = 600;
    tick()
    const timer = setInterval(tick, 1000);
    return timer;
}

function myFunction() {
  alert("(1) User id: rj \nPassword : 2222 \n(2) User Id: jr \nPassword:1111\n\nLog in! Transact! Haffun!");
} myFunction()