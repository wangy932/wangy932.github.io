var audioSrc = {
    song1: {name: "Ratten"},
    song2: {name: "Diamanten"},
    song3: {name: "Mehr als ein Job"},
    song4: {name: "Hande weg (feat. Rico)"},
    song5: {name: "2 Seelen"},
    song6: {name: "Power"},
    song7: {name: "Plem Plem (feat. Raf Camora & Bonez MC)"},
    song8: {name: "Einfach"},
    song9: {name: "Gute Nacht"},
    song10: {name: "Mosaik (feat. Rico)"},
    song11: {name: "Wie du"},
    song12: {name: "Gift (feat. BTNG & AK Ausser Kontrolle)"},
    song13: {name: "Instinkt"},
    song14: {name: "Jedes Mal (feat. Fatal & Skepsis)"},
    song15: {name: "Kreis (feat. Bausa)"},
    song16: {name: "Lass mal"},
    song17: {name: "Glucklichen"},
    song18: {name: "Lass mich los"}
}

for (song in audioSrc) {
    audioSrc[song].original = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + audioSrc[song].name + ".m4a";
    audioSrc[song].instrumental = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + audioSrc[song].name + "-Instrumental.m4a";
}

var button = document.getElementById("button");

var audioOri = document.getElementById("original");
var audioIns = document.getElementById("instrumental");
var circleVoc = document.getElementById("v1");
var circleIns = document.getElementById("v2");

//---------------------------------------------------------------
var maintab = document.getElementById("maintab");
var tabitem = document.getElementsByClassName("tabitem");
var background = document.getElementById("background");
var post = document.getElementById("post");
var postbg = document.getElementById("postbg");
var text = document.getElementsByClassName("text");
var h1 = document.getElementsByTagName("h1");
var h2 = document.getElementsByTagName("h2");
var p = document.getElementsByTagName("p");

//loading---------------------------------------------------------
var loading = {
  start: function() {
    maintab.classList.add("menu");
    maintab.style.backgroundColor = "white";
  },
  complete: function() {
    maintab.classList.remove("menu");
    maintab.style.backgroundColor = "black";
    for (var i = 0; i < maintab.children.length; i ++) {
      maintab.children[i].classList.add("current");
    };
  }
};

loading.start();

document.addEventListener("readystatechange", function() {
  console.log(document.readyState);
  if (document.readyState == "complete") {
    loading.complete();
  };
});

//Navigation---------------------------------------------------
maintab.addEventListener("click", function(e) {
  if (e.target.nodeName == "H2") {
    tabitemClick(e.target.parentNode);
  } else if (e.target.nodeName == "DIV") {
    tabitemClick(e.target);
  } else if (e.target.nodeName == "MAIN") {
    if (e.target.classList.contains("menu")) {
      e.target.classList.remove("menu");
      for (var i = 0; i < tabitem.length; i ++) {
        tabitem[i].classList.remove("menu");
      };
      post.style.opacity = "1";
      setTimeout(function() {
        for (var i = 0; i < tabitem.length; i ++) {
          if (tabitem[i].classList.contains("focus")) {
            scrollTo(maintab, i * (maintab.clientHeight), 900);
          };
       };
      }, 1000);
    } else {
      e.target.classList.add("menu");
      for (var i = 0; i < tabitem.length; i ++) {
        tabitem[i].classList.add("menu");
      }
      post.style.opacity = "0.5";
      scrollTo(maintab, 0, 10);
    }
  }
});

function tabitemClick(node) {
  background.innerHTML = "";
  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    post.classList.remove("current");
  } else {
    for (var i = 0; i < tabitem.length; i ++) {
      tabitem[i].classList.remove("focus");
      if (node == tabitem[i] && !tabitem[i].classList.contains("menu")) {
        scrollTo(maintab, i * (maintab.clientHeight), 500);
      }
    }
    node.classList.add("focus");
    post.classList.add("current");
    var n = node.dataset;
    lightSet(n.item, n.randomw, n.randomh, n.fill, n.stroke, n.rotate, n.breathe);
    stageSet(n.item);
  }
  postInOut(node);
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

function postInOut(nd) {
  for (var i = 0; i < text.length; i ++) {
    if (text[i].dataset.content == nd.dataset.item) {
      var focus = text[i];
      focus.style.display = "block";
      focus.classList.add("current");
      if (!focus.children[0].classList.contains("current")) {
        setTimeout(function() {
          focus.children[0].classList.add("current");
          focus.children[1].classList.add("current");
        }, 100);
      } else {
        focus.children[0].classList.remove("current");
        focus.children[1].classList.remove("current");
      }
    } else {
      var blur = text[i];
      blur.style.display = "none";
      blur.classList.remove("current");
      blur.children[0].classList.remove("current");
      blur.children[1].classList.remove("current");
    }
  };
  for (var i = 0; i < h2.length; i ++) {
    if (h2[i].parentNode == nd) {
      if (!h2[i].classList.contains("current")) {
        h2[i].classList.add("current");
      } else {
        h2[i].classList.remove("current");
      }
    } else {
      h2[i].classList.remove("current");
    }
  };
}

//Background Animation for Text---------------------------------
for (var i = 0; i < p.length; i ++) {
  p[i].addEventListener("scroll", function() {
    postbg.style.transition = "opacity 1s";
    postbg.style.opacity = "1";
    setTimeout(function() {
      postbg.style.transition = "opacity 8s";
      postbg.style.opacity = "0.7";
    }, 1000);
  });
}

//Lighting Set Change------------------------------------------
function lightSet(pattern, randomw, randomh, fill, stroke, rotate, breathe) {
  var effect = document.createElement("section");
  effect.classList.add("effect");
  background.appendChild(effect);
  for (var i = 0; i < 72; i ++) {
    var divCol = document.createElement("div");
    var divLit = document.createElement("div");
    divCol.classList.add("col", "col-1-12");
    divLit.classList.add(pattern, "pattern", "center");
    if (randomw == 1) {
      divLit.style.width = Math.random()*window.innerWidth/12 + "px";
    }
    if (randomh == 1) {
      if (randomw == 1) {
        divLit.style.height = divLit.style.width;
      } else {
        divLit.style.height = Math.random()*window.innerHeight/6 + "px";
      }
    }
    if (fill == 1) {
      divLit.style.backgroundColor = "white";
    }
    if (stroke == 1) {
      divLit.style.border = "white 1px solid";
    } else if (stroke == 2) {
      var borderRandom = ["borderTop", "borderBottom", "borderLeft", "borderRight"]
      divLit.style[borderRandom[Math.floor(Math.random()*borderRandom.length)]] = "white 1px solid";
    }
    if (rotate == 1) {
      divLit.style.transform = "rotate(" + Math.random()*360 + "deg)";
    }
    divLit.style.opacity = Math.random();
    divLit.style.animationName = "breathe" + breathe;
    divLit.style.animationDelay = Math.random() + "s";
    effect.appendChild(divCol);
    divCol.appendChild(divLit);
  }
  var effect = document.querySelector(".effect");
  effect.style.display = "block";
  setTimeout(function() {
    effect.classList.add("current");
  }, 500);
}

function stageSet(perform) {
  var stage = document.createElement("section");
  stage.classList.add("stage");
  background.appendChild(stage);
  var vocal = document.createElement("div");
  var instrumental = document.createElement("div");
  vocal.classList.add(perform, "vocal", "perform", "center");
  instrumental.classList.add(perform, "instrumental", "perform", "center");
  stage.appendChild(vocal);
  stage.appendChild(instrumental);
}

var onPlay = false;

button.addEventListener("click", function() {
  var randomize = Math.ceil(Math.random()*Object.keys(audioSrc).length);
  audioOri.src = audioSrc["song" + randomize].original;
  audioIns.src = audioSrc["song" + randomize].instrumental;
  if (background.children.length != 0) {
    if (background.children[0].classList.contains("current")) {
      bgSwitch(0, 1);
      post.style.transform = "translateX(-100%)";
      audioOri.play();
      audioIns.play();
      audioIns.volume = 0.8;
      updateVoc();
      updateIns();
      onPlay = true;
    } else {
      bgSwitch(1, 0);
      post.style.transform = "translateX(0)";
      audioOri.pause();
      audioIns.pause();
      onPlay = false;
    }
  }
});

//Analyze Original
var contextOri = new AudioContext();
var analyserOri = contextOri.createAnalyser();
audioOri.addEventListener("canplaythrough", function() {
  if (onPlay == false) {
    return;
  } else {
    var sourceOri = contextOri.createMediaElementSource(audioOri);
    sourceOri.connect(analyserOri);
    analyserOri.connect(contextOri.destination);
  }
});
analyserOri.fftSize = 1024;
var frequencyDataOri = new Uint8Array(analyserOri.frequencyBinCount);
analyserOri.getByteFrequencyData(frequencyDataOri);

//Analyze Instrumental
var contextIns = new AudioContext();
var analyserIns = contextIns.createAnalyser();
audioIns.addEventListener("canplaythrough", function() {
  if (onPlay == false) {
    return;
  } else {
    var sourceIns = contextIns.createMediaElementSource(audioIns);
    sourceIns.connect(analyserIns);
    analyserIns.connect(contextIns.destination);
  }
});
analyserIns.fftSize = 1024;
var frequencyDataIns = new Uint8Array(analyserIns.frequencyBinCount);
analyserIns.getByteFrequencyData(frequencyDataIns);

function updateVoc() {
  requestAnimationFrame(updateVoc);
  analyserOri.getByteFrequencyData(frequencyDataOri);

  var totalOri = 0;
  var totalIns = 0;
  for (var i = 0; i < frequencyDataOri.length; i ++) {
    totalOri += frequencyDataOri[i];
  }
  for (var i = 0; i < frequencyDataIns.length; i ++) {
    totalIns += frequencyDataIns[i];
  }
  var totalVoc = totalOri - totalIns;

  var meanVoc = totalVoc/frequencyDataOri.length;
  var vocal = document.querySelector(".vocal");
  vocal.style.width = 50 + meanVoc*5 + "px";
  vocal.style.height = 50 + meanVoc*5 + "px";
};

function updateIns() {
  requestAnimationFrame(updateIns);
  analyserIns.getByteFrequencyData(frequencyDataIns);

  var total = 0;
  for (var i = 0; i < frequencyDataIns.length; i ++) {
    total += frequencyDataIns[i];
  }

  var meanIns = total/frequencyDataOri.length;
  var instrumental = document.querySelector(".instrumental");
  instrumental.style.width = meanIns*4 + "px";
  instrumental.style.height = meanIns*4 + "px";
};


//Background Animation for Music---------------------------------
function bgSwitch(n1, n2) {
  background.children[n1].style.display = "none";
  background.children[n2].style.display = "block";
  background.children[n1].classList.remove("current");
  setTimeout(function() {
    background.children[n2].classList.add("current");
  }, 500);
}
