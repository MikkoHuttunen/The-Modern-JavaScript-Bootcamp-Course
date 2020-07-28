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