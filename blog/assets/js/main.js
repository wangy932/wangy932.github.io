//Audio Setup--------------------------------------------------------
var audioOri = document.getElementById("original");
var audioIns = document.getElementById("instrumental");

audioOri.addEventListener("ended", function() {
  audioOri.play();
})
audioIns.addEventListener("ended", function() {
  audioIns.play();
})

//Elements---------------------------------------------------------------------
var slogan = document.getElementById("slogan");

var maintab = document.getElementById("maintab");
var tabitem = document.getElementsByClassName("tabitem");
var postTitle = document.getElementsByClassName("posttitle");

var background = document.getElementById("background");

var post = document.getElementById("post");
var postbg = document.getElementById("postbg");
var text = document.getElementsByClassName("text");
var h1 = document.getElementsByTagName("h1");
var p = document.getElementsByTagName("p");

var player  = document.getElementById("player");
var song = document.getElementsByClassName("song");
var songName = document.getElementsByClassName("songname");

var social = document.getElementById("social");

//Loading---------------------------------------------------------
var loading = {
  start: function() {
    maintab.classList.add("full");
    player.classList.add("full");
    social.classList.add("full");
    player.style.cursor = "default";
    social.style.cursor = "default";
  },
  complete: function() {
    maintab.classList.remove("full");
    player.classList.remove("full");
    social.classList.remove("full");
    player.style.cursor = "pointer";
    social.style.cursor = "pointer";
    for (var i = 0; i < maintab.children.length; i ++) {
      maintab.children[i].classList.add("current");
    };

    //Maintab Event-------------------------------------------------
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

    //Player Event--------------------------------------------------
    player.addEventListener("click", function(e) {
      if (e.target.nodeName == "H2") {
        songClick(e.target.parentNode);
      } else if (e.target.nodeName == "DIV") {
        songClick(e.target);
      }
    });

    player.addEventListener("mouseover", function() {
      if (!player.classList.contains("menu")) {
        if (player.classList.contains("current")) {
          player.classList.remove("current");
        }
        player.classList.add("menu");
        for (var i = 0; i < song.length; i ++) {
          song[i].classList.add("current");
        }
      }
    });

    player.addEventListener("mouseout", function() {
      if (player.classList.contains("menu")) {
        player.classList.remove("menu");
        for (var i = 0; i < song.length; i ++) {
          if (song[i].classList.contains("current")) {
            song[i].classList.remove("current");
          }
          if (song[i].classList.contains("focus") && background.children.length != 0) {
            player.classList.add("current");
          }
        }
      }
    });
  }
};

loading.start();

document.addEventListener("readystatechange", function() {
  if (document.readyState == "complete") {
    loading.complete();
  };
});

//Slogan Scroll Animation-----------------------------------------
var countup = false;

function sloganScroll() {
  if (countup == false) {
    slogan.scrollTop += slogan.scrollHeight / 3;
    if (slogan.scrollTop >= slogan.scrollHeight / 3 * 2) {
      countup = true;
    }
  } else if (countup == true) {
    slogan.scrollTop -= slogan.scrollHeight / 3;
    if (slogan.scrollTop <= 0) {
      countup = false;
    }
  };
};

var sloganInterval = setInterval(function() {
  sloganScroll();
}, 2500);

//Event Functions---------------------------------------------------
function songClick(node) {
  var previousOriSrc = audioOri.src;
  var newOriSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + ".m4a";
  var newInsSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + "-Instrumental.m4a";
  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    audioOri.pause();
    audioIns.pause();
    if (background.children.length != 0 && background.children[1].classList.contains("current")) {
      bgSwitch(1, 0);
      player.classList.remove("current");
      if (post.classList.contains("mini")) {
        post.classList.remove("mini");
      }
    }
  } else {
    for (var i = 0; i < song.length; i ++) {
      song[i].classList.remove("focus");
    };
    node.classList.add("focus");

    for (var i = 0; i < song.length; i ++) {
      if (song[i].classList.contains("focus")) {
        scrollTo(player, i * ((player.clientHeight-1) / 3), 900);
      }
    }

    if (newOriSrc != previousOriSrc) {
      audioOri.src = newOriSrc;
      audioIns.src = newInsSrc;
      audioOri.addEventListener("canplay", function() {
        audioIns.addEventListener("canplay", function() {
          audioOri.play();
          audioIns.play();
        })
      })
    } else {
      audioOri.play();
      audioIns.play();
    }
    audioIns.volume = 0.8;

    if (background.children.length != 0) {
      if (background.children[0].classList.contains("current")) {
        bgSwitch(0, 1);
        post.classList.add("mini");
      }
      updateVoc();
      updateIns();
    }
  }

  for (var i = 0; i < songName.length; i ++) {
    if (songName[i].parentNode == node) {
      if (!songName[i].classList.contains("current")) {
        songName[i].classList.add("current");
      } else {
        songName[i].classList.remove("current");
      }
    } else {
      songName[i].classList.remove("current");
    }
  };
};

function tabitemClick(node) {
  background.innerHTML = "";
  for (var i = 0; i < song.length; i ++) {
    if (song[i].classList.contains("focus")) {
      player.classList.add("current");
    }
  }
  if (node.classList.contains("focus")) {
    player.classList.remove("current");
    node.classList.remove("focus");
    post.classList.remove("current");
    slogan.classList.add("current");
    var sloganInterval = setInterval(function() {
      sloganScroll();
    }, 6000);
  } else {
    clearInterval(sloganInterval);
    slogan.classList.remove("current");
    for (var i = 0; i < tabitem.length; i ++) {
      tabitem[i].classList.remove("focus");
      if (node == tabitem[i] && !tabitem[i].classList.contains("menu")) {
        scrollTo(maintab, i * (maintab.clientHeight), 500);
      }
    }
    node.classList.add("focus");
    post.classList.add("current");
    var n = node.dataset;
    lightSet(n.item, n.randomw, n.randomh, n.fill, n.stroke, n.radius, n.rotate, n.breathe);
    stageSet(n.item);
    if (player.classList.contains("current")) {
      bgSwitch(0, 1);
      updateVoc();
      updateIns();
      post.classList.add("mini");
    } else {
      bgSwitch(1, 0);
    }
  }
  for (var i = 0; i < postTitle.length; i ++) {
    if (postTitle[i].parentNode == node) {
      if (!postTitle[i].classList.contains("current")) {
        postTitle[i].classList.add("current");
      } else {
        postTitle[i].classList.remove("current");
      }
    } else {
      postTitle[i].classList.remove("current");
    }
  };
  postInOut(node);
};

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
};

//Post Animation---------------------------------------------------
post.addEventListener("click", function() {
  if (background.children.length != 0 && background.children[1].classList.contains("current")) {
    if (post.classList.contains("mini")) {
      post.classList.remove("mini");
    } else {
      post.classList.add("mini");
    }
  }
})

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
function lightSet(pattern, randomw, randomh, fill, stroke, radius, rotate, breathe) {
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
    /*if (radius == 1) {
      divLiv.style.borderRadius = "50%";
    }*/
    if (rotate == 1) {
      divLit.style.transform = "rotate(" + Math.random()*360 + "deg)";
    }
    divLit.style.opacity = Math.random();
    divLit.style.animationName = "breathe" + breathe;
    divLit.style.animationDelay = Math.random() + "s";
    effect.appendChild(divCol);
    divCol.appendChild(divLit);
  }
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

//Audio Analysis-------------------------------------------------
//Analyze Original
var contextOri = new AudioContext();
var analyserOri = contextOri.createAnalyser();
audioOri.addEventListener("canplaythrough", function() {
  var sourceOri = contextOri.createMediaElementSource(audioOri);
  sourceOri.connect(analyserOri);
  analyserOri.connect(contextOri.destination);
});
analyserOri.fftSize = 1024;
var frequencyDataOri = new Uint8Array(analyserOri.frequencyBinCount);
analyserOri.getByteFrequencyData(frequencyDataOri);

//Analyze Instrumental
var contextIns = new AudioContext();
var analyserIns = contextIns.createAnalyser();
audioIns.addEventListener("canplaythrough", function() {
  var sourceIns = contextIns.createMediaElementSource(audioIns);
  sourceIns.connect(analyserIns);
  analyserIns.connect(contextIns.destination);
});
analyserIns.fftSize = 1024;
var frequencyDataIns = new Uint8Array(analyserIns.frequencyBinCount);
analyserIns.getByteFrequencyData(frequencyDataIns);

function updateVoc() {
  if (background.children.length != 0) {
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
    
    for (var i = 0; i < tabitem.length; i ++) {
      if (tabitem[i].classList.contains("focus")) {
        var randomw = tabitem[i].dataset.randomw;
        var randomh = tabitem[i].dataset.randomh;
        var fill = tabitem[i].dataset.fill;
        var stroke = tabitem[i].dataset.stroke;
        var radius = tabitem[i].dataset.radius;
        var rotate = tabitem[i].dataset.rotate;
        var breathe = tabitem[i].dataset.breathe;
        var n = i;
      }
    }

    if (randomw == 1) {
      vocal.style.width = meanVoc*5 + "px";
    } else {
      vocal.style.width = "2px";
    }
    if (randomh == 1 || breathe == 4) {
      vocal.style.height = meanVoc*5 + "px";
    } else {
      vocal.style.height = "2px";
    }
    if (randomw == 0 && randomh == 0) {
      vocal.style.width = vocal.style.height = meanVoc*4 + "px";
    }
    if (fill == 1) {
      vocal.style.backgroundColor = "white";
    }
    if (stroke == 1) {
      vocal.style.border = "white 1px solid";
    } else if (stroke == 2) {
      var borderRandom = ["borderTop", "borderBottom", "borderLeft", "borderRight"]
      vocal.style[borderRandom[Math.floor(Math.random()*borderRandom.length)]] = "white 1px solid";
    }
    if (radius == 1) {
      vocal.style.borderRadius = "50%";
    }
    if (rotate == 1) {
      vocal.style.transform = "rotate(" + meanVoc + "deg)";
    }
    if (breathe == 0) {
      vocal.style.boxShadow = "0 0 " + 25 + "px " + meanVoc/10 + "px white";
    } else if (breathe == 1) {
      vocal.style.backgroundColor = "rgba(255, 255, 255, " + meanVoc/80 + ")";
    } else if (breathe == 2) {
      vocal.style.opacity = meanVoc/80;
    } else if (breathe == 3) {
      vocal.style.top = vocal.style.left = "-" + meanVoc/2 +"%";
    }
    if (n == 1) {
      vocal.style.transform = "";
    } else if (n == 2) {
      vocal.style.top = "-" + meanVoc/2 +"%";
    } else if (n == 3) {
      vocal.style.width = "2px";
      vocal.style.height = meanVoc*5 + "px";
      vocal.style.left = "-" + meanVoc/2 +"%";
    } else if (n == 4) {
      vocal.style.top = vocal.style.left = "-" + meanVoc/2 +"%";
    } else if (n == 7) {
      vocal.style.top = vocal.style.left = "-" + meanVoc/2 +"%";
    } else if (n == 8) {
      vocal.style.backgroundColor = "rgba(0, 0, 0, " + meanVoc/80 + ")";
    }
  }
};

function updateIns() {
  if (background.children.length != 0) {
    requestAnimationFrame(updateIns);
    analyserIns.getByteFrequencyData(frequencyDataIns);
    
    var total = 0;
    for (var i = 0; i < frequencyDataIns.length; i ++) {
      total += frequencyDataIns[i];
    }

    var meanIns = total/frequencyDataOri.length;
    var instrumental = document.querySelector(".instrumental");
    
    for (var i = 0; i < tabitem.length; i ++) {
      if (tabitem[i].classList.contains("focus")) {
        var randomw = tabitem[i].dataset.randomw;
        var randomh = tabitem[i].dataset.randomh;
        var fill = tabitem[i].dataset.fill;
        var stroke = tabitem[i].dataset.stroke;
        var radius = tabitem[i].dataset.radius;
        var rotate = tabitem[i].dataset.rotate;
        var breathe = tabitem[i].dataset.breathe;
        var n = i;
      }
    }

    if (randomw == 1) {
      instrumental.style.width = meanIns*4 + "px";
    } else {
      instrumental.style.width = "2px";
    }
    if (randomh == 1 || breathe == 4) {
      instrumental.style.height = meanIns*4 + "px";
    } else {
      instrumental.style.height = "2px";
    }
    if (randomw == 0 && randomh == 0) {
      instrumental.style.width = instrumental.style.height = meanIns*4 + "px";
    }
    if (fill == 1) {
      instrumental.style.backgroundColor = "white";
    }
    if (stroke == 1) {
      instrumental.style.border = "white 1px solid";
    } else if (stroke == 2) {
      var borderRandom = ["borderTop", "borderBottom", "borderLeft", "borderRight"]
      instrumental.style[borderRandom[Math.floor(Math.random()*borderRandom.length)]] = "white 1px solid";
    }
    if (radius == 1) {
      instrumental.style.borderRadius = "50%";
    }
    /*if (rotate == 1) {
      instrumental.style.transform = "rotate(" + meanIns + "deg)";
    }*/
    if (breathe == 0) {
      instrumental.style.boxShadow = "0 0 " + 25 + "px " + meanIns/10 +"px white";
    } else if (breathe == 1) {
      instrumental.style.backgroundColor = "rgba(255, 255, 255, " + meanIns/180 + ")";
    } else if (breathe == 2) {
      instrumental.style.opacity = meanIns/180;
    } else if (breathe == 3) {
      instrumental.style.top = instrumental.style.left = meanIns/4 + "%";
    }
    if (n == 1) {
      instrumental.style.transform = "rotate(" + meanIns + "deg)";
    } if (n == 2) {
      instrumental.style.top = meanIns/4 + "%";
    } else if (n == 3) {
      instrumental.style.width = "2px";
      instrumental.style.height = meanIns*4 + "px";
      instrumental.style.left = meanIns/4 + "%";
    } else if (n == 4) {
      instrumental.style.top = instrumental.style.left = meanIns/4 + "%";
      instrumental.style.transform = "rotate(" + meanIns + "deg)";
    } else if (n == 7) {
      instrumental.style.top = instrumental.style.left = meanIns/4 + "%";
    }
  }
};

//Scroll Animation----------------------------------------------
function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

//Background Switch-------------------------------------------
function bgSwitch(n1, n2) {
  background.children[n1].style.display = "none";
  background.children[n2].style.display = "block";
  background.children[n1].classList.remove("current");
  setTimeout(function() {
    background.children[n2].classList.add("current");
  }, 500);
};