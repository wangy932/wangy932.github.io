function checkerboard(width, height) {
	var checkerboard = "";

	for (var row = 0; row < height; row++) {
		if (row % 2) {
			for (var col = 0; col < width; col++) {
				if (col % 2) {
					checkerboard = checkerboard + "#";
				} else {
					checkerboard = checkerboard + " ";
				}
			}
		} else {
			for (var col = 0; col < width; col++) {
				if (col % 2) {
					checkerboard = checkerboard + " ";
				} else {
					checkerboard = checkerboard + "#";
				}
			}
		}
		checkerboard = checkerboard + "\n";
	}

	console.log(checkerboard);
}

checkerboard(8, 3);

function triangle(height) {
	var triangle = "";

	for (var row = 0; row < height; row++) {
    	for (var col = 0; col <= row; col++) {
    		triangle = triangle + "#";
    	}
    	triangle = triangle + "\n";
	}

	console.log(triangle);
}

triangle(4);

var checkerboardButton = document.getElementById("checkerboard-button");
	pyramidButton = document.getElementById("pyramid-button");

checkerboardButton.addEventListener("click", function() {
	checkerboard(10, 5);
})

pyramidButton.addEventListener("click", function() {
	triangle(5);
})