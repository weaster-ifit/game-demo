window.addEventListener('DOMContentLoaded', function() {

	const ctx = document.querySelector('canvas').getContext('2d');

	const keyhole = new Image();
	keyhole.src = './keyhole.png';
	
	function update() {

	}

	function render() {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.drawImage(
			keyhole,
			-keyhole.width/2,
			-keyhole.height/2
		);
	}

	function main() {

		update();

		render();

		window.requestAnimationFrame(main);
	}

	main();
});