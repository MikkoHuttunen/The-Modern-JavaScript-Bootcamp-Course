//Function that rolls a die
function rollDie() {
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log(`Rolled: ${roll}`);
}

//Call rollDie function 6 times
function throwDice() {
    for (let i = 0; i < 6; i++) {
        rollDie();
    }
}

//Call a function
throwDice();

//Function with a parameter

let nickname = "GreenGuy1337";

function greet(nickname) {
    console.log(`Hi, ${nickname}`);
}

greet(nickname);

//Math functions

let randomNumber = Math.floor(Math.random() * 10) + 1;

function square(num) {
    console.log(num * num);
}

function sum(x, y) {
    console.log(x + y);
}

function divide(a, b) {
    console.log(a / b);
}

square(randomNumber);
sum(randomNumber, randomNumber);
divide(randomNumber, randomNumber);

//Return functions

let colors = ["blue", "pink", "magenta", "purple"];

function containsPurple(arr) {
    for (let color of arr) {
        if (color === "purple") {
            return true;
        }
    }

    return false;
}

console.log(containsPurple(colors));

//Function Challenge (Password)

function isValidPassword(username, password) {
    if (password.length < 8 || password.indexOf(' ') > 0 || password.includes(username)) {
        return false;
    }

    return true;
}

console.log(isValidPassword("Mikko92", "sala123")); //Returns false
console.log(isValidPassword("Mikko92", "sala sana")); //Returns false
console.log(isValidPassword("Mikko92", "Mikko92")); //Returns false
console.log(isValidPassword("Mikko92", "salasana123")); //Returns true

//Function Challenge (Average)

function average(arr) {
    let total = 0;
    for (number of arr) {
        total += number;
    }

    return total / arr.length;
}

console.log(average([5, 10, 15, 20, 25, 30]));

//Function Challenge (Pangram)

function isPangram(sentence) {
    let lowerCased = sentence.toLowerCase();
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        if (!lowerCased.includes(char)) {
            return false;
        }
    }

    return true;
}

console.log(isPangram("the five boxing wizards jump quickly"));

//Function Challenge (Playing Card)

function getCard() {
    const values = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A"
    ];
    const suits = [
        "clubs",
        "spades",
        "hearts",
        "diamonds"
    ];
    return {
        value: getRandom(values),
        suit: getRandom(suits)
    };
}

function getRandom(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

console.log(getCard());