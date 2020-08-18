//Features contains new (and old) JavaScript features introduced in the programming language

//Default value

//You can specify a default value while passing a parameter
const greet = (person, greeting = 'Hi') => {
    console.log(`${greeting}, ${person}`);
};

greet('Mikko');

//Spread

const nums = [3, 7, 28, 1, 6, 64];

//Prints out the max value of a given array
console.log(Math.max(...nums));

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const alphabets2 = ['h', 'i', 'j', 'k', 'l', 'm', 'n'];

//Spread two arrays into one
const alphabets3 = [...alphabets, ...alphabets2];

console.log(alphabets3);

const feline = {
    legs: 4,
    family: 'Felidae'
};

//Spread object values in another object
const cat = {
    ...feline,
    isGrumpy: true,
    personality: 'unpredictable'
};

console.log(cat);

//Rest

//Arguments are array like object that isn't array
//Arguments cannot be accessed in an arrow function
//Contains all the values in a function
function fullName(firstName, lastName) {
    console.log(arguments);
}

fullName();

//Rest parameters collect all the leftover parameters in an array
function fullName2(firstName, lastName, ...titles) {
    console.log(firstName, lastName, titles);
}

fullName2('Mikko', 'Huttunen', 'Huutis');

//Collects all parameters in an array
const multiply = (...nums) => (
    nums.reduce((total, currentValue) => total * currentValue)
)

console.log(multiply(1, 2, 3, 4, 5));

//Destructuring arrays

const raceResults = [
    'Eliud Kipchoge',
    'Feyisa Lelisa',
    'Galen Rupp',
    'Ghirmay Ghebreslassie',
    'Alphonce Simbu',
    'Jared Ward'
];

//Creates variable referencing a value in an array
const [gold, silver, bronze] = raceResults;

console.log(gold);
console.log(silver);
console.log(bronze);

//Creates array containing all the values after the first one
const [winner, ...others] = raceResults;

console.log(others);

//Destructuring objects

const runner = {
    first: 'Eliud',
    last: 'Kipchoge',
    country: 'Kenya',
    title: 'Elder of the Order of the Golden Heart of Kenya'
};

//Create keys to access value in another object
const {
    country: nation,
    title: honorific
} = runner;

console.log(nation, honorific);

//Access first and last key of the given object and list all other values after those
const {
    first,
    last,
    ...other
} = runner;

console.log(first, last, other);

//Destructuring parameters

//Print only specific values from the given object
function print({
    first,
    last,
    title
}) {
    console.log(`${first} ${last}, ${title}`);
}

print(runner);

const response = [
    'HTTP/1.1',
    '200 OK',
    'application/json'
]

function parseResponse([protocol, statusCode, contentType]) {
    console.log(`Status: ${statusCode}`);
}

parseResponse(response);