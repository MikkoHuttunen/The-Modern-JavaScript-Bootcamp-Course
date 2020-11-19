//Async & Await

//Returns resolved promise
async function greet() {
    return 'Hello!';
};

//Async functions can be chained with .then
greet().then((val) => {
    console.log('Promise resolved with: ', val);
});

//Async function that can return resolve or rejected promise
async function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw 'X and Y must be numbers!';
    }
    return x + y;
}

//Await can only be used inside async functions
async function getPlanets() {
    try {
        //Waits until results are done and moves to the next line of code
        const res = await axios.get('http://swapi.dev/api/planets');
        console.log(res.data);
    } catch(e) {
        console.log(e);
    }
};

getPlanets();

//Sends parallel requests and then waits for them all to resolve
async function getPokemons() {
    const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');
    console.log(prom1); //Promise is pending
    const results = await Promise.all([prom1, prom2, prom3]); //Array of promises
    console.log(prom1); //Promise is solved
    printPokemon(results);
}

//Print the names of Pokemons
function printPokemon(results) {
    for (let pokemon of results) {
        console.log(pokemon.data.name);
    }
}

getPokemons();