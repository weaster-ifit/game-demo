window.addEventListener('DOMContentLoaded', function() {
	
	function update() {

	}

	function render() {

	}

	function main() {
		update();

		render();

		window.requestAnimationFrame(main);
	}

	main();
});