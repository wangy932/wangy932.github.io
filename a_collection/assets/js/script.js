//nav
var nav = document.getElementById("nav");
	navBack = document.getElementById("nav_back");
	playerButton = document.getElementById("player_button");
	buttonPlay = document.getElementById("button_play");
	buttonPause = document.getElementById("button_pause");
	bar = document.getElementsByClassName("bar");
	mtvMini = document.getElementById("mtv_mini");
	mtv = document.getElementById("mtv");

//section
var section = document.getElementsByTagName("main");
	jacks = document.getElementById("jacks");
	jack = document.getElementsByClassName("jack");
	names = document.getElementsByClassName("name");
	home = document.getElementById("home");

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

//merch
var mcControl = document.getElementById("mc_control");
	mcsiteList = document.getElementById("mcsite_list");
	mcSite = document.getElementsByClassName("mc_site");
	mcLink = document.getElementsByClassName("mc_link");
	albumSeries = document.getElementById("albumseries");
	amazonLinks = [
	"https://www.amazon.de/gp/product/B00WVN2700/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN2700&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/gp/product/B00WVN1Y5O/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN1Y5O&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/gp/product/B00WVN297Q/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN297Q&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/gp/product/B00WVN21TC/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN21TC&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/gp/product/B00WVN278C/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN278C&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/gp/product/B00WVN22QO/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00WVN22QO&linkCode=as2&tag=wwwchimpera00-21",
	"https://www.amazon.de/Bye-2-Track-Cro/dp/B00YJKOFTE/"
	];
	mediamarktLinks = [
	"http://www.mediamarkt.de/de/product/_mtv-unplugged-hiphop-blu-ray-1997147.html",
	"http://www.mediamarkt.de/de/product/_cro-mtv-unplugged-limitiertes-boxset-hiphop-cd-blu-ray-disc-1997144.html",
	"http://www.mediamarkt.de/de/product/_mtv-unplugged-hiphop-dvd-1997146.html",
	"http://www.mediamarkt.de/de/product/_cro-mtv-unplugged-limitierte-3-lp-inkl-2-cd-hiphop-lp-bonus-cd-1996407.html",
	"http://www.mediamarkt.de/de/product/_cro-mtv-unplugged-hiphop-cd-1996406.html",
	"http://www.mediamarkt.de/de/product/_cro-mtv-unplugged-deluxe-edition-hiphop-cd-1996408.html"
	];
	saturnLinks = [
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-hiphop-blu-ray-1997147.html",
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-limitiertes-boxset-hiphop-cd-blu-ray-disc-1997144.html",
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-hiphop-dvd-1997146.html",
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-limitierte-3-lp-inkl-2-cd-hiphop-lp-bonus-cd-1996407.html",
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-hiphop-cd-1996406.html",
	"http://www.saturn.de/de/product/_cro-mtv-unplugged-deluxe-edition-hiphop-cd-1996408.html"
	];
	merchLinks = [amazonLinks, mediamarktLinks, saturnLinks];

//nav_adjust
navBack.addEventListener("click", function() {
	if (navBack.style.transform == "") {
		nav.style.transform = "translateY(45px)";
		navBack.style.transform = "translateY(45px)";
		playerButton.style.transform = "translateY(-18px)";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 60px)";
		}
		home.style.height = "calc(100% - 60px)";
	} else {
		nav.style.transform = "";
		navBack.style.transform = "";
		playerButton.style.transform = "";
		for (var i=0; i<section.length; i++) {
			section[i].style.height = "calc(100% - 105px)";
		}
		home.style.height = "calc(100% - 105px)";
	}
});

//section_indicate
jacks.addEventListener("mouseover", function(e) {
	if (!section[e.target.dataset.section].classList.contains("current")) {
		for (var i=0; i<section.length; i++) {
			if (section[i].classList.contains("current")) {
				names[i].classList.remove("current");
			}
		}
		names[e.target.dataset.section].classList.add("current");
	}
	jack[e.target.dataset.section].style.animation = "indicate linear 2s infinite";
	names[e.target.dataset.section].style.animation = "hint linear 2s infinite";
});

jacks.addEventListener("mouseout", function(e) {
	if (!section[e.target.dataset.section].classList.contains("current")) {
		for (var i=0; i<section.length; i++) {
			if (section[i].classList.contains("current")) {
				names[i].classList.add("current");
			}
		}
		names[e.target.dataset.section].classList.remove("current");
	}
	jack[e.target.dataset.section].style.animation = "";
	names[e.target.dataset.section].style.animation = "";
});

//section_switch
jacks.addEventListener("click", function(e) {
	if (section[e.target.dataset.section].classList.contains("current")) {
		section[e.target.dataset.section].classList.remove("current");
		jack[e.target.dataset.section].classList.remove("current");
		names[e.target.dataset.section].classList.remove("current");
		mtvMini.classList.remove("current");
		home.classList.add("current");
	} else {
		for (var i=0; i<section.length; i++) {
			if (section[i].classList.contains("current")) {
				section[i].classList.remove("current");
				jack[i].classList.remove("current");
				names[i].classList.remove("current");
			}
		}
		section[e.target.dataset.section].classList.add("current");
		jack[e.target.dataset.section].classList.add("current");
		names[e.target.dataset.section].classList.add("current");
		mtvMini.classList.add("current");
		home.classList.remove("current");
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

mcControl.addEventListener("click", function() {
	mcControl.style.animation = "";
	if (mcControl.style.width == "100%") {
		mcControl.style.width = "25%";
		mcsiteList.classList.remove("current");
	} else {
		mcControl.style.width = "100%";
		mcsiteList.classList.add("current");
	}
});

//play, pause or loop
playerButton.addEventListener("click", function() {
	if (lyricalinfo.style.borderLeft) {
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
				e.target.classList.add("current");
				e.target.classList.remove("pic_inline");
				vPlaying.appendChild(e.target);
			} else if (video[i].classList.contains("current")) {
				video[i].classList.remove("current");
				var vBack = document.createElement("div");
				vLine.appendChild(vBack);
				vBack.classList.add("v_preview");
				var vPre = vPlaying.firstChild;
				vPre.classList.remove("current");
				vPre.classList.add("pic_inline");
				vPlaying.removeChild(vPre);
				vBack.appendChild(vPre);
				var j = video[i].src;
				video[i].src = "#";
				video[i].src = j;
			}
		}
	}
});

albumSeries.addEventListener("click", function() {
	for (var i=0; i<mcLink.length; i++) {
		if (mcLink[i].href == "javascript:void(0)") {
			mcControl.style.animation = "hint ease-in-out 5s infinite";
		}
	}
});

//merch_switch
mcsiteList.addEventListener("click", function(e) {
	mcControl.style.animation = "";
	if (e.target.classList.contains("mc_site")) {
		if (e.target.classList.contains("current")) {
			e.target.classList.remove("current");
			for (var i=0; i<mcLink.length; i++) {
				mcLink[i].href = "javascript:void(0)";
				mcLink[i].style.cursor = "default";
			}
			albumSeries.style.boxShadow = "";
		} else {
			for (var i=0; i<mcSite.length; i++) {
				if (mcSite[i].classList.contains("current")) {
					mcSite[i].classList.remove("current");
				}
			}
			e.target.classList.add("current");
			for (var i=0; i<mcLink.length; i++) {
				mcLink[i].href = merchLinks[e.target.dataset.site][i];
				mcLink[i].style.pointerEvents = "default";
				mcLink[i].style.cursor = "pointer";
			}
			albumSeries.style.boxShadow = "0 0 10px 2px #3395AF";
		}
	}
});