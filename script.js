const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch random user and add random money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// double everyone money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// sort money by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);