var wrapper = document.getElementsByClassName("wrapper");
	word = document.getElementsByClassName("word");
	dotgroup = document.getElementsByClassName("dotgroup");
	dot = document.getElementsByClassName("dot");

for (var i = 0; i < wrapper.length; i ++) {
	wrapper[i].addEventListener("click", function(e) {
		if (e.target.classList.contains("dot")) {
			if (e.target.classList.contains("current")) {
				e.target.classList.remove("current")
			} else {
				e.target.classList.add("current");
			}
			//console.log(e.target.parentNode.children.length);
			var currentDot = 0;
			for (var j = 0; j < e.target.parentNode.children.length; j ++) {
				if (e.target.parentNode.children[j].classList.contains("current")) {
					currentDot = currentDot + 1;
				}
			}
			//console.log(currentDot/e.target.parentNode.children.length);
			//console.log(e.target.parentNode.parentNode.children[0]);
			e.target.parentNode.parentNode.children[0].style.opacity = 1 - currentDot/e.target.parentNode.children.length;
		}
	})
}


