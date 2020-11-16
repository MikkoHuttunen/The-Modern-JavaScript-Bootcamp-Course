const form = document.querySelector('#signup-form');
const nameInput = document.querySelector('#name');
const ageCheckbox = document.querySelector('#age');
const animalSelect = document.querySelector('#animal')

//Executes when user submits the form
form.addEventListener('submit', function(e) {
    alert('FORM SUBMITTED');
    //Send form data to console
    console.log('name', nameInput.value);
    console.log('age', ageCheckbox.checked);
    console.log('animal', animalSelect.value);
    //Prevents sending user to another page when submitting
    e.preventDefault();
})