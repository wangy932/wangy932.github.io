var audioSrc = {
    song01: {name: "Ratten"},
    song02: {name: "Diamanten"},
    song03: {name: "Mehr als ein Job"},
    song04: {name: "Hände weg (feat. Rico)"},
    song05: {name: "2 Seelen"},
    song06: {name: "Power"},
    song07: {name: "Plem Plem (feat. Raf Camora & Bonez MC)"},
    song08: {name: "Einfach"},
    song09: {name: "Gute Nacht"},
    song10: {name: "Mosaik (feat. Rico)"},
    song11: {name: "Wie du"},
    song12: {name: "Gift (feat. BTNG & AK Ausser Kontrolle)"},
    song13: {name: "Instinkt"},
    song14: {name: "Jedes Mal (feat. Fatal & Skepsis)"},
    song15: {name: "Kreis (feat. Bausa)"},
    song16: {name: "Lass mal"},
    song17: {name: "Glücklichen"},
    song18: {name: "Lass mich los"}
}

for (song in audioSrc) {
    audioSrc[song].original = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + audioSrc[song].name + ".m4a";
    audioSrc[song].instrumental = "http://www.yuqiwang.graphics/blog/assets/media/audio/" + audioSrc[song].name + "-Instrumental.m4a";
}

var buttonOri = document.getElementById("button");

var audioOri = document.getElementById("original");
var audioIns = document.getElementById("instrumental");
var circleVoc = document.getElementById("v1");
var circleIns = document.getElementById("v2");

button.addEventListener("click", function() {
    audioOri.src = audioSrc.song09.original;
    audioIns.src = audioSrc.song09.instrumental;
    if (audioOri.paused) {
        audioOri.play();
        audioIns.volume = 0.8;
        audioIns.play();
        updateVoc();
        updateIns();
    } else {
        audioOri.pause();
        audioIns.pause();
    }
});

//Analyze Original
var contextOri = new AudioContext();
var analyserOri = contextOri.createAnalyser();
audioOri.addEventListener("canplay", function() {
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
audioIns.addEventListener("canplay", function() {
    var sourceIns = contextIns.createMediaElementSource(audioIns);
    sourceIns.connect(analyserIns);
    analyserIns.connect(contextIns.destination);
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
    circleVoc.style.width = 50 + meanVoc*5 + "px";
    circleVoc.style.height = 50 + meanVoc*5 + "px";
};

function updateIns() {
    requestAnimationFrame(updateIns);
    analyserIns.getByteFrequencyData(frequencyDataIns);

    var total = 0;
    for (var i = 0; i < frequencyDataIns.length; i ++) {
        total += frequencyDataIns[i];
    }

    var meanIns = total/frequencyDataOri.length;
    circleIns.style.width = meanIns*4 + "px";
    circleIns.style.height = meanIns*4 + "px";
};