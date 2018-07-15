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
var cellWidth = parseInt((canvasWidth - ((widthNumber + 1 ) * cellGap)) / (widthNumber));
var cellHeight = parseInt((canvasHeight - ((heightNumber + 1) * cellGap)) / (heightNumber));

var newCanvasWidth =  ((cellGap ) * (widthNumber + 1)) + widthNumber * cellWidth;
var newCanvasHeight = ((cellGap ) * (heightNumber + 1)) + heightNumber * cellHeight;

canvas.setAttribute('width', newCanvasWidth );
canvas.setAttribute('height', newCanvasHeight);

var cellStorage = new Array(heightNumber);
for (var i =0; i < widthNumber; i++) {
    cellStorage[i] = new Array(widthNumber);
}


console.log("This is the new canvas height: " + newCanvasHeight);
console.log("This is the new canvas width: " + newCanvasWidth);

console.log(cellWidth);
console.log(cellHeight);

// ctx.fillRect(0, 0, cellWidth, cellHeight);

function Cell(x, y) {
    this.x = x;
    this.y = y;
}

// Create the background
createCells();
draw();
function createCells() {



    for (var j = 0; j < heightNumber ; j++) {

        for (var i = 0; i < widthNumber ; i++) {

            cell = new Cell((cellWidth * i) + cellGap  * (i + 1), (cellHeight * j) + cellGap * (j+ 1))
            cellStorage[i][j] = cell;
        }

    }
}

function draw() {
    drawBackground();
}

function drawBackground() {
    // Create the black background
    ctx.fillStyle = '#00000e';
    ctx.fillRect(0,0,newCanvasWidth ,newCanvasHeight );

    // Cell color
    ctx.fillStyle = '#070599';

    for (var j = 0; j < heightNumber; j++) {

        for (var i = 0; i < widthNumber; i++) {
            cell2 = cellStorage[i][j];
            // console.log("This is the cell2 coords: " + cell2.x + ", " + cell2.y);
            ctx.fillRect(cell2.x, cell2.y , cellWidth, cellHeight);
        }

    }
}