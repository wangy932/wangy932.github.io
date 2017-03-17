//console.log("hello world");

var myStudentDebt = 800;
myStudentDebt = myStudentDebt - 100;

var myLuckyNumbers = [4, 7, 8, 16];
//console.log(myLuckyNumbers);

myLuckyNumbers[2] = 36;
//console.log(myLuckyNumbers[2]);

function addFive(x) {
	return x + 5;
}

function add(x, y) {
	console.log(x + y);
}

//addFive(10);
//console.log(addFive(10));

add(8, 9);
add("Bryant", " Wells");

/*var myAge = 27;

if (myAge < 21) {
	console.log("u can't party");
} else {
	console.log("party on garth");
}*/

var hamburgers = 0;

for (var i = 0; i < 10; i++) {
	hamburgers ++;
	console.log(hamburgers);
}

console.log("How many licks does it take to get to the center of the tootsie pop??")

function askMrOwl(numOfLicks) {
	for (var licks = 1; licks <= numOfLicks; licks++) {
		if (licks < numOfLicks) {
			console.log("ahhh " + licks);
		} else {
			console.log("CRUNCH!!");
		}
	}
}

//askMrOwl(18);

function checkerboard(w, h) {
	var checkerboard = "";

	for (var row = 0; row < h; row++) {
		if (row % 2) {
			for (var col = 0; col < w; col++) {
				if (col % 2) {
					checkerboard = checkerboard + "#";
				} else {
					checkerboard = checkerboard + " ";
				}
			}
		} else {
			for (var col = 0; col < w; col++) {
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

checkerboard(16, 8);