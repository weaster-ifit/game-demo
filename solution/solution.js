window.addEventListener('DOMContentLoaded', function() {

	const correctAngle = (Math.random() * 2 * Math.PI) - Math.PI;
	const ctx = document.querySelector('canvas').getContext('2d', {});
	
	const coords = { x: 0, y: 0 };
	let health = 200;
	let isMouseDown = false;
	let angle = 0;
	let rotation = 0;
	let isDamagingPick = false;

	const bg = new Image();
	bg.src = './background.jpg';

	const lock = new Image();
	lock.src = './lock.png';

	const keyhole = new Image();
	keyhole.src = './keyhole.png';

	ctx.canvas.addEventListener('mousemove', function(e) {
		coords.x = e.pageX - (ctx.canvas.width/2) - (window.innerWidth - ctx.canvas.width)/2;
		coords.y = e.pageY - (ctx.canvas.height/2) - (window.innerHeight - ctx.canvas.height)/2;
		angle = Math.atan2(coords.y - 15, coords.x) + Math.PI;
	});

	ctx.canvas.addEventListener('mousedown', function() {
		isMouseDown = true;
	});

	ctx.canvas.addEventListener('mouseup', function() {
		isMouseDown = false;
	})


	function update() {
		if (health <= 0) {
			alert('Your pick broke! Try again');
			window.location.reload();
		}
		if (isMouseDown) {
			const distance = Math.abs(correctAngle - (angle - Math.PI));

			if (distance < Math.PI/18 || distance > Math.PI * 35/18) {
				rotation = Math.min(rotation + 2, 100);
				isDamagingPick = false;
			} else {
				isDamagingPick = true;
				health--;
			}
		} else {
			isDamagingPick = false;
			rotation = Math.max(rotation - 4, 0);
		}

		if (rotation >= 100) {
			alert('You win!');
			window.location.reload();
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
		ctx.scale(.5, .5);
		ctx.drawImage(
			lock,
			0 - lock.width/2 - 56,
			2 - lock.height/2
		);
		ctx.rotate((Math.PI/2) * (rotation/100));
		ctx.drawImage(
			keyhole,
			0 - keyhole.width/2,
			0 - keyhole.height/2
		);
		ctx.restore();


		// Pick
		ctx.save();
		ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
		ctx.rotate(angle);
		if (isDamagingPick) {
			ctx.rotate(Math.cos(Date.now() / 20) * Math.PI / 144);
		}
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