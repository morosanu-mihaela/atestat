const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let selectedTool = "pencil";
function startDrawing(event) {
 isDrawing = true;
 draw(event);
}
function draw(event) {
 if (!isDrawing) return;
 const x = event.clientX - canvas.offsetLeft;
 const y = event.clientY - canvas.offsetTop;
 ctx.lineTo(x, y);
 ctx.stroke();
}
function stopDrawing() {
 isDrawing = false;
 ctx.beginPath();
}

function saveImage(){
	const link = document.createElement("a");
	const dataURL = canvas.toDataURL("image/png");
 	link.href = dataURL;
 	link.download = 'drawing.png';
 	link.click();
	saveCanvasAsImage();
}
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveImage);

const colorSwatches = document.querySelectorAll(".color-swatch");
colorSwatches.forEach((swatch) => {
 swatch.addEventListener("click", function() {
  const color = this.style.backgroundColor;
  ctx.strokeStyle = color;
 });
});
const brushSizeSelect = document.getElementById("brushSize");
brushSizeSelect.addEventListener("change", function() {
 const brushSize = this.value;
 ctx.lineWidth = brushSize;
});
const pencilToolButton = document.getElementById("pencilTool");
pencilToolButton.addEventListener("mousedown", function() {
 selectedTool = "pencil";
 ctx.globalCompositeOperation = "source-over";
 ctx.strokeStyle = "#808080";
});
const brushToolButton = document.getElementById("brushTool");
brushToolButton.addEventListener("mousedown", function() {
 selectedTool = "brush";
 ctx.globalCompositeOperation = "multiply";
ctx.strokeStyle = "black";
});
const eraserToolButton = document.getElementById("eraserTool");
eraserToolButton.addEventListener("mousedown", function() {
 selectedTool = "eraser";
 ctx.globalCompositeOperation = "destination-out";
});
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", function() {
 const color = this.value;
 ctx.strokeStyle = color;
});


