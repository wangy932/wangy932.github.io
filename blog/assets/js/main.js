var AudioContext = window.AudioContext || window.webkitAudioContext; //Cross browser variant. 
var audioContext = new AudioContext();
//var audio = document.getElementById("audio");
//var audioSrc = audioContext.createMediaElementSource(audio);
var analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    /*audioSrc.connect(analyser);
    analyser.connect(audioContext.destination);*/
var canvas = document.getElementById("visualizer");
var ctx = canvas.getContext("2d");
var file;
var fileContent;
var audioBufferSourceNode;

var fileChooser = document.getElementById('fileChooser');
    fileChooser.onchange = function() {
      if (fileChooser.files[0]) {
        
        file = fileChooser.files[0];
        console.log(file);
        //console.log(audio);
        loadFile();
       }
     }

var circle = document.getElementById("circle");

function loadFile() {
  var fileReader = new FileReader();
  fileReader.onload = function() {
    decodeFile();
  }
  fileReader.onload = function(e) {
    fileContent = e.target.result;
    console.log(fileContent);
    //console.log(audioSrc);
    decodeFile();
  }
  fileReader.readAsArrayBuffer(file);
}

function decodeFile() {
  audioContext.decodeAudioData(fileContent, function(buffer) {
    if(audioBufferSourceNode) {
      audioBufferSourceNode.stop();
    }
    audioBufferSourceNode = audioContext.createBufferSource();
    audioBufferSourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    audioBufferSourceNode.buffer = buffer;
    audioBufferSourceNode.start(0);
    window.requestAnimationFrame(render);
  });
}


function render() {
  ctx.strokeStyle = "#00d0ff";
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  var step = Math.round(dataArray.length / 64);
  /*for (var i = 0; i < 60; i++) {
    var energy = (dataArray[step * i] / 256.0) * 50;
    for (var j = 0; j < energy; j++) {
      ctx.beginPath();
      ctx.moveTo(20 * i + 2, 200 + 4 * j);
      ctx.lineTo(20 * (i + 1) - 2, 200 + 4 * j);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(20 * i + 2, 200);
    ctx.lineTo(20 * (i + 1) - 2, 200);
    ctx.stroke();
  }*/
  var total = 0;
  for (var i = 0; i < dataArray.length; i ++) {
    total += dataArray[i];
  }
  var mean = total/dataArray.length;
  console.log(dataArray.length);
  circle.style.width = Math.round(mean*3) + "px";
  circle.style.height = Math.round(mean*3) + "px";
  window.requestAnimationFrame(render);
}

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
  },
  complete: function() {
    maintab.classList.remove("menu");
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
      }
      post.style.opacity = "1";
    } else {
      e.target.classList.add("menu");
      for (var i = 0; i < tabitem.length; i ++) {
        tabitem[i].classList.add("menu");
      }
      post.style.opacity = "0.5";
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
    }
    node.classList.add("focus");
    post.classList.add("current");
    var n = node.dataset;
    lightSet(n.item, n.randomw, n.randomh, n.fill, n.stroke, n.rotate, n.breathe);
    stageSet(n.item);
  }
  postInOut(node);
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
  var chord = document.createElement("div");
  var drum = document.createElement("div");
  vocal.classList.add(perform, "vocal", "perform", "center");
  chord.classList.add(perform, "chord", "perform", "center");
  drum.classList.add(perform, "drum", "perform", "center");
  stage.appendChild(vocal);
  stage.appendChild(chord);
  stage.appendChild(drum);
}


//Background Animation for Music---------------------------------
background.addEventListener("click", function() {
  if (background.children.length != 0) {
    if (background.children[0].classList.contains("current")) {
      bgSwitch(0, 1);
    } else {
      bgSwitch(1, 0);
    }
  }
});

function bgSwitch(n1, n2) {
  background.children[n1].style.display = "none";
  background.children[n2].style.display = "block";
  background.children[n1].classList.remove("current");
  setTimeout(function() {
    background.children[n2].classList.add("current");
  }, 500);
}