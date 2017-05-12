//Audio Setup--------------------------------------------------------
var audioMix = document.getElementById("mixed");
var audioIns = document.getElementById("instrumental");

audioMix.addEventListener("ended", function() {
  audioMix.play();
})
audioIns.addEventListener("ended", function() {
  audioIns.play();
})

//Elements---------------------------------------------------------------------
var slogan = document.getElementById("slogan");

var musicTab  = document.getElementById("musictab");
var song = document.getElementsByClassName("song");
var songName = document.getElementsByClassName("songname");

var blogTab = document.getElementById("blogtab");
var post = document.getElementsByClassName("post");
var postTitle = document.getElementsByClassName("posttitle");

var social = document.getElementById("social");
var media = document.getElementsByClassName("media");
var mediaName = document.getElementsByClassName("mediaName");

var excerpt = document.getElementById("excerpt");

var content = document.getElementById("content");
var text = document.getElementsByClassName("text");
var h1 = document.getElementsByTagName("h1");
var p = document.getElementsByTagName("p");

var background = document.getElementById("background");

//Loading---------------------------------------------------------
var loading = {
  start: function() {
    musicTab.classList.add("full");
    blogTab.classList.add("full");
    social.classList.add("full");
  },
  complete: function() {
    musicTab.classList.remove("full");
    blogTab.classList.remove("full");
    social.classList.remove("full");
    for (var i = 0; i < musicTab.children.length; i ++) {
      musicTab.children[i].classList.add("current");
    };
    for (var i = 0; i < blogTab.children.length; i ++) {
      blogTab.children[i].classList.add("current");
    };
    slogan.classList.add("current");

    //Orientation
    document.addEventListener("mousemove", function(e) {
      if (e.clientY / window.innerHeight <= 1 / 2 - 1 / 12 && e.clientX / window.innerWidth <= 1 / 3) {
        addMenu(musicTab);
      } else {
        removeMenu(musicTab);
      };

      if (e.clientY / window.innerHeight >= 1 / 2 + 1 / 12 && e.clientX / window.innerWidth >= 2 / 3) {
        addMenu(blogTab);
      } else {
        removeMenu(blogTab);
      };
    });

    //MusicTab Events
    musicTab.addEventListener("click", function(e) {
      if (e.target.nodeName == "H2") {
        songClick(e.target.parentNode);
      } else if (e.target.nodeName == "DIV") {
        songClick(e.target);
      }
    });

    //BlogTab Events
    blogTab.addEventListener("click", function(e) {
      if (e.target.nodeName == "H2") {
        postClick(e.target.parentNode);
      } else if (e.target.nodeName == "DIV") {
        postClick(e.target);
      };
    });

    blogTab.addEventListener("mouseover", function(e) {
      if (e.target.nodeName == "H2" || e.target.nodeName == "DIV") {
        var topOption = ["calc(100% / 3)", "calc(100% / 3 * 2 - 14px)"];
        var leftOption = ["calc(100% / 6)", "calc(100% / 6 * 4)"]
        excerpt.style.top = topOption[Math.floor(Math.random()*topOption.length)];
        excerpt.style.left = leftOption[Math.floor(Math.random()*leftOption.length)];
        setTimeout(function() {
          excerpt.classList.add("current");
        }, 50);
        if (e.target.nodeName == "H2") {
          var targetContent = e.target.parentNode.dataset.content;
        } else if (e.target.nodeName == "DIV") {
          var targetContent = e.target.dataset.content;
        }
        for (var i = 0; i < excerpt.children.length; i ++) {
          if (excerpt.children[i].dataset.content == targetContent) {
            excerpt.children[i].classList.add("current");
          } else {
            if (excerpt.children[i].classList.contains("current")) {
              excerpt.children[i].classList.remove("current");
            };
          };
        };
      } else {
        if (excerpt.classList.contains("current")) {
          excerpt.classList.remove("current");
        };
      };
    });

    blogTab.addEventListener("mouseout", function(e) {
        if (e.target.nodeName == "H2" || e.target.nodeName == "DIV") {
          if (excerpt.classList.contains("current")) {
            excerpt.classList.remove("current");
          };
        };
    });

    background.addEventListener("mouseover", function(e) {
      if (excerpt.classList.contains("current")) {
        excerpt.classList.remove("current");
      };
    });

    //Keyboard Events
    document.addEventListener("keydown", function(e) {
      e.preventDefault();

      if (e.keyCode == 38) {//Up Arrow
        addMenu(blogTab);
        if (musicTab.classList.contains("menu")) {
          removeMenu(musicTab);
        };
      } else if (e.keyCode == 40) {//Down Arrow
          addMenu(musicTab);
          if (blogTab.classList.contains("menu")) {
            removeMenu(blogTab);
          };
      } else if (e.keyCode == 32) {//Space = Pause/Play
        clearInterval(musicTabInterval);
        for (var i = 0; i < songName.length; i ++) {
          if (audioMix.src == "http://www.yuqiwang.graphics/blog/assets/media/audio/" + songName[i].innerHTML.split(" ").join("%20").split("&amp;").join("&") + ".m4a") {
            if (audioMix.paused) {
              audioPlaySet();
              songName[i].classList.add("current");
              songName[i].parentNode.classList.add("focus");
              audioMix.play();
              audioIns.play();
              audioIns.volume = 0.8;
              setTimeout(function() {
                for (var i = 0; i < song.length; i ++) {
                  if (song[i].classList.contains("focus")) {
                    scrollTo(musicTab, i * musicTab.clientHeight, 1800);
                  };
                };
              }, 1300);
            } else if (!audioMix.paused) {
              audioPauseSet();
              if (songName[i].classList.contains("current")) {
                songName[i].classList.remove("current");
              };
              songName[i].parentNode.classList.remove("focus");
            };
          };
        };
      } else if (e.keyCode == 27) {//ESC = Back Home
        setBlogTabInterval();
        if (background.children.length != 0) {
          background.innerHTML = "";
          for (var i = 0; i < post.length; i ++) {
            if (post[i].classList.contains("focus")) {
              var target = post[i];
              target.classList.remove("focus");
              target.children[0].classList.remove("current");
            };
          };
          content.classList.remove("current");
          slogan.classList.add("current");
          sloganInterval = setInterval(function() {
            sloganScroll();
          }, 2500);
          postInOut(target);
        }
      };
    });


    //Social Events--------------------------------------------------
    /*social.addEventListener("mouseover", function() {
      socialMenuAdd();
    });

    social.addEventListener("mouseout", function() {
      socialMenuRemove();
    });*/
  }
};

loading.start();

document.addEventListener("readystatechange", function() {
  if (document.readyState == "complete") {
    loading.complete();
  };
});

//Slogan & Tab Scroll Animation-----------------------------------------
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

function tabScroll(tab) {
  if (!tab.classList.contains("menu")) {
    tab.scrollTop = tab.clientHeight * Math.floor(Math.random()*post.length);
  }
};

sloganInterval = setInterval(function() {
  sloganScroll();
}, 2500);

function setMusicTabInterval() {
  musicTabInterval = setInterval(function() {
    tabScroll(musicTab);
  }, 3000);
};

function setBlogTabInterval() {
  blogTabInterval = setInterval(function() {
    tabScroll(blogTab);
  }, 3000);
};

setMusicTabInterval();
setBlogTabInterval();

//--------------------------------------------------------------


function socialMenuAdd() {
  if (!social.classList.contains("menu")) {
    social.classList.add("menu");
    for (var i = 0; i < media.length; i ++) {
      media[i].classList.add("current");
    }
  }
};

function socialMenuRemove() {
  if (social.classList.contains("menu")) {
    social.classList.remove("menu");
    for (var i = 0; i < media.length; i ++) {
      media[i].classList.remove("current");
    }
  }
};

//BlogTab Functions---------------------------------------------------
function postClick(node) {
  background.innerHTML = "";
  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    for (var i = 0; i < postTitle.length; i ++) {
      if (postTitle[i].parentNode == node) {
        postTitle[i].classList.remove("current");
      }
    };
    content.classList.remove("current");
    slogan.classList.add("current");
    sloganInterval = setInterval(function() {
      sloganScroll();
    }, 2500);
    setBlogTabInterval();
  } else {
    clearInterval(blogTabInterval);
    slogan.classList.remove("current");
    clearInterval(sloganInterval);
    for (var i = 0; i < post.length; i ++) {
      post[i].classList.remove("focus");
    }
    node.classList.add("focus");
    for (var i = 0; i < postTitle.length; i ++) {
      if (postTitle[i].classList.contains("current")) {
        postTitle[i].classList.remove("current");
      }
      if (postTitle[i].parentNode == node) {
        postTitle[i].classList.add("current");
      }
    };
    content.classList.add("current");
    var n = node.dataset;
    effectSet(n.content, n.width, n.height, n.fill, n.stroke, n.radius, n.rotate, n.breathe);
    stageSet(n.content);
    if (!audioMix.paused) {
      console.log("hi");
      updateVoc();
      updateIns();
      content.classList.add("mini");
      bgSwitch(0, 1);
    } else {
      bgSwitch(1, 0);
    };
  };
  postInOut(node);
};

function postInOut(nd) {
  for (var i = 0; i < text.length; i ++) {
    if (text[i].dataset.content == nd.dataset.content) {
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

//Content Animation
content.addEventListener("click", function() {
  if (background.children.length != 0 && background.children[1].classList.contains("current")) {
    if (content.classList.contains("mini")) {
      content.classList.remove("mini");
    } else {
      content.classList.add("mini");
    }
  }
})

for (var i = 0; i < p.length; i ++) {
  p[i].addEventListener("scroll", function() {
    content.style.transition = "background-color 1s width 1s, height 1.8s, border 1.8s, transform 2.5s, opacity 1s";
    content.style.backgroundColor = "rgba(0, 0, 0, 1)";
    setTimeout(function() {
      content.style.transition = "background-color 8s width 1s, height 1.8s, border 1.8s, transform 2.5s, opacity 1s";
      content.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    }, 1000);
  });
}

//MusicTab Functions---------------------------------------------------
function songClick(node) {
  clearInterval(musicTabInterval);
  var previousMixSrc = audioMix.src;
  var newMixSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + ".m4a";
  var newInsSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + "-Instrumental.m4a";

  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    for (var i = 0; i < songName.length; i ++) {
      if (songName[i].parentNode == node) {
        songName[i].classList.remove("current");
      }
    };
    audioPauseSet();
    setMusicTabInterval();
  } else {
    clearInterval(musicTabInterval);
    audioPlaySet();
    node.classList.add("focus");
    for (var i = 0; i < songName.length; i ++) {
      if (songName[i].parentNode == node) {
        if (!songName[i].classList.contains("current")) {
          songName[i].classList.add("current");
        }
      } else {
        songName[i].classList.remove("current");
      }
    };

    if (newMixSrc != previousMixSrc) {
      audioMix.src = newMixSrc;
      audioIns.src = newInsSrc;
      audioMix.addEventListener("loadstart", function() {
        musicTab.style.animation = "breathe1 1.5s linear infinite";
      });
      audioMix.addEventListener("canplaythrough", function() {
        audioIns.addEventListener("canplaythrough", function() {
          musicTab.style.animation = "";
          musicTab.classList.add("current");
          audioMix.play();
          audioIns.play();
        })
      })
    } else {
      musicTab.classList.add("current");
      audioMix.play();
      audioIns.play();
    }
    audioIns.volume = 0.8;
  }
};

function audioPauseSet() {
  audioMix.pause();
  audioIns.pause();
  if (background.children.length != 0 && background.children[1].classList.contains("current")) {
    bgSwitch(1, 0);
    if (content.classList.contains("mini")) {
      content.classList.remove("mini");
    }
  };
};

function audioPlaySet() {
  for (var i = 0; i < song.length; i ++) {
    song[i].classList.remove("focus");
  };

  if (background.children.length != 0 && background.children[0].classList.contains("current")) {
    bgSwitch(0, 1);
    if (!content.classList.contains("mini")) {
      content.classList.add("mini");
    }
    updateVoc();
    updateIns();
  }
}

//Background Set------------------------------------------------
function effectSet(pattern, width, height, fill, stroke, radius, rotate, breathe) {
  var effect = document.createElement("section");
  effect.classList.add("effect");
  background.appendChild(effect);
  for (var i = 0; i < 72; i ++) {
    var divCol = document.createElement("div");
    var divLit = document.createElement("div");
    divCol.classList.add("col", "col-1");
    divLit.classList.add(pattern, "pattern", "center");
    if (width == 1) {
      divLit.style.width = Math.random()*window.innerWidth/12 + "px";
    }
    if (height == 1) {
      if (width == 1) {
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
    //Unsolved Bug
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
//Analyze Mixed
var AudioContext = (window.AudioContext || window.webkitAudioContext);

var contextMix = new AudioContext;
var analyserMix = contextMix.createAnalyser();
audioMix.addEventListener("canplaythrough", function() {
  var sourceMix = contextMix.createMediaElementSource(audioMix);
  sourceMix.connect(analyserMix);
  analyserMix.connect(contextMix.destination);
});
analyserMix.fftSize = 1024;
var frequencyDataMix = new Uint8Array(analyserMix.frequencyBinCount);
analyserMix.getByteFrequencyData(frequencyDataMix);

//Analyze Instrumental
var contextIns = new AudioContext;
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
    analyserMix.getByteFrequencyData(frequencyDataMix);

    var totalMix = 0;
    var totalIns = 0;
    for (var i = 0; i < frequencyDataMix.length; i ++) {
      totalMix += frequencyDataMix[i];
    }
    for (var i = 0; i < frequencyDataIns.length; i ++) {
      totalIns += frequencyDataIns[i];
    }
    var totalVoc = totalMix - totalIns;

    var meanVoc = totalVoc/frequencyDataMix.length;
    var vocal = document.querySelector(".vocal");
    
    for (var i = 0; i < post.length; i ++) {
      if (post[i].classList.contains("focus")) {
        var width = post[i].dataset.width;
        var height = post[i].dataset.height;
        var fill = post[i].dataset.fill;
        var stroke = post[i].dataset.stroke;
        var radius = post[i].dataset.radius;
        var rotate = post[i].dataset.rotate;
        var breathe = post[i].dataset.breathe;
        var n = i;
      }
    }

    if (width == 1) {
      vocal.style.width = meanVoc*5 + "px";
    } else {
      vocal.style.width = "2px";
    }
    if (height == 1 || breathe == 4) {
      vocal.style.height = meanVoc*5 + "px";
    } else {
      vocal.style.height = "2px";
    }
    if (width == 0 && height == 0) {
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

    var meanIns = total/frequencyDataMix.length;
    var instrumental = document.querySelector(".instrumental");
    
    for (var i = 0; i < post.length; i ++) {
      if (post[i].classList.contains("focus")) {
        var width = post[i].dataset.width;
        var height = post[i].dataset.height;
        var fill = post[i].dataset.fill;
        var stroke = post[i].dataset.stroke;
        var radius = post[i].dataset.radius;
        var rotate = post[i].dataset.rotate;
        var breathe = post[i].dataset.breathe;
        var n = i;
      }
    }

    if (width == 1) {
      instrumental.style.width = meanIns*4 + "px";
    } else {
      instrumental.style.width = "2px";
    }
    if (height == 1 || breathe == 4) {
      instrumental.style.height = meanIns*4 + "px";
    } else {
      instrumental.style.height = "2px";
    }
    if (width == 0 && height == 0) {
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

//Communal Functions----------------------------------------------
function addMenu(tab) {
  if (!tab.classList.contains("menu")) {
    tab.scrollTop = 0;
    slogan.innerHTML = tab.id.charAt(0).toUpperCase() + tab.id.slice(1, -3);
    tab.classList.add("menu");
    for (var i = 0; i < tab.children.length; i ++) {
      tab.children[i].classList.add("menu");
    };
    content.style.opacity = "0.5";
  };
};

function removeMenu(tab) {
  if (tab.classList.contains("menu")) {
    tab.scrollTop = 0;
    slogan.innerHTML = "Gute Nacht<br>Kontra K<br>Music Visualization Project";
    tab.classList.remove("menu");
    for (var i = 0; i < tab.children.length; i ++) {
      tab.children[i].classList.remove("menu");
    };
    content.style.opacity = "1";
    setTimeout(function() {
      for (var i = 0; i < tab.children.length; i ++) {
        if (tab.children[i].classList.contains("focus")) {
          if (tab == musicTab) {
            scrollTo(tab, i * tab.clientHeight, 1800);
          } else if (tab == blogTab) {
            scrollTo(tab, i * tab.clientHeight, 1000);
          };
        };
      };
    }, 1300);
  };
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

function bgSwitch(n1, n2) {
  background.children[n1].style.display = "none";
  background.children[n2].style.display = "block";
  background.children[n1].classList.remove("current");
  setTimeout(function() {
    background.children[n2].classList.add("current");
  }, 500);
};