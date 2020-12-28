//Wait for dom element to appear
const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve();
            }
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            reject();
        }, 2000);
    });
};

//Execute before each test
beforeEach(() => {
    document.querySelector('#target').innerHTML = ''; //Clear target after each test
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
                { Title: 'Movie 1' },
                { Title: 'Movie 2' },
                { Title: 'Movie 3' }
            ];
        },
        renderOption(movie) {
            return movie.Title;
        }
    });
});

//Tests

it('Dropdown starts closed', () => {
    //Select dropdown class
    const dropdown = document.querySelector('.dropdown');

    //Check if dropdown does not include a class
    expect(dropdown.className).not.to.include('is-active');
});

it('After searching, dropdown opens up', async () => {
    const input = document.querySelector('input');
    input.value = 'movie';
    //Simulate input event
    input.dispatchEvent(new Event('input'));

    //Wait for dom element to appear before continuing
    await waitFor('.dropdown-item');

    const dropdown = document.querySelector('.dropdown');
    //Check if dropdown class includes a class
    expect(dropdown.className).to.include('is-active');
});

it('After searching, displays some results', async () => {
    const input = document.querySelector('input');
    input.value = 'movie';
    //Simulate input event
    input.dispatchEvent(new Event('input'));

    //Wait for dom element to appear before continuing
    await waitFor('.dropdown-item');

    const items = document.querySelectorAll('.dropdown-item');
    //Check that dropdown contains 3 elements
    expect(items.length).to.equal(3);
})