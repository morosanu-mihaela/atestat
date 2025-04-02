const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let brushSize = 1;
let isDrawing = false;
let selectedTool = "pencil";
let color;




function startDrawing(event) {
 isDrawing = true;
 draw(event);
}

function draw(event) {
 if (!isDrawing) return;
 const x = event.clientX - canvas.offsetLeft;
 const y = event.clientY - canvas.offsetTop;
 if (selectedTool == "pencil")
 {
		 ctx.lineTo(x, y);
 ctx.stroke();
 }
 if (selectedTool == "brush")
 {
	ctx.beginPath();
 	ctx.arc(x,y,brushSize,0,Math.PI * 2);
 	
 }
}

function stopDrawing() {
 isDrawing = false;
 ctx.beginPath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
});
const colorSwatches = document.querySelectorAll(".color-swatch");
colorSwatches.forEach((swatch) => {
 swatch.addEventListener("click", function() {
  color = this.style.backgroundColor;
  ctx.strokeStyle = color;
 });
});
const brushSizeSelect = document.getElementById("brushSize");
brushSizeSelect.addEventListener("change", function() {
 brushSize = this.value;
 ctx.lineWidth = brushSize;
});
const pencilToolButton = document.getElementById("pencilTool");
pencilToolButton.addEventListener("mousedown", function() {
 selectedTool = "pencil";
 ctx.globalCompositeOperation = "source-over";
});
const brushToolButton = document.getElementById("brushTool");
brushToolButton.addEventListener("mousedown", function() {
 selectedTool = "brush";
 ctx.globalCompositeOperation = "multiply";
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