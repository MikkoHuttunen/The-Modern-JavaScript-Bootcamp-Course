//Example 1 (Not equal)
if (1 !== 1) {
    console.log("It's true");
}

//Example 2 (Equals)
let rating = 3;

if (rating === 3) {
    console.log("YOU ARE A SUPERSTAR!");
}

//Example 3 (If and else if)
let num = 38;

if (num % 2 !== 0) {
    console.log("ODD NUMBER!");
} else if (num % 2 === 0) {
    console.log("EVEN NUMBER!");
}

//Example 4 (Else)
let grade = 0;

if (rating > 3) {
    console.log("Great!");
} else if (rating <= 3) {
    console.log("Needs improvement!");
} else {
    console.log("Not a grade");
}

//Example 5 (Nested conditions)
let password = "hello kitty";

if (password.length >= 6) {
    if (password.indexOf(' ') === -1) {
        console.log("Valid password!")
    } else {
        console.log("Password is long enough. but cannot contain spaces");
    }
} else {
    console.log("Password must be longer!");
}

//Example 6 (Truthy and falsy values)
let mystery = 5;

if (mystery) {
    console.log("TRUTHY");
} else {
    console.log("FALSY");
}

//Example 7 (Logical AND)
let password2 = "chicken Gal";

if (password2.length >= 8 && password2.indexOf(' ') === -1) {
    console.log("VALID PASSWORD");
} else {
    console.log("INVALID PASSWORD");
}

let num2 = 3;

if (num2 >= 1 && num2 <= 10) {
    console.log("Number is between 1 and 10")
} else {
    console.log("Please guess a number between 1 and 10");
}

//Example 8 (Logical OR)
let age = 78;

if (age < 6 || age >= 65) {
    console.log("YOU GET IN FOR FREE");
} else {
    console.log("YOU MUST PAY!");
}

let color = "violet";

if (color === "purple" || color === "lilac" || color === "violet") {
    console.log("GREAT CHOICE!");
}

//Example 9 (NOT operator)
let loggedInUser;

//If there isn't a logged in user
if (!loggedInUser) {
    console.log("GET OUT OF HERE!");
}

let flavor = "watermelon";

if (flavor !== "grape" && flavor !== "cherry") {
    console.log("WE DON'T HAVE THAT FLAVOR");
}

//Example 10 (Switch statement)
let day = 3;

switch (day) {
    case 1:
        console.log("MONDAY");
        break;
    case 2:
        console.log("TUESDAY");
        break;
    case 3:
        console.log("WEDNESDAY");
        break;
    case 4:
        console.log("THURSDAY");
        break;
    case 5:
        console.log("FRIDAY");
        break;
    case 6:
        console.log("SATURDAY");
        break;
    case 7:
        console.log("SUNDAY");
        break;
    default:
        console.log("INVALID DAY");
        break;
}

let emoji = "heart";

switch (emoji) {
    case "sad face":
    case "happy face":
        console.log("yellow");
        break;
    case "eggplant":
        console.log("purple");
        break;
    case "heart":
    case "lips":
        console.log("red");
        break;
}

//Example 11 (Ternary operator)
let luckyNumber = Math.floor(Math.random() * 10) + 1;

luckyNumber === 7 ? console.log(luckyNumber, "LUCKY!") : console.log(luckyNumber, "NOT LUCKY!");

let status = "online";

let color2 = status === "offline" ? console.log("red") : console.log("green");

//Example 12 (Arrays)
let shoppingList = ["cereal", "cheese", "ice"];
let lotto = [45, 12, 23, 25, 34];
//Array can have different kind of values
let myCollection = [12, 'dog', true, null, NaN];
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

console.log(colors.length);
console.log(colors[2]);

//Add new value to the end of an array
shoppingList[shoppingList.length] = "milk";
console.log(shoppingList);

//Example 13 (Array methods)
let topSongs = [
    "First Time Ever I Saw Your Face", 
    "God Only Knows", 
    "a Day In The Life", 
    "Life On Mars"
];

//Pushes new value to the end of an array
topSongs.push("Fortunate Son");

//Removes the last value of an array
topSongs.pop();

//Adds new value to the beginning of an array
topSongs.unshift("Highway To Hell");

//Removes the first value of an array
topSongs.shift();

let fruits = ["apple", "banana"];
let vegetables = ["asparagus", "brussel sprouts"];

//Merge arrays
console.log(fruits.concat(vegetables));

//Check if value exists in an array
fruits.includes("orange");

//Returns index number of a given value in an array
vegetables.indexOf("brussel sprouts");

//Reverses the values in an array
vegetables.reverse();
console.log(vegetables);

//Concatenates an array in a single string
console.log(fruits.join(", "));

let animals = ["shark", "salmon", "whale", "bear", "lizard", "tortoise"];

//Returns a copy of a certain portion of an array
let swimmers = animals.slice(0, 3);
console.log(swimmers);

//Removes, replaces and adds new value to given index of an array
animals.splice(1, 0, "octopus");

//Returns sorted copy of a given array
console.log(animals.sort());

//Example 14 (Nested arrays)
const animalPairs = [
    ["doe", "buck"],
    ["ewe", "ram"],
    ["peahen", "peacock"]
];

//Access value in nested array
console.log(animalPairs[2][0]);

//Change value in nested array
animalPairs[0][1] = "stag";

//Example 15 (Objects)
const fitbitData = {
    totalSteps: 308727,
    totalMiles: 211.7,
    avgCalorieBurn: 5755,
    workaoutsThisWeek: "5 of 7",
    avgGoodSleep: "2:13"
};

//Accessing value of an object
console.log(fitbitData.totalMiles);

const numbers = {
    100: "one hundred",
    16: "sixteen"
};

//Accessing value with a number as a key
console.log(numbers[100]);

//Empty object
const userReviews = {};

//Add value to object
userReviews.mrSmith78 = 3.5;

//Change value in object
userReviews.mrSmith78++;

//Nested object
const student = {
    firstName: "David",
    lastName: "Jones",
    strengths: ["Music", "Art"],
    exams: {
        midterm: 92,
        final: 88
    }
};

//Access values in nested objects
console.log((student.exams.midterm + student.exams.final) / 2);

//Array containing objects
const shoppingCart = [
    {
        product: "Jenga Classic",
        price: 6.88,
        quantity: 1
    },
    {
        product: "Echo Dot",
        price: 29.99,
        quantity: 3
    },
    {
        product: "Fire Stick",
        price: 39.99,
        quantity: 2
    }
];