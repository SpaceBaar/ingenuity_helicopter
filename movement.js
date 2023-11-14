window.addEventListener('load', function (event) {
	reCenterHelicopter();

	setInterval(moveHelicopter, 50);
}, true);

window.addEventListener('resize', function (event) {
	reCenterHelicopter();
}, true);

function reCenterHelicopter() {
	const screenSize = getScreenSize();

	const helicopter = document.querySelector('.helicoptor');

	const styles = {
		left: screenSize.width / 2 + 'px',
		top: screenSize.height / 2 + 'px',
		transform: 'rotate(0deg) scale(1.47753)'
	};

	addStyles(helicopter, styles);
}

let xDirection = 1; // 1 for right, -1 for left
let yDirection = 1; // 1 for down, -1 for up

function moveHelicopter() {
	const helicopter = document.querySelector('.helicoptor');

	const currentX = parseInt(helicopter.style.left) || 0;
	const currentY = parseInt(helicopter.style.top) || 0;

	if (Math.random() < 0.01) {
		xDirection = Math.random() < 0.5 ? 1 : -1;
		yDirection = Math.random() < 0.5 ? 1 : -1;
	}

	const newX = currentX + xDirection * 5;
	const newY = currentY + yDirection * 5;

	// Ensure the image stays within the window bounds
	const maxWidth = window.innerWidth - helicopter.width;
	const maxHeight = window.innerHeight - helicopter.height;

	// Bounce off the window boundaries
	if (newX <= 0 || newX >= maxWidth) {
		xDirection *= -1;
	}

	if (newY <= 0 || newY >= maxHeight) {
		yDirection *= -1;
	}

	const styles = {
		left: `${Math.min(Math.max(newX, 0), maxWidth)}px`,
		top: `${Math.min(Math.max(newY, 0), maxHeight)}px`,
		transform: `rotate(0deg) scale(1.47753)`
	};

	addStyles(helicopter, styles);
}

function getScreenSize() {
	const height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	const width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	return { height, width };
}

/**
 * Add styles to DOM element
 * @element DOM element
 * @styles object with css styles
 */
function addStyles(element, styles) {
	for (id in styles) {
		element.style[id] = styles[id];
	}
}