//Debt Button
//----------------------------------------------------------
var html = document.documentElement;
	myDebt = 0;

var myButton = document.getElementById("myButton");

myButton.addEventListener("click", function(event) {
	myDebt += 100;
	console.log("my debt = $" + myDebt);

	event.stopPropagation();
});

//Background Button
//----------------------------------------------------------
var bgButton = document.getElementById("bgButton");

bgButton.addEventListener("click", function(event) {1
	if (html.style.backgroundColor != "lightpink") {
		html.style.backgroundColor = "lightpink";
	} else {
		html.style.backgroundColor = "white";
	};

	event.stopPropagation();
});

//Simpson Button
//----------------------------------------------------------
var simpsonButton = document.getElementById("simpsonButton");
	simpsonWrapper = document.getElementById("simpsonWrapper");
	simpsons = [];
	simpsons[0] = "media/fake_bart.png";
	simpsons[1] = "media/krusty.gif";
	simpsons[2] = "media/milhouse.gif";
	simpsons[3] = "media/prince_lisa.png";

simpsonButton.addEventListener("click", function(event) {
	var img = document.createElement("img");
	simpsonWrapper.appendChild(img);
	img.src = simpsons[Math.floor(4*Math.random())];

	event.stopPropagation();
});


//----------------------------------------------------------
html.addEventListener("click", function(event) {
	console.log(event.clientX + "," + event.clientY);

	var sticker = document.createElement("div");
	sticker.classList.add("sticker");
	html.appendChild(sticker);
	sticker.style.left = (event.clientX - 10) + "px";
	sticker.style.top = (event.clientY -10) + "px";
});