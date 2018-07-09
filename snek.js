// Canvas objects
var canvas = document.getElementById("snekCanvas");
var ctx =  canvas.getContext("2d");

// Canvas dimensions
var canvasHeight = parseInt(canvas.getAttribute('width'));
var canvasWidth = parseInt(canvas.getAttribute('height'));

console.log("This is the canvas height: " + canvasHeight);
console.log("This is the canvas width: " + canvasWidth);

// Number of cells
var widthNumber = 15;
var heightNumber = 15;
var cellGap = 3;

// Cell dimensions
var cellWidth = parseInt((canvasWidth - ((widthNumber + 1) * cellGap)) / (widthNumber - 1));
var cellHeight = parseInt((canvasHeight - ((heightNumber + 1) * cellGap)) / (heightNumber - 1));

console.log(cellWidth);
console.log(cellHeight);

// ctx.fillRect(0, 0, cellWidth, cellHeight);

// Create the background
createBackground();

function createBackground() {

    // Create the black background
    ctx.fillStyle = '#00000e';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    // Cell color
    ctx.fillStyle = '#07055b';

    for (var j = 0; j <= heightNumber ; j++) {

        for (var i = 0; i <= widthNumber ; i++) {
            ctx.fillRect((cellWidth * i) + cellGap , (cellHeight * j) + cellGap, cellWidth - cellGap, cellHeight - cellGap);
        }

    }
}