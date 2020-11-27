//Select the elements
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

//Calculate the perimeter of the circle around timer
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;

//Create new timer object
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        //Subtract offset of circle around timer every tick
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
    },
    onComplete() {
        console.log("Timer is completed");
    }
});