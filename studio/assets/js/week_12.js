var home = document.getElementById("home");
	collection = document.getElementById("collection");
	img1 = document.getElementById("img1");
	img2 = document.getElementById("img1");
	img3 = document.getElementById("img1");
	img4 = document.getElementById("img1");
	img5 = document.getElementById("img1");

img1.addEventListener("click", function() {
	home.style.visibility = "hidden";
	home.style.opacity = "0";
	collection.style.visibility = "visible";
	collection.style.opacity = "1";
});