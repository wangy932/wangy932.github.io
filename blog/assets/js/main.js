//Audio Setup--------------------------------------------------------
/*var audioSrc = {
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
}*/

var audioOri = document.getElementById("original");
var audioIns = document.getElementById("instrumental");


audioOri.addEventListener("ended", function() {
  audioOri.play();
})

audioIns.addEventListener("ended", function() {
  audioIns.play();
})

//Element---------------------------------------------------------------------
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

//Slogan Scroll Animation-------------------------------------
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
//Navigation---------------------------------------------------


function songClick(node) {
  var previousOriSrc = audioOri.src;
  var newOriSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20") + ".m4a";
  var newInsSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20") + "-Instrumental.m4a";
  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    audioOri.pause();
    audioIns.pause();
    if (background.children.length != 0 && background.children[1].classList.contains("current")) {
      bgSwitch(1, 0);
      player.classList.remove("current");
      post.classList.remove("mini");
      post.style.transform = "translateY(0)";
    }
  } else {
    for (var i = 0; i < song.length; i ++) {
      song[i].classList.remove("focus");
    };
    node.classList.add("focus");

    if (newOriSrc != previousOriSrc) {
      audioOri.src = newOriSrc;
      audioIns.src = newInsSrc;
      audioOri.addEventListener("canplaythrough", function() {
        audioOri.play();
      });
      audioIns.addEventListener("canplaythrough", function() {
        audioIns.play();
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
        post.style.transform = "translateY(-250%)";
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
    lightSet(n.item, n.randomw, n.randomh, n.fill, n.stroke, n.rotate, n.breathe);
    stageSet(n.item);
    if (player.classList.contains("current")) {
      bgSwitch(0, 1);
      updateVoc();
      updateIns();
      post.classList.add("mini");
      post.style.transform = "translateY(-250%)";
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


//Analyze Original
var contextOri = new AudioContext();
var analyserOri = contextOri.createAnalyser();
//if (onPlay === true) {
audioOri.addEventListener("canplaythrough", function() {
  var sourceOri = contextOri.createMediaElementSource(audioOri);
  sourceOri.connect(analyserOri);
  analyserOri.connect(contextOri.destination);
});
//};
analyserOri.fftSize = 1024;
var frequencyDataOri = new Uint8Array(analyserOri.frequencyBinCount);
analyserOri.getByteFrequencyData(frequencyDataOri);

//Analyze Instrumental
var contextIns = new AudioContext();
var analyserIns = contextIns.createAnalyser();
//if (onPlay === true) {
audioIns.addEventListener("canplaythrough", function() {
  var sourceIns = contextIns.createMediaElementSource(audioIns);
  sourceIns.connect(analyserIns);
  analyserIns.connect(contextIns.destination);
});
//};
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
    vocal.style.width = 50 + meanVoc*5 + "px";
    vocal.style.height = 50 + meanVoc*5 + "px";
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
    instrumental.style.width = meanIns*4 + "px";
    instrumental.style.height = meanIns*4 + "px";
  }
};


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