let colorCanvas = document.getElementById("color-canvas");
let hueCanvas = document.getElementById("hue-canvas");
let colorPicker = document.getElementById("color-picker");
let huePicker = document.getElementById("hue-picker");
let colorsList = document.getElementById("colors-list");

let colorCtx = colorCanvas.getContext("2d", { willReadFrequently: true });
let hueCtx = hueCanvas.getContext("2d", { willReadFrequently: true });

var hue = "#f00";
var color = "#fff";
colorPicker.style.backgroundColor = color;

let gradientHue = hueCtx.createLinearGradient(0, 0, 0, 300);
gradientHue.addColorStop(0, "#f00");
gradientHue.addColorStop(0.15, "#ff0");
gradientHue.addColorStop(0.3, "#0f0");
gradientHue.addColorStop(0.5, "#0ff");
gradientHue.addColorStop(0.7, "#00f");
gradientHue.addColorStop(0.85, "#f0f");
gradientHue.addColorStop(1, "#f00");
hueCtx.fillStyle = gradientHue;
hueCtx.fillRect(0, 0, hueCtx.canvas.width, hueCtx.canvas.height);

let createGradient = (canvasCtx, color1, color2, direction) => {
  let gradient;

  if (direction == "vertical") {
    gradient = canvasCtx.createLinearGradient(0, 0, 0, canvasCtx.canvas.height);
  } else {
    gradient = canvasCtx.createLinearGradient(0, 0, canvasCtx.canvas.width, 0);
  }

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  canvasCtx.fillStyle = gradient;
  canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
};

let addColor = () => {
  let newColor = document.createElement("div");
  newColor.innerHTML = '<div class="colors-list__color"></div>';
  newColor.style.backgroundColor = color;
  colorsList.appendChild(newColor);
};

createGradient(colorCtx, "#fff", hue, "horizontal");
createGradient(colorCtx, "#fff0", "#000", "vertical");

hueCanvas.addEventListener("click", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let canvasPos = hueCanvas.getBoundingClientRect();

  pixel = hueCtx.getImageData(x - canvasPos.x, y - canvasPos.y, 1, 1).data;
  rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  hue = rgb;

  huePicker.style.top = `${y - canvasPos.y}px`;
  huePicker.style.backgroundColor = hue;

  createGradient(colorCtx, "#fff", hue, "horizontal");
  createGradient(colorCtx, "#fff0", "#000", "vertical");
});

colorCanvas.addEventListener("click", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let canvasPos = colorCanvas.getBoundingClientRect();

  pixel = colorCtx.getImageData(x - canvasPos.x, y - canvasPos.y, 1, 1).data;
  color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

  console.log(x - canvasPos.x, y - canvasPos.y);

  colorPicker.style.left = `${x - canvasPos.x}px`;
  colorPicker.style.top = `${y - canvasPos.y}px`;

  document.body.style.backgroundColor = color;
  colorPicker.style.backgroundColor = color;
});
