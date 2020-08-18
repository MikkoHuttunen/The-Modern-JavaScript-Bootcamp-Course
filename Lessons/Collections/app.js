//forEach

const numbers = [20, 21, 22, 23, 24, 25, 26, 27];

numbers.forEach(function(num) {
    console.log(num * 2);
})

function printTriple(n) {
    console.log(n * 3);
}

//Function call for each value in an array
numbers.forEach(printTriple);

//Map

const words = ['asap', 'byob', 'rsvp', 'diy'];

const doubles = numbers.map(function(num) {
    return num * 2;
});

const numDetails = numbers.map(function(n) {
    return {
        value: n,
        isEven: n % 2 === 0
    }
});

console.log(doubles);
console.log(numDetails);

const abbrevs = words.map(function(word) {
    return word.toUpperCase().split('').join('.');
});

console.log(abbrevs);

//Find

let movies = [
    "The Fantastic Mr. Fox",
    "Mr. and Mrs. Smith",
    "Mrs. Doubtfire",
    "Mr. Deeds"
];

//Return a movie that includes keyword
const movie = movies.find(movie => {
    return movie.includes('Mrs');
});

console.log(movie);

//Filter

const nums = [34, 35, 67, 54, 109, 102, 32, 9];

//Creates a new array filtering out even numbers
const odds = nums.filter(n => n % 2 === 1);

console.log(odds);

//Every & Some

const shortWords = ['dog', 'dig', 'log', 'bag', 'wag'];

//Returns true or false if every value in an array passes the test
const threeLetters = shortWords.every(word => word.length === 3);

console.log(threeLetters);

//Returns true or false if even 1 value in an array passes the test
const initialD = shortWords.some(word => word[0] === 'd');

console.log(initialD);

//Sort

const prices = [400.50, 3000, 99.99, 35.99, 12.00, 9500];

//Using sort to manually put array in specific order
//Using slice to make a copy of an array
const ascSort = prices.slice().sort((a, b) => a - b);
const descSort = prices.slice().sort((a, b) => b - a);

console.log(ascSort);
console.log(descSort);

//Reduce

const values = [3, 4, 5, 6, 7];

//Reduce returns single value iterating through all values in an array
const product = values.reduce((total, currentValue) => {
    return total * currentValue;
});

console.log(product);

const votes = ['y', 'y', 'n', 'y', 'n', 'y', 'n', 'y', 'n', 'n', 'n', 'y', 'y'];

//Iterate through votes and add them to results object as counted values
const results = votes.reduce((tally, val) => {
    if (tally[val]) {
        tally[val]++;
    } else {
        tally[val] = 1;
    }
    return tally;
}, {});

console.log(results);