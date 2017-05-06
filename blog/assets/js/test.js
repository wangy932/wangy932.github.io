var audio = document.getElementById("song");
var context1 = new AudioContext();
var audioElement1 = document.getElementById("song1");
var analyser1 = context1.createAnalyser();
audioElement1.addEventListener("canplay", function() {
    var source1 = context1.createMediaElementSource(audioElement1);
    source1.connect(analyser1);
    analyser1.connect(context1.destination);
});
analyser1.fftSize = 256;
var frequencyData1 = new Uint8Array(analyser1.frequencyBinCount);
analyser1.getByteFrequencyData(frequencyData1);
var circle1 = document.getElementById("v1");
var b1 = document.getElementById("b1");
b1.addEventListener("click", function() {
    if (audioElement1.paused) {
        audioElement1.play();
        audioElement1.muted = true;
        audio.play();
        update1();
    } else {
        audioElement1.pause();
        audio.pause();
    }
})

function update1() {
    // Schedule the next update
    requestAnimationFrame(update1);

    // Get the new frequency data
    analyser1.getByteFrequencyData(frequencyData1);

    // Update the visualisation
    var total = 0;
  for (var i = 0; i < frequencyData1.length; i ++) {
    total += frequencyData1[i];
  }
  var mean = total/frequencyData1.length;
  circle1.style.width = Math.round(mean*3) + "px";
  circle1.style.height = Math.round(mean*3) + "px";
};

// Kick it off...

var context2 = new AudioContext();
var audioElement2 = document.getElementById("song2");
var analyser2 = context2.createAnalyser();
audioElement2.addEventListener("canplay", function() {
    var source2 = context2.createMediaElementSource(audioElement2);
    source2.connect(analyser2);
    analyser2.connect(context2.destination);
});
analyser2.fftSize = 256;
var frequencyData2 = new Uint8Array(analyser2.frequencyBinCount);
analyser2.getByteFrequencyData(frequencyData2);
var circle2 = document.getElementById("v2");
var b2 = document.getElementById("b2");
b2.addEventListener("click", function() {
    audioElement2.play();
    update2();
})

function update2() {
    // Schedule the next update
    requestAnimationFrame(update2);

    // Get the new frequency data
    analyser2.getByteFrequencyData(frequencyData2);

    // Update the visualisation
    var total = 0;
  for (var i = 0; i < frequencyData2.length; i ++) {
    total += frequencyData2[i];
  }
  var mean = total/frequencyData2.length;
  circle2.style.width = Math.round(mean*3) + "px";
  circle2.style.height = Math.round(mean*3) + "px";
};
