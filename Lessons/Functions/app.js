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

//Function expressions

const sum2 = function(x, y) {
    return x + y;
}

console.log(sum2(5, 8));

//Higher order functions

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

const divide2 = function(x, y) {
    return x / y;
}

//Functions in an array
const operations = [add, subtract, multiply, divide];

console.log(operations[2] (100, 5));

//Function that repeats given function
function repeatFunction(func, times) {
    for (let i = 0; i < times; i++) {
        func();
    }
}

function sayTheWords() {
    console.log("I'm saying the words!");
}

repeatFunction(sayTheWords, 3);

//Returns function
function multiplyBy(num) {
    return function(x) {
        return x * num;
    }
}

const triple = multiplyBy(3);
const double = multiplyBy(2);

console.log(double(5));
console.log(triple(5));

//Arrow functions

const squared = x => {
    return x * x;
}

console.log(squared(5));

//Multiple parameter must be in parenthesis
const multiplied = (x, y) => {
    return x * y;
}

console.log(multiplied(5, 10));

//Arrow function without parameters
const greetings = () => {
    console.log("Hello!");
}

greetings();

//Arrow functions that implicit return
const squared2 = n => (
    n * n
)

//implicit return in one line
const squared3 = n => n * n;