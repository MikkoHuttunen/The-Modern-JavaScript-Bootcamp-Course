//Axios

//Returns url for retrieving planet data
const fetchNextPlanets = (url='http://swapi.dev/api/planets') => {
    return axios.get(url);
}

//Prints planet names and returns solved promise
const printPlanets = (({data}) => {
    //Returns pre-parsed results
    console.log(data);
    //Iterate through first 10 planets
    for (let planet of data.results) {
        console.log(planet.name);
    }
    
    //Return solved promise with url data
    return Promise.resolve(data.next);
})

//Chained promises
fetchNextPlanets()
.then(printPlanets)
.then(fetchNextPlanets)
.then(printPlanets)
.catch((err) => {
    //Returns error with status code
    console.log('Error', err);
});