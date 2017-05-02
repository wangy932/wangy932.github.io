var wrapper = document.getElementById("wrapper");

wrapper.addEventListener("scroll", function(e) {
	wrapper.style.backgroundColor = "darkgrey";
	setTimeout(function() {
		wrapper.style.backgroundColor = "#de2930";
	}, 3000);
})