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

var bgHue = 0;

for (k in letters) {
  //console.log(key);
  bgHue += Math.floor(360/(Object.keys(letters).length));
  letters[k].bgColor = "hsl(" + bgHue + ", 100%, 50%)";
  console.log(k);
}

//console.log(Object.keys(letters));

document.addEventListener("keydown", function(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    var div = document.createElement("div");
    div.classList.add("letter");
    if (e.shiftKey) {
      div.classList.add("capital");
    }
    div.style.backgroundColor = letters[e.code].bgColor;
    container.appendChild(div);
    //console.log("key: " + e.key);
    //console.log("code: " + e.code);
    //console.log("code: " + e.keyCode);
    //console.log("color: " + letters[e.code]);
    //document.documentElement.style.backgroundColor = letters[e.code].bgColor;

    //container.innerHTML += e.key;
  } else if (e.keyCode == 32) {
    var div = document.createElement("div");
    div.classList.add("space");
    container.appendChild(div);
  } else if (e.keyCode == 8) {
    container.removeChild(container.lastChild);
  }
});