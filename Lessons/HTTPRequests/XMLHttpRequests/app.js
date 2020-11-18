//XMLHttpRequests

const firstReq = new XMLHttpRequest();

//Successful request
firstReq.addEventListener('load', function() {
    console.log('First request successful');
    const data = JSON.parse(this.responseText); //Parse response JSON to JavaScript object
    const xmlFilmURL = data.results[0].films[0]; //Get url of films array
    const xmlFilmReq = new XMLHttpRequest(); //Second request inside a request

    xmlFilmReq.addEventListener('load', function() {
        console.log('Second request successful');
        const filmData = JSON.parse(this.responseText);
        console.log(filmData); //Display response as JavaScript
    });

    xmlFilmReq.addEventListener('error', function(e) {
        console.log('Error with XMLHttpRequest', e);
    });

    xmlFilmReq.open('GET', xmlFilmURL);
    xmlFilmReq.send();
});

//Unsuccessful request
firstReq.addEventListener('error', function(e) {
    console.log('Error with XMLHttpRequest', e);
});

//Send request to server
firstReq.open('GET', 'http://swapi.dev/api/planets');
firstReq.send();
console.log('Request sent');