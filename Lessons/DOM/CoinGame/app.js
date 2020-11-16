//Check overlapping
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');

//Control key listener
window.addEventListener('keyup', function(e) {
	if (e.key === 'ArrowDown' || e.key === 'Down') {
		moveVertical(avatar, 50);
	} else if (e.key === 'ArrowUp' || e.key === 'Up') {
		moveVertical(avatar, -50);
	} else if (e.key === 'ArrowRight' || e.key === 'Right') {
		moveHorizontal(avatar, 50);
		avatar.style.transform = 'scale(1, 1)'; //Flip the image to face moving direction
	} else if (e.key === 'ArrowLeft' || e.key === 'Left') {
		moveHorizontal(avatar, -50);
		avatar.style.transform = 'scale(-1, 1)';
	}
	if (isTouching(avatar, coin)) moveCoin(); //When player avatar collides with coin
});

//Move player avatar vertically
const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	element.style.top = `${currTop + amount}px`;
}

//Move player avatar horizontally
const moveHorizontal = (element, amount) => {
	const currLeft = extractPos(element.style.left);
	element.style.left = `${currLeft + amount}px`;
}

//Returns new position of player avatar
const extractPos = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
}

//Move coin to random position when collected
const moveCoin = () => {
	//Get available window space
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
};

moveCoin();