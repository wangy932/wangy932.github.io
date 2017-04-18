var AudioContext = window.AudioContext || window.webkitAudioContext; //Cross browser variant. 
var audioContext = new AudioContext();
var audio = document.getElementById("audio");
var audioSrc = audioContext.createMediaElementSource(audio);
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
        console.log(audio);
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
    console.log(audioSrc);
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