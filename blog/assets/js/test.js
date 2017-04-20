var init = function () {
    audio = document.getElementById("song");
    audio.crossOrigin = "anonymous";
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    /*renderer.init({
        count: analyser.frequencyBinCount,
        width: width,
        height: height
    });*/
}

init();