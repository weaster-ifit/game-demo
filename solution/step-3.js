window.addEventListener('DOMContentLoaded', function() {

	const ctx = document.querySelector('canvas').getContext('2d');
	
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