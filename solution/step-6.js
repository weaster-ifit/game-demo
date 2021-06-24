window.addEventListener('DOMContentLoaded', function() {

	const ctx = document.querySelector('canvas').getContext('2d');

	const keyhole = new Image();
	keyhole.src = './keyhole.png';

	const bg = new Image();
	bg.src = './background.jpg';

	let angle = 0;
	
	function update() {

	}

	function render() {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(
			bg,
			0,
			0,
			ctx.canvas.width,
			ctx.canvas.height
		);

		ctx.save();
		ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
		ctx.drawImage(
			keyhole,
			-keyhole.width/2,
			-keyhole.height/2
		);

		// Pick
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(-200, 0);
		ctx.lineTo(-200, -5);
		ctx.lineTo(0, 0);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	function main() {

		update();

		render();

		window.requestAnimationFrame(main);
	}

	main();
});