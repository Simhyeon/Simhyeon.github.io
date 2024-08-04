let square = document.getElementById("drawPlace");
let paper = square.getContext("2d");
let pressedMouse = false; 
let x;
let y;
let colorLine ="#9ACD32";
let key = {C: 67};

document.addEventListener("mousedown", startDrawing);
document.addEventListener("mousemove", drawLine);
document.addEventListener("mouseup", stopDrawing);
document.addEventListener("keydown", clearCanvas);

function startDrawing(eventvs01){
	pressedMouse = true;
	x = eventvs01.offsetX;
	y = eventvs01.offsetY;
}

function drawLine(eventvs02) {
	if (pressedMouse) {
		document.getElementById("drawPlace").style.cursor = "crosshair";
		let xM = eventvs02.offsetX;
		let yM = eventvs02.offsetY;
		drawing_line(colorLine, x, y, xM, yM, paper);
		x = xM;
		y = yM;
	}
}

function stopDrawing(eventvs03) {
	pressedMouse = false;
	document.getElementById("drawPlace").style.cursor = "default";
}

function clearCanvas(whenPressKey) {
	if (whenPressKey.keyCode == key.C) {
		paper.clearRect(0, 0, square.width, square.height);
	}
}

drawing_line("black", x-1, y, x, y, paper);

function drawing_line(color, x_start, y_start, x_end, y_end, board){
	board.beginPath();
	board.strokeStyle = color;
	board.lineWidth = 2;
	board.moveTo(x_start,y_start);
	board.lineTo(x_end,y_end);
	board.stroke(); 
	board.closePath();
}
