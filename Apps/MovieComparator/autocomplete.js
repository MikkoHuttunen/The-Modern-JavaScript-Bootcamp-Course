//Autocomplete that is completely reuseable code

const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
}) => {
    //Add html to create interface
    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    //Fetch data based on user input
    const onInput = async event => {
        const items = await fetchData(event.target.value);

        //Close dropdown if search is empty
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        //Clear search results from display
        resultsWrapper.innerHTML = '';
        //Open the dropdown to show fetched results
        dropdown.classList.add('is-active');
        //Iterate through search results and display
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            //Close dropdown if user clicks an item
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            //Display new items at the end of list
            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 500));

    //Close dropdown if user clicks outside of it
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};