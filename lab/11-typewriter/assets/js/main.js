var container = document.getElementById("container");

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

var a = 0;

for (key in letters) {
  //console.log(key);
  a += 100/(Object.keys(letters).length);
  letters[key].position = a;
}

//console.log(Object.keys(letters));

var unit = 50,
    canvas, context, canvas2, context2,
    height, width, xAxis, yAxis,
    draw;
    draw.seconds = 0;
    draw.t = 0;

document.addEventListener("keydown", function(e) {
  /*if (typeof(Humble) == "undefined") window.Humble = {};
    Humble.Trig = {};
    Humble.Trig.init = init;*/

    //Humble.Trig.init();
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.classList.add("sine");
    canvas.style.left = Math.random()*100 + "%";
    canvas.style.top = letters[e.code].position + "%";
    canvas.width = Math.random()*1000;
    canvas.height = Math.random()*500;
    context = canvas.getContext("2d");
    context.font = "18px sans-serif";
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    height = canvas.height;
    width = canvas.width;
    xAxis = Math.floor(height/2);
    yAxis = Math.floor(width/4);
    context.save();
    draw();

  /*if (e.keyCode >= 65 && e.keyCode <= 90) {
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.left = Math.random()*100 + "%";
    canvas.style.top = letters[e.code].position + "%";
    var context = canvas.getContext("2d");
    context.lineWidth = 5;   
    context.beginPath();  
    context.moveTo(Math.random()*200,Math.random()*200);  
    context.quadraticCurveTo(Math.random()*200,Math.random()*200,Math.random()*200,Math.random()*200,Math.random()*200,Math.random()*200); 
    context.strokeStyle = "white"; 
    context.stroke();     
    console.log(canvas.style.left);
    console.log(canvas.style.top);
  } else if (e.keyCode == 32) {
    var div = document.createElement("div");
    div.classList.add("space");
    container.appendChild(div);
  } else if (e.keyCode == 8) {
    container.removeChild(container.lastChild);
  }*/
});

function init() {
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.classList.add("sine");
    canvas.style.left = Math.random()*100 + "%";
    canvas.style.top = letters[e.code].position + "%";
    canvas.width = Math.random()*1000;
    canvas.height = Math.random()*500;
    context = canvas.getContext("2d");
    context.font = "18px sans-serif";
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    height = canvas.height;
    width = canvas.width;
    xAxis = Math.floor(height/2);
    yAxis = Math.floor(width/4);
    context.save();
    draw();
}

function draw() {
    context.clearRect(0, 0, width, height);
    context.save();
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    drawSine(draw.t);
    context.stroke();
    context.restore();
    draw.seconds = draw.seconds - .007;
    draw.t = draw.seconds*Math.PI;
    setTimeout(draw, 10);
};


function drawSine(t) {
    var x = t;
    var y = Math.sin(x)*0.5;
    context.moveTo(yAxis, unit*y+xAxis);
    
    for (i = yAxis; i <= width; i += 5) {
        x = t+(-yAxis+i)/unit;
        y = Math.sin(x)*0.5;
        context.lineTo(i, unit*y+xAxis);
    }
}