var nav = document.getElementById("nav");
	navBack = document.getElementById("nav_back");

var home = document.getElementById("home");
	tour = document.getElementById("tour");
	music = document.getElementById("music");
	video = document.getElementById("video");
	merch = document.getElementById("merch");
	section = [tour, music, video, merch];
	jacks = document.getElementById("jacks");
	jackTour = document.getElementById("jack_tour");
	jackMusic = document.getElementById("jack_music");
	jackVideo = document.getElementById("jack_video");
	jackMerch = document.getElementById("jack_merch");
	jack = [jackTour, jackMusic, jackVideo, jackMerch];
	nameTour = document.getElementById("name_tour");
	nameMusic = document.getElementById("name_music");
	nameVideo = document.getElementById("name_video");
	nameMerch = document.getElementById("name_merch");
	name = [nameTour, nameMusic, nameVideo, nameMerch];

navBack.addEventListener("click", function() {
	if (navBack.style.transform == "") {
		nav.style.transform = "translateY(50px)";
		navBack.style.transform = "translateY(50px)";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 55px)";
		}
	} else {
		nav.style.transform = "";
		navBack.style.transform = "";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 105px)";
		}
	}
});

jacks.addEventListener("click", function(e) {
	if (section[e.target.dataset.section].classList.contains("s_current")) {
		section[e.target.dataset.section].classList.remove("s_current");
		jack[e.target.dataset.section].classList.remove("j_current");
		//name[e.target.dataset.section].classList.remove("n_current");
	} else {
		for (var i=0; i<section.length; i++) {
			if (section[i].classList.contains("s_current")) {
				section[i].classList.remove("s_current");
				jack[i].classList.remove("j_current");
				//name[i].classList.remove("n_current");
			}
		}
		section[e.target.dataset.section].classList.add("s_current");
		jack[e.target.dataset.section].classList.add("j_current");
		//name[e.target.dataset.section].classList.add("n_current");
	}
});