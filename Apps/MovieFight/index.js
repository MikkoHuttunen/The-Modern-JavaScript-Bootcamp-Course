//Fetch data from database
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8969393',
            s: searchTerm
        }
    });

    //If there is an error, return empty array
    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

//Add html to create interface
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

//Fetch data based on user input
const onInput = async event => {
    const movies = await fetchData(event.target.value);

    //Clear search results from display
    resultsWrapper.innerHTML = '';
    //Open the dropdown to show fetched results
    dropdown.classList.add('is-active');
    //Iterate through search results and display
    for (let movie of movies) {
        const option = document.createElement('a');
        //Check if there is poster available
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;
        //Display new items at the end of list
        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('input', debounce(onInput, 500));