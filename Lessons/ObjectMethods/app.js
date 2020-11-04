//Adding functions as properties on objects

const math = {
    add: function(x, y) {
        return x + y;
    },
    multiply: function(x, y) {
        return x * y;
    }
}

console.log(math.add(2, 3));
console.log(math.multiply(2, 10));

//Method shorthand syntax
const auth = {
    username: 'LoginBot',
    login() {
        console.log("Logged in");
    },
    logout() {
        console.log("Logged out");
    }
}

console.log(auth);

//Keyword this

function sayHi() {
    console.log("Hi!");
    console.log(this); //Refers to the window (global scope)
}

const person = {
    first: 'Cherilyn',
    last: 'Sarkisian',
    nickName: 'Cher',
    fullName() {
        console.log(this); //Refers to the object itself
    }
}

//Assigning values using this
const person2 = {
    first: 'Mikko',
    last: 'Huttunen',
    nickName: 'Mikko',
    fullName() {
        const {
            first,
            last,
            nickName
        } = this;
        return `${first} ${last} AKA ${nickName}`;
    },
    printBio() {
        const fullName = this.fullName(); //Calling method using this to refer object
        console.log(`${fullName} is a person!`);
    },
    laugh: () => {
        console.log(this); //In arrow functions this refers to the global scope (window)
        console.log(`${this.nickName} laughs!`);
    }
}

person.fullName();
person2.fullName();
person2.printBio();
person2.laugh();

//Logger that prints out random word from an array every 3 seconds
const logger = {
    words: ["Smile", "Car", "House", "Pencil", "Sea", "Cat", "Lollipop"],
    pickWord() {
        const {
            words
        } = this;
        const idx = Math.floor(Math.random() * words.length);
        return words[idx];
    },
    start() {
        this.timerId = setInterval(() => {
            console.log(this.pickWord());
        }, 3000)
    },
    stop() {
        clearInterval(this.timerId);
    }
}

//logger.start() to start logger
//logger.stop() to stop logger

//Deck of cards

const makeDeck = () => {
    return {
        deck: [],
        drawnCards: [],
        suits: ['hearts', 'diamonds', 'spades', 'clubs'],
        values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
        initializeDeck() {
            //Create deck using this to assign values
            const {
                suits,
                values,
                deck
            } = this;
            for (let value of values.split(',')) {
                for (let suit of suits) {
                    deck.push({
                        value,
                        suit
                    })
                }
            }
        },
        //Returns the value of the drawn card and puts it to the drawn deck
        drawCard() {
            const card = this.deck.pop();
            this.drawnCards.push(card);
            return card;
        },
        //Returns an array of cards and puts them to the drawn deck
        drawMultiple(numCards) {
            const cards = [];
            for (let i = 0; i < numCards; i++) {
                cards.push(this.drawCard());
            }
            return cards;
        },
        //Shuffles the values in an array
        shuffle() {
            const {
                deck
            } = this;
            //Loop over array backwards
            for (let i = deck.length - 1; i > 0; i--) {
                //Pick random index before current element
                let j = Math.floor(Math.random() * (i + 1));
                //Swap
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
    }
}

const myDeck = makeDeck();
myDeck.initializeDeck();
myDeck.shuffle();
console.log(myDeck.drawCard());
console.log(myDeck.drawMultiple(5));