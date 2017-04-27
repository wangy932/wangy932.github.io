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

//----------------------------------------------
var maintab = document.getElementById("maintab");
var tabitem = document.getElementsByClassName("tabitem");
var background = document.getElementById("background");
var post = document.getElementById("post");
var postbg = document.getElementById("postbg");
var h1 = document.getElementsByTagName("h1");
var h2 = document.getElementsByTagName("h2");
var p = document.getElementsByTagName("p");

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
    } else {
      e.target.classList.add("menu");
      for (var i = 0; i < tabitem.length; i ++) {
        tabitem[i].classList.add("menu");
      }
    }
  }
  console.log(e.target.nodeName);
});

function tabitemClick(node) {
  if (node.classList.contains("current")) {
    node.classList.remove("current");
    postInOut("0", "none", "translateY(-70%)", "white", "hidden", "0");
  } else {
    for (var i = 0; i < tabitem.length; i ++) {
      tabitem[i].classList.remove("current");
    }
    node.classList.add("current");
    postInOut("calc(100% / 6 * 4)", "white 1px solid", "translateY(0)", "black", "visible", "1");
  }
}

function postInOut(ht, bd, ty, h2c, h1pv, h1po) {
  post.style.height = ht;
  post.style.borderTop = bd;
  post.style.borderBottom = bd;
  post.style.transform = ty;
  for (var i = 0; i < h2.length; i ++) {
    h2[i].style.color = h2c;
  };
  for (var i = 0; i < h1.length; i ++) {
    h1[i].style.visibility = h1pv;
    h1[i].style.opacity = h1po;
  };
  for (var i = 0; i < p.length; i ++) {
    p[i].style.visibility = h1pv;
    p[i].style.opacity = h1po;
  };
}

//Background Animation for Text
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

//Lighting Set Change
function lightSet(num) {
  var effect1 = document.createElement("section");
  effect1.classList.add("effect");
  background.appendChild(effect1);
  for (var i = 0; i < 72; i ++) {
    var divCol = document.createElement("div");
    var divLit = document.createElement("div");
    divCol.classList.add("col", "col-1-12");
    divLit.classList.add(num, "center");
    divLit.style.height = Math.random()*window.innerHeight/6 + "px";
    divLit.style.opacity = Math.random();
    divLit.style.animationDelay = Math.random() + "s";
    effect1.appendChild(divCol);
    divCol.appendChild(divLit);
  }
}

lightSet("light-1");