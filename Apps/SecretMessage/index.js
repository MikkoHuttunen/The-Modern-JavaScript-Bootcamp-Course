const { hash } = window.location;
const message = atob(hash.replace('#', ''));

//If there is a message, show it and hide the form
if (message) {
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');
    document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault(); //Prevent reloading the page

    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide');

    const input = document.querySelector('#message-input');
    const encrypted = btoa(input.value); //Encrypt user input to base 64-bit string

    const linkInput = document.querySelector('#link-input');
    linkInput.value = `${window.location}#${encrypted}`; //Form a link with encrypted string at the end
    linkInput.select();
});