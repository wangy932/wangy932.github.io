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

var player  = document.getElementById("player");
var song = document.getElementsByClassName("song");
var songName = document.getElementsByClassName("songname");

var social = document.getElementById("social");
var media = document.getElementsByClassName("media");
var mediaName = document.getElementsByClassName("mediaName");

var excerpt = document.getElementById("excerpt");
/*for (var i = 0; i < excerpt.length; i ++) {
  excerpt[i].style.width = window.innerHeight + "px";
}*/

var post = document.getElementById("post");
var postbg = document.getElementById("postbg");
var text = document.getElementsByClassName("text");
var h1 = document.getElementsByTagName("h1");
var p = document.getElementsByTagName("p");

var background = document.getElementById("background");

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
    /*window.addEventListener("resize", function() {
      for (var i = 0; i < excerpt.length; i ++) {
        excerpt[i].style.width = window.innerHeight + "px";
      }
    });*/

    //Maintab Events-------------------------------------------------
    maintab.addEventListener("click", function(e) {
      if (e.target.nodeName == "H2") {
        tabitemClick(e.target.parentNode);
      } else if (e.target.nodeName == "DIV") {
        tabitemClick(e.target);
      } else if (e.target.nodeName == "MAIN") {
        if (e.target.classList.contains("menu")) {
          maintabMenuRemove();
          if (background.children.length == 0) {
            maintabInterval = setInterval(function() {
              maintabScroll();
            }, 3000);
          }
        } else {
          if (maintabInterval) {
            clearInterval(maintabInterval);
          }
          setTimeout(function() {
            maintabMenuAdd();
          }, 50);
        }
      }
    });

    maintab.addEventListener("mouseover", function(e) {
      if (e.target.nodeName == "H2" || e.target.nodeName == "DIV") {
        var topOption = ["calc(100% / 6)", "calc(100% / 6 * 3 - 7px)", "calc(100% / 6 * 5 - 14px)"];
        var leftOption = ["calc(100% / 6)", "calc(100% / 6 * 4)"]
        excerpt.style.top = topOption[Math.floor(Math.random()*topOption.length)];
        excerpt.style.left = leftOption[Math.floor(Math.random()*leftOption.length)];
        setTimeout(function() {
          excerpt.classList.add("current");
        }, 50);
        if (e.target.nodeName == "H2") {
          var item = e.target.parentNode.dataset.item;
        } else if (e.target.nodeName == "DIV") {
          var item = e.target.dataset.item;
        }
        for (var i = 0; i < excerpt.children.length; i ++) {
          if (excerpt.children[i].dataset.content == item) {
            excerpt.children[i].classList.add("current");
          } else {
            if (excerpt.children[i].classList.contains("current")) {
              excerpt.children[i].classList.remove("current");
            }
          }
        }
      } else {
        if (excerpt.classList.contains("current")) {
          excerpt.classList.remove("current");
        }
      }
    });

    maintab.addEventListener("mouseout", function(e) {
        if (e.target.nodeName == "H2" || e.target.nodeName == "DIV") {
          if (excerpt.classList.contains("current")) {
            excerpt.classList.remove("current");
          }
        }
    });

    background.addEventListener("mouseover", function(e) {
      if (excerpt.classList.contains("current")) {
        excerpt.classList.remove("current");
      }
    });

    //Up Arrow = Menu Up, Down Arrow = Menu Down
    document.addEventListener("keydown", function(e) {
      e.preventDefault();
      if (e.keyCode == 38) {
        if (!maintab.classList.contains("menu")) {
          if (maintabInterval) {
            clearInterval(maintabInterval);
          }
          setTimeout(function() {
            maintabMenuAdd();
          }, 50);
        }
      } else if (e.keyCode == 40) {
          if (maintab.classList.contains("menu")) {
            maintabMenuRemove();
            if (background.children.length == 0) {
              maintabInterval = setInterval(function() {
                maintabScroll();
              }, 3000);
            }
          };
      }
    });

    //Player Events--------------------------------------------------
    player.addEventListener("click", function(e) {
      if (e.target.nodeName == "H2") {
        songClick(e.target.parentNode);
      } else if (e.target.nodeName == "DIV") {
        songClick(e.target);
      }
    });

    player.addEventListener("mouseover", function() {
      playerMenuAdd();
    });

    player.addEventListener("mouseout", function() {
      playerMenuRemove();
    });

    //Right Arrow = Player Menu Right, Left Arrow = Player Menu Left
    document.addEventListener("keydown", function(e) {
      e.preventDefault();
      if (e.keyCode == 39) {
        playerMenuAdd();
      } else if (e.keyCode == 37) {
        playerMenuRemove();
      }
    });

    //Social Events--------------------------------------------------
    social.addEventListener("mouseover", function() {
      if (!social.classList.contains("menu")) {
        social.classList.add("menu");
        for (var i = 0; i < media.length; i ++) {
          media[i].classList.add("current");
        }
      }
    });

    social.addEventListener("mouseout", function() {
      if (social.classList.contains("menu")) {
        social.classList.remove("menu");
        for (var i = 0; i < media.length; i ++) {
          media[i].classList.remove("current");
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

//Slogan & Tabitem Scroll Animation-----------------------------------------
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

function maintabScroll() {
  maintab.scrollTop = maintab.clientHeight * Math.floor(Math.random()*tabitem.length);
}

sloganInterval = setInterval(function() {
  sloganScroll();
}, 2500);

maintabInterval = setInterval(function() {
  maintabScroll();
}, 3000);

//Menu Add & Remove Animations---------------------------------------------------
function maintabMenuAdd() {
  maintab.classList.add("menu");
  for (var i = 0; i < tabitem.length; i ++) {
    tabitem[i].classList.add("menu");
  };
  post.style.opacity = "0.5";
  scrollTo(maintab, 0, 1);
};

function maintabMenuRemove() {
  maintab.classList.remove("menu");
  for (var i = 0; i < tabitem.length; i ++) {
    tabitem[i].classList.remove("menu");
  };
  post.style.opacity = "1";
  if (excerpt.classList.contains("current")) {
    excerpt.classList.remove("current");
  };
  setTimeout(function() {
    for (var i = 0; i < tabitem.length; i ++) {
      if (tabitem[i].classList.contains("focus")) {
        scrollTo(maintab, i * (maintab.clientHeight), 900);
      };
    };
  }, 1200);
};

function playerMenuAdd() {
  if (!player.classList.contains("menu")) {
    player.classList.add("menu");
    if (player.classList.contains("current")) {
      player.classList.remove("current");
    }
    for (var i = 0; i < song.length; i ++) {
      if (!song[i].classList.contains("current")) {
        song[i].classList.add("current");
      }
    }
  }
};

function playerMenuRemove() {
  if (player.classList.contains("menu")) {
    player.classList.remove("menu");
    for (var i = 0; i < song.length; i ++) {
      if (song[i].classList.contains("focus")) {
        player.classList.add("current");
      }
      if (song[i].classList.contains("current")) {
        song[i].classList.remove("current");
      }
    }
  }
};

//Maintab Functions---------------------------------------------------
function tabitemClick(node) {
  background.innerHTML = "";
  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    for (var i = 0; i < postTitle.length; i ++) {
      if (postTitle[i].parentNode == node) {
        postTitle[i].classList.remove("current");
      }
    };
    post.classList.remove("current");
    slogan.classList.add("current");
    sloganInterval = setInterval(function() {
      sloganScroll();
    }, 2500);
    maintabInterval = setInterval(function() {
      maintabScroll();
    }, 3000);
  } else {
    clearInterval(maintabInterval);
    slogan.classList.remove("current");
    clearInterval(sloganInterval);
    setTimeout(function() {
      if (maintab.classList.contains("menu")) {
        maintabMenuRemove();
      }
    }, 800);
    for (var i = 0; i < tabitem.length; i ++) {
      tabitem[i].classList.remove("focus");
      if (node == tabitem[i] && !tabitem[i].classList.contains("menu")) {
        scrollTo(maintab, i * (maintab.clientHeight), 500);
      }
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

//ESC = Back Home
document.addEventListener("keydown", function(e) {
  e.preventDefault();
  if (background.children.length != 0) {
    if (e.keyCode == 27) {
      background.innerHTML = "";
      for (var i = 0; i < tabitem.length; i ++) {
        if (tabitem[i].classList.contains("focus")) {
          var target = tabitem[i];
          target.classList.remove("focus");
          target.children[0].classList.remove("current");
          post.classList.remove("current");
          slogan.classList.add("current");
          sloganInterval = setInterval(function() {
            sloganScroll();
          }, 2500);
          maintabInterval = setInterval(function() {
            maintabScroll();
          }, 3000);
        }
      }
      postInOut(target);
    }
  }
});

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

//Player Functions---------------------------------------------------
function songClick(node) {
  var previousOriSrc = audioOri.src;
  var newOriSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + ".m4a";
  var newInsSrc = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + node.children[0].innerHTML.split(" ").join("%20").split("&amp;").join("&") + "-Instrumental.m4a";

  if (node.classList.contains("focus")) {
    node.classList.remove("focus");
    for (var i = 0; i < songName.length; i ++) {
      if (songName[i].parentNode == node) {
        songName[i].classList.remove("current");
      }
    };
    audioPauseSet();
  } else {
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
    
    for (var i = 0; i < song.length; i ++) {
      if (song[i].classList.contains("focus")) {
        scrollTo(player, i * ((player.scrollHeight - 2) / song.length), 900);
      }
    };

    if (newOriSrc != previousOriSrc) {
      audioOri.src = newOriSrc;
      audioIns.src = newInsSrc;
      audioOri.addEventListener("loadstart", function() {
        player.style.animation = "breathe1 1.5s linear infinite";
      });
      audioOri.addEventListener("canplaythrough", function() {
        audioIns.addEventListener("canplaythrough", function() {
          player.style.animation = "";
          player.classList.add("current");
          audioOri.play();
          audioIns.play();
          if (background.children.length == 0) {
            clearInterval(maintabInterval);
            setTimeout(function() {
              if (!maintab.classList.contains("menu")) {
                maintabMenuAdd();
              }
            }, 1500);
          }
        })
      })
    } else {
      player.classList.add("current");
      audioOri.play();
      audioIns.play();
    }
    audioIns.volume = 0.8;
  }
};

//Space = Pause/Play
document.addEventListener("keydown", function(e) {
  e.preventDefault();
  for (var i = 0; i < songName.length; i ++) {
    if (audioOri.src == "http://www.yuqiwang.graphics/blog/assets/media/audio/" + songName[i].innerHTML.split(" ").join("%20").split("&amp;").join("&") + ".m4a") {
      if (e.keyCode == 32) {
        if (audioOri.paused) {
          audioPlaySet();
          songName[i].classList.add("current");
          songName[i].parentNode.classList.add("focus");
          player.classList.add("current");
          audioOri.play();
          audioIns.play();
          audioIns.volume = 0.8;
        } else {
          audioPauseSet();
          if (songName[i].classList.contains("current")) {
            songName[i].classList.remove("current");
          }
          songName[i].parentNode.classList.remove("focus");
        }
      }
    }
  };
});

function audioPauseSet() {
  player.classList.remove("current");
  audioOri.pause();
  audioIns.pause();
  if (background.children.length != 0 && background.children[1].classList.contains("current")) {
    bgSwitch(1, 0);
    if (post.classList.contains("mini")) {
      post.classList.remove("mini");
    }
  };
};

function audioPlaySet() {
  for (var i = 0; i < song.length; i ++) {
    song[i].classList.remove("focus");
  };

  if (background.children.length != 0 && background.children[0].classList.contains("current")) {
    bgSwitch(0, 1);
    if (!post.classList.contains("mini")) {
      post.classList.add("mini");
    }
    updateVoc();
    updateIns();
  }
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
var AudioContext = (window.AudioContext || window.webkitAudioContext);

var contextOri = new AudioContext;
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