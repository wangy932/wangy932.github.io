var body = document.body;
	circle = document.getElementById("circle");
	bar = document.getElementById("bar");
	section = document.getElementsByTagName("h2");
	list = document.getElementById("list");
	project = document.getElementsByClassName("project");
	background = document.getElementById("background");
	lab = [
	{desc: "Something Beautiful", link: "lab/01_something-beautiful.html"},
	{desc: "Building With CSS", link: "lab/02_building-with-css/index.html"},
	{desc: "Layout With CSS", link: "lab/04_layout-with-css/index.html"},
	{desc: "Responsive Practices", link: "lab/07_smiley/index.html"},
	{desc: "Something Responsive", link: "lab/08_something-responsive/index.html"},
	{desc: "JS Events", link: "lab/09_js-events/index.html"},
	{desc: "JS Quiz", link: "lab/10_js-quiz/index.html"},
	{desc: "Typewriter Workshop", link: "lab/10_typewriter-workshop/index.html"},
	{desc: "Typewriter", link: "lab/11_typewriter/index.html"}];
	studio = [
	{desc: "Week 1", link: "studio/week_01.html"},
	{desc: "Week 2", link: "studio/week_02.html"},
	{desc: "Week 3", link: "studio/week_03.html"},
	{desc: "Week 4", link: "studio/week_04.html"},
	{desc: "Week 5", link: "studio/week_05.html"},
	{desc: "Week 6", link: "studio/week_06.html"},
	{desc: "Week 7", link: "studio/week_07.html"},
	{desc: "Week 8", link: "studio/week_08.html"},
	{desc: "Week 10", link: "studio/week_10.html"},
	{desc: "Week 12", link: "studio/week_12.html"}];


randomGenerator(lab);

circle.addEventListener("click", function() {
	list.innerHTML = "";
	if (circle.style.transform == "") {
		circle.style.transform = "rotate(180deg)";
		colorSwitch("white", "black");
		randomGenerator(studio);
	} else {
		circle.style.transform = "";
		colorSwitch("black", "white");
		randomGenerator(lab);
	}
});

function colorSwitch(color, bgcolor) {
	circle.style.borderColor = color;
	bar.style.backgroundColor = color;
	for (var i=0; i<section.length; i++) {
		section[i].style.color = color;
	}
	for (var i=0; i<project.length; i++) {
		project[i].style.color = color;
	}
	body.style.backgroundColor = bgcolor;
}

function randomGenerator(course) {
	for (var i=0; i<course.length; i++) {
		var item = document.createElement("li");
			link = document.createElement("a");
			desc = document.createElement("h3");
			list.appendChild(item);
			item.appendChild(link);
			link.appendChild(desc);
			item.classList.add("weekly");
			desc.innerText = course[i].desc;
			link.href = course[i].link;
		if (course == lab) {
			item.style.backgroundColor = "black";
			desc.style.color = "white";
		} else {
			item.style.backgroundColor = "white";
			desc.style.color = "black";
		}
		item.style.left = Math.random()*list.offsetWidth + "px";
		item.style.top = Math.random()*list.offsetHeight + "px";
	}

	for (var i=0; i<Math.floor(Math.random()*100); i++) {
		var line = document.createElement("div");
			background.appendChild(line);
			line.classList.add("back");
		if (course == lab) {
			line.style.backgroundColor = "black";
		} else {
			line.style.backgroundColor = "white";
		}
		line.style.height = Math.floor(Math.random()*5)*40 + "px";
		line.style.left = Math.random()*background.offsetWidth + "px";
		line.style.top = Math.random()*background.offsetHeight + "px";
	}

	for (var i=0; i<project.length; i++) {
		project[i].style.left = Math.random()*list.offsetWidth + "px";
		project[i].style.top = Math.random()*list.offsetHeight + "px";
	}
}
