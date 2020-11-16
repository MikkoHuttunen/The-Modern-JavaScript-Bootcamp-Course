//Save button to a variable
const btn = document.querySelector('button');

//Execute a function when mouse is over button
btn.addEventListener('mouseover', function() {
    console.log('MOUSED OVER ME!');
    //Get random position based on available window space
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    btn.style.left = `${width}px`;
    btn.style.top = `${height}px`;
});

//Execute a function when button is clicked
btn.addEventListener('click', function() {
    btn.innerText = 'YOU GOT ME!';
    document.body.style.backgroundColor = 'green';
})