//nav
var nav = document.getElementById("nav");
	navBack = document.getElementById("nav_back");
	playerButton = document.getElementById("player_button");
	buttonPlay = document.getElementById("button_play");
	buttonPause = document.getElementById("button_pause");
	bar = document.getElementsByClassName("bar");

//section
var section = document.getElementsByTagName("main");
	jacks = document.getElementById("jacks");
	jack = document.getElementsByClassName("jack");
	name = document.getElementsByClassName("name");

//music
var mControl = document.getElementById("m_control");
	songlist = document.getElementById("songlist");
	songname = document.getElementsByClassName("songname");
	song = document.getElementById("song");
	albumcover = document.getElementById("albumcover");
	lyricalinfo = document.getElementById("lyricalinfo");
	lyrics = document.getElementsByClassName("lyrics");

//video
var vControl = document.getElementById("v_control");
	vLine = document.getElementById("v_line");
	vPlaying = document.getElementById("v_playing");
	vPlaylistInline = document.getElementById("v_playlist_inline");
	video = document.getElementsByClassName("video");

//nav_adjust
navBack.addEventListener("click", function() {
	if (navBack.style.transform == "") {
		nav.style.transform = "translateY(45px)";
		navBack.style.transform = "translateY(45px)";
		playerButton.style.transform = "translateY(-18px)";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 60px)";
		}
	} else {
		nav.style.transform = "";
		navBack.style.transform = "";
		playerButton.style.transform = "";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 105px)";
		}
	}
});

//section_switch
jacks.addEventListener("click", function(e) {
	if (section[e.target.dataset.section].classList.contains("current")) {
		section[e.target.dataset.section].classList.remove("current");
		jack[e.target.dataset.section].classList.remove("current");
		//name[e.target.dataset.section].classList.remove("current");
	} else {
		for (var i=0; i<section.length; i++) {
			if (section[i].classList.contains("current")) {
				section[i].classList.remove("current");
				jack[i].classList.remove("current");
				//name[i].classList.remove("current");
			}
		}
		section[e.target.dataset.section].classList.add("current");
		jack[e.target.dataset.section].classList.add("current");
		//name[e.target.dataset.section].classList.add("current");
	}

	if (section[1].classList.contains("current")) {
		playerButton.classList.add("current");
	} else {
		playerButton.classList.remove("current");
	}
});

//control
mControl.addEventListener("click", function() {
	mControl.style.animation = "";
	if (mControl.style.width == "100%") {
		mControl.style.width = "25%";
		songlist.classList.remove("current");
	} else {
		mControl.style.width = "100%";
		songlist.classList.add("current");
	}
});

vControl.addEventListener("click", function() {
	if (vControl.style.width == "100%") {
		vControl.style.width = "25%";
		vControl.style.opacity = "0.5";
		vPlaying.classList.remove("current");
		vPlaylistInline.classList.remove("current");

	} else {
		vControl.style.width = "100%";
		vControl.style.opacity = "1";
		vPlaying.classList.add("current");
		vPlaylistInline.classList.add("current");
	}
});

//play, pause or loop
playerButton.addEventListener("click", function() {
	if (lyricalinfo.style.borderLeft) {
		console.log("hint");
		if (song.paused) {
			song.play();
			buttonPlay.classList.remove("current");
			buttonPause.classList.add("current");
			albumcover.style.animationPlayState = "running";
			for (var i=0; i<lyrics.length; i++) {
				lyrics[i].style.opacity = "0.8";
			}
		} else {
			song.pause();
			buttonPlay.classList.add("current");
			buttonPause.classList.remove("current");
			albumcover.style.animationPlayState = "paused";
			for (var i=0; i<lyrics.length; i++) {
				lyrics[i].style.opacity = "0.5";
			}
		}
	} else {
		mControl.style.animation = "hint ease-in-out 5s infinite";
	}
});

playerButton.addEventListener("dblclick", function() {
	if (song.loop) {
		song.loop = false;
		playerButton.style.backgroundColor = "black";
		buttonPlay.style.borderLeft = "12px solid #3395AF";
		bar[0].style.backgroundColor = "#3395AF";
		bar[1].style.backgroundColor = "#3395AF";
	} else {
		song.loop = true;
		playerButton.style.backgroundColor = "#3395AF";
		buttonPlay.style.borderLeft = "12px solid black";
		bar[0].style.backgroundColor = "black";
		bar[1].style.backgroundColor = "black";
	}
})

//music_switch
songlist.addEventListener("click", function(e) {
	mControl.style.animation = "";
	if (e.target.classList.contains("songname")) {
		if (e.target.classList.contains("current")) {
			e.target.classList.remove("current");
			song.src = "#";
			albumcover.style.animation = "";
			for (var i=0; i<lyrics.length; i++) {
				lyrics[i].classList.remove("current");
			}
			lyricalinfo.style.borderLeft = "";
			lyricalinfo.style.borderRight = "";
			buttonPlay.classList.add("current");
			buttonPause.classList.remove("current");
		} else {
			for (var i=0; i<songname.length; i++) {
				if (songname[i].classList.contains("current")) {
					songname[i].classList.remove("current");
					song.pause();
					albumcover.style.animation = "";
					for (var i=0; i<lyrics.length; i++) {
						lyrics[i].classList.remove("current");
					}
				}
			}
			e.target.classList.add("current");
			song.src = "assets/media/audio/music/Cro - " + e.target.innerHTML + ".mp3";
			song.play();
			buttonPlay.classList.remove("current");
			buttonPause.classList.add("current");
			albumcover.style.animation = "rtt linear 20s infinite";
			for (var i=0; i<lyrics.length; i++) {
				if (lyrics[i].dataset.lyrics == e.target.innerHTML) {
					lyrics[i].classList.add("current");
				}
			}
			lyricalinfo.style.borderLeft = "1px solid #3395AF";
			lyricalinfo.style.borderRight = "1px solid #3395AF";
		}
	}
});

//video_switch
vLine.addEventListener("click", function(e) {
	if (e.target.classList.contains("preview_pic")) {
		for (var i=0; i<video.length; i++) {
			if (video[i].dataset.video == e.target.dataset.preview) {
				video[i].classList.add("current");
				vLine.removeChild(e.target.parentNode);
				console.log(e.target);
				console.log(vPlaying);
				vPlaying.appendChild(e.target);
			} else if (video[i].classList.contains("current")) {
				video[i].classList.remove("current");
				var vBack = document.createElement("div");
				vLine.appendChild(vBack);
				vBack.classList.add("v_preview");
				vBack.innerHTML = vPlaying.innerHTML;
				vPlaying.innerHTML = "";
				var j = video[i].src;
				video[i].src = "#";
				video[i].src = j;
			}
		}
	}
});