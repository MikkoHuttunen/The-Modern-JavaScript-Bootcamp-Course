//Fetch

//Returns parsed response as promise
const checkStatusAndParse = (response) => {
    //Show error if response is empty
    if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
    //Return promise as json
    return response.json();
};

//Print planets and return solved promise in order to continue promise chain
const printPlanets = (data) => {
    //Fetch results
    console.log('Fetched 10 planets');
    for (let planet of data.results) {
        console.log(planet.name);
    }

    //Return solved promise with url
    return Promise.resolve(data.next);
}

//Returns promise with url
const fetchNextPlanets = (url='http://swapi.dev/api/planets') => {
    return fetch(url);
}

//Chained promises for parsing results
fetchNextPlanets()
.then(checkStatusAndParse)
.then(printPlanets)
.then(fetchNextPlanets)
.then(checkStatusAndParse)
.then(printPlanets)
.catch((err) => {
    //Fetch only throw error if there is no response at all
    console.log('Error with fetch', err);
})