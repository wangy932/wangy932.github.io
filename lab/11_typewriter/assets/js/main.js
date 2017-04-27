var container = document.getElementById("container");
    pButton = document.getElementById("p-button");
    aButton = document.getElementById("a-button");
    tButton = document.getElementById("t-button");
    button = document.getElementsByTagName("button");

var letters = {
  KeyA: {},
  KeyB: {},
  KeyC: {},
  KeyD: {},
  KeyE: {},
  KeyF: {},
  KeyG: {},
  KeyH: {},
  KeyI: {},
  KeyJ: {},
  KeyK: {},
  KeyL: {},
  KeyM: {},
  KeyN: {},
  KeyO: {},
  KeyP: {},
  KeyQ: {},
  KeyR: {},
  KeyS: {},
  KeyT: {},
  KeyU: {},
  KeyV: {},
  KeyW: {},
  KeyX: {},
  KeyY: {},
  KeyZ: {}
};

var pos = 0;
    amp = 0;
    thc = 0;

pButton.addEventListener("click", function() {
  reset();
  pButton.classList.add("current");
  for (key in letters) {
    pos += 60/(Object.keys(letters).length);
    amp += 0.03;
    thc = 1.5;
    letters[key].position = pos;
    letters[key].amplitude = amp;
    letters[key].thickness = thc;
    letters[key].newamp = letters[key].amplitude;
  }
});

tButton.addEventListener("click", function() {
  reset();
  tButton.classList.add("current");
  for (key in letters) {
    amp += 0.03;
    thc += 0.1;
    letters[key].amplitude = amp;
    letters[key].thickness = thc;
    letters[key].newamp = letters[key].amplitude;
  }
});

var unit = 50,
    height, width, xAxis, yAxis;
    draw.seconds = 0;
    draw.t = 0;
var countup = true;

document.addEventListener("keydown", function(e) {
    if (amp != 0 || thc != 0) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        var canvas = document.createElement("canvas");
        container.appendChild(canvas);
        canvas.style.left = Math.random()*70 + "%";
        if (pos == 0) {
          canvas.style.top = Math.random()*60 + "%";
        } else {
          canvas.style.top = letters[e.code].position + "%";
        }
        canvas.style.opacity = Math.random();
        canvas.width = 200;
        canvas.height = 160;
        var context = canvas.getContext("2d");
        context.t = context.seconds = 0;
        context.font = "18px sans-serif";
        context.strokeStyle = "#000";
        context.lineJoin = "round";
        height = canvas.height;
        width = canvas.width;
        xAxis = Math.floor(height/2);
        yAxis = Math.floor(width/4);
        context.save();
        newAmp = letters[e.code].amplitude;
        draw(context, e);
      } else if (e.keyCode == 8) {
        container.removeChild(container.lastChild);
      }
    } else {
      for (var i = 0; i < button.length; i ++) {
        button[i].style.animation = "alert 3s linear infinite";
      }
    }
});

function draw(context, e) {
    setTimeout(function() {
      if (countup) {
        letters[e.code].newamp += 0.0003;
        if (letters[e.code].newamp >= letters[e.code].amplitude + 0.6) {
          countup = false;
        }
      } else {
        letters[e.code].newamp -= 0.0003;
        if (letters[e.code].newamp <= letters[e.code].amplitude) {
          countup = true;
        }
      }
    }, 1);

    context.clearRect(0, 0, width, height);
    context.save();
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.lineWidth = letters[e.code].thickness;
    context.beginPath();
    drawSine(context, e);
    context.stroke();
    context.restore();
    context.seconds = context.seconds - .007;
    context.t = context.seconds*Math.PI;
    setTimeout(function() {
      draw(context, e);
    }, 10);
};

function drawSine(context, e) {
    var x = context.t;
    var y = Math.sin(x)*letters[e.code].newamp;
    context.moveTo(yAxis, unit*y+xAxis);

    for (i = yAxis; i <= width; i += 5) {
        x = context.t+(-yAxis+i)/unit;
        y = Math.sin(x)*letters[e.code].newamp;
        context.lineTo(i, unit*y+xAxis);
    }
};

function reset() {
  container.innerHTML = "";
  pos = amp = thc = 0;
  for (var i = 0; i < button.length; i ++) {
    if (button[i].classList.contains("current")) {
      button[i].classList.remove("current");
    }
    button[i].style.animation = "";
  }
};