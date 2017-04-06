function triangle(h) {
	triangle = "";
	for (var row = h; row > 0; row--) {
    	for (var col = row; col > 0; col--) {
    		triangle = triangle + col;
    	}
    	triangle = triangle + "\n";
	}
	console.log(triangle);
}

triangle(9);

function pyramid(h) {
	var pyramid = "";
		odd = 1;
		spaces = h - 1;
	for (var row = 0; row < h; row ++) {
		var mid = 0;
		for (var col = 0; col < spaces; col ++) {
			pyramid = pyramid + " ";
		}
		for (var col = 0; col < odd; col ++) {
			if (col <= row) {
				mid = mid + 1;
			} else {
				mid = mid - 1;
			}
			pyramid = pyramid + mid;
		}
		pyramid = pyramid + "\n";
		odd = odd + 2;
		spaces = spaces - 1;
	}
	console.log(pyramid);
}

pyramid(9);

function diamond(hh) {
	var diamond = "";
		odd = 1;
	for (var row = 1; row < hh*2 + 1; row ++) {
		var start = (odd + 1)/2;
			spaces = hh - (odd + 1)/2;
		for (var col = 0; col < spaces; col ++) {
			diamond = diamond + " ";
		}
		for (var col = 0; col < odd; col ++) {
			diamond = diamond + start;
			if (col < (odd - 1)/2) {
				start --;
			} else {
				start ++;
			}
		}
		diamond = diamond + "\n";
		if (row < hh) {
			odd = odd + 2;
		} else {
			odd = odd - 2;
		}
	}
	console.log(diamond);
}

diamond(9);