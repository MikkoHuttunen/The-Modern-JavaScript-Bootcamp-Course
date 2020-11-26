//Main class
class Pet {
	constructor(name, age) {
		console.log('IN PET CONSTRUCTOR!');
		this.name = name;
		this.age = age;
	}
	eat() {
		return `${this.name} is eating!`;
	}
}

//Subclasses that extends the main class
class Cat extends Pet {
	constructor(name, age, livesLeft = 9) {
		console.log('IN CAT CONSTRUCTOR!');
		super(name, age); //Reference to the main class
		this.livesLeft = livesLeft;
	}
	meow() {
		return 'MEOWWWW!!';
	}
}

class Dog extends Pet {
	bark() {
		return 'WOOOF!!';
	}
	eat() {
		return `${this.name} scarfs his food!`;
	}
}
