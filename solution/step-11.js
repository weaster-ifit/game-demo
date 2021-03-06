window.addEventListener('DOMContentLoaded', function() {

	const ctx = document.querySelector('canvas').getContext('2d');

	const keyhole = new Image();
	keyhole.src = './keyhole.png';

	const lock = new Image();
	lock.src = './lock.png';

	const bg = new Image();
	bg.src = './background.jpg';
	
	const correctAngle = (Math.random() * 2 * Math.PI) - Math.PI;
	
	let
		angle = 0,
		health = 200,
		isDamagingPick = false,
		isMouseDown = false,
		rotation = 0;

	ctx.canvas.addEventListener('mousemove', function(e) {
		const x = e.pageX - (ctx.canvas.width/2) - (window.innerWidth - ctx.canvas.width)/2;
		const y = e.pageY - (ctx.canvas.height/2) - (window.innerHeight - ctx.canvas.height)/2;

		angle = Math.atan2(y, x) + Math.PI;
	});

	ctx.canvas.addEventListener('mousedown', function() {
		isMouseDown = true;
	});

	ctx.canvas.addEventListener('mouseup', function() {
		isMouseDown = false;
	});
	
	function update() {
		if (isMouseDown) {
			const distance = Math.abs(correctAngle - (angle - Math.PI));
			const sigma = Math.PI / 18

			if (distance < sigma || distance > 2 * Math.PI - sigma) {
				isDamagingPick = false;
				rotation = Math.min(rotation + 2, 100);
			} else {
				isDamagingPick = true;
				health--;
			}
		} else {
			isDamagingPick = false;
			rotation = Math.max(rotation - 4, 0);
		}
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

		ctx.save();
		ctx.scale(0.5, 0.5);
		ctx.drawImage(
			lock,
			0 - lock.width/2 - 56,
			2 - lock.height/2
		);
		ctx.rotate((Math.PI / 2) * (rotation / 100));
		ctx.drawImage(
			keyhole,
			-keyhole.width/2,
			-keyhole.height/2
		);
		ctx.restore();

		// Pick
		ctx.save();
		ctx.rotate(angle);
		if (isDamagingPick) {
			ctx.rotate(Math.cos(Date.now() / 20) * Math.PI / 144);
		}
		ctx.fillStyle = 'tan';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(-200, 0);
		ctx.lineTo(-200, -5);
		ctx.lineTo(0, 0);
		ctx.fill();
		ctx.closePath();
		ctx.restore();

		ctx.restore();
	}

	function main() {

		update();

		render();

		window.requestAnimationFrame(main);
	}

	main();
});