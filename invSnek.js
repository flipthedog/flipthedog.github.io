// invSnek.js
// Controls the inverted snek game
// Also definitely not snake...
// Work in progress, check back soon

// Canvas objects
var canvas = document.getElementById("invSnekCanvas");
var ctx =  canvas.getContext("2d");

// Canvas dimensions
var canvasHeight = parseInt(canvas.getAttribute('width'));
var canvasWidth = parseInt(canvas.getAttribute('height'));

// Number of cells
var widthNumber = 15;
var heightNumber = 15;
var cellGap = 3;

// Cell dimensions
var actualCanvasWidth = parseInt(canvasWidth / 2);
var actualCanvasHeight = parseInt(canvasHeight / 2);
var cellWidth = parseInt((actualCanvasWidth - ((widthNumber + 1) * cellGap)) / (widthNumber));
var cellHeight = parseInt((actualCanvasHeight - ((heightNumber + 1) * cellGap)) / (heightNumber));

var canvasXOffset = actualCanvasWidth;
var canvasYOffset = actualCanvasHeight;

var newCanvasWidth = ((cellGap) * (widthNumber + 1)) + widthNumber * cellWidth;
var newCanvasHeight = ((cellGap) * (heightNumber + 1)) + heightNumber * cellHeight;
var totalCanvasWidth = newCanvasWidth * 2;
var totalCanvasHeight = newCanvasHeight * 2;

canvas.setAttribute('width', totalCanvasWidth);
canvas.setAttribute('height', totalCanvasHeight);

ctx.fillStyle = '#ff111d';
ctx.fillRect(canvasXOffset,canvasYOffset,totalCanvasWidth,totalCanvasHeight);