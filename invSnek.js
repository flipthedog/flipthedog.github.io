// invSnek.js
// Controls the inverted snek game
// Also definitely not snake...
// Work in progress, check back soon

////////////// CANVAS Variables /////////////////////////

// Canvas objects
var canvas = document.getElementById("invSnekCanvas");
var ctx =  canvas.getContext("2d");

// Total Canvas dimensions
var canvasHeight = parseInt(canvas.getAttribute('width'));
var canvasWidth = parseInt(canvas.getAttribute('height'));

// Number of cells
var widthNumber = 15;
var heightNumber = 15;
var cellGap = 3;

// Actual snek canvas size, to draw the screen
var actualCanvasWidth = canvasWidth / 2;
var actualCanvasHeight = canvasHeight / 2;

// Cell dimensions
var cellWidth = parseInt((actualCanvasWidth - ((widthNumber + 1) * cellGap)) / (widthNumber));
var cellHeight = parseInt((actualCanvasHeight - ((heightNumber + 1) * cellGap)) / (heightNumber));

// How much to offset the canvas
var canvasXOffset = actualCanvasWidth;
var canvasYOffset = actualCanvasHeight;

// Recalculate the canvas dimensions
var newCanvasWidth = ((cellGap) * (widthNumber + 1)) + widthNumber * cellWidth;
var newCanvasHeight = ((cellGap) * (heightNumber + 1)) + heightNumber * cellHeight;

// Find the total canvas size
var totalCanvasWidth = newCanvasWidth * 2;
var totalCanvasHeight = newCanvasHeight * 2;

var canvasXOrigin = (totalCanvasWidth / 2) - newCanvasWidth / 2;
var canvasYOrigin = (totalCanvasHeight / 2) - newCanvasHeight / 2;

canvas.setAttribute('width', totalCanvasWidth);
canvas.setAttribute('height', totalCanvasHeight);

//ctx.fillStyle = '#ff111d';
//ctx.fillRect(canvasXOrigin,canvasYOrigin,totalCanvasWidth,totalCanvasHeight);


//ctx.fillStyle = '#0c04ff';
//ctx.fillRect(canvasXOffset - newCanvasWidth / 2, canvasYOffset - newCanvasHeight / 2, newCanvasWidth, newCanvasHeight);

////////////// GAME Variables /////////////////////////
var dead = false;

var boardUp = 0;
var boardLeft = 0;

// Game event handling
document.addEventListener("keydown", function(event){
    if(event.keyCode === 13) {
        // ENTER
        // Exit Key
        deads();
        draw();
        exit();
    } else if (event.keyCode === 37) {
        // LEFT ARROW
        // console.log("left");
        if (snek.previousDir[0] !== 1) {
            snek.vx = -1;
            snek.vy = 0;
        }
    } else if (event.keyCode === 38) {
        // UP ARROW
        // console.log("up");
        if (snek.previousDir[1] !== 1) {
            snek.vx = 0;
            snek.vy = -1;
        }
    } else if (event.keyCode === 39) {
        // RIGHT ARROW
        // console.log("right");
        if (snek.previousDir[0] !== -1) {
            snek.vx = 1;
            snek.vy = 0;
        }
    } else if (event.keyCode === 40) {
        // DOWN ARROW
        // console.log("down");
        if (snek.previousDir[1] !== -1) {
            snek.vx = 0;
            snek.vy = 1;
        }
    }
});

// Cell storage 2D array
var cellStorage = new Array(heightNumber);
for (var i = 0; i < widthNumber; i++) {
    cellStorage[i] = new Array(widthNumber);
}

function Cell(xRel, yRel) {
    // Cell position relative to the (0,0) cell
    this.x = xRel;
    this.y = yRel;
    this.containsApple = false;
}

function Snake() {
    this.vx = 1;
    this.vy = 0;
    this.previousPositions = new Array();
    this.snakeLength = 1;
    this.previousDir = [0,0];
}

function init() {

    for (var i = 0; i < heightNumber; i++) {

        for (var j = 0; j < widthNumber; j++) {
            cell = new Cell((cellWidth * i) + cellGap  * (i + 1), (cellHeight * j) + cellGap * (j+ 1));
            cellStorage[i][j] = cell;
        }

    }

    snek = new Snake();
}

function draw() {
    drawBackground()
}

function drawBackground() {
    ctx.fillStyle = '#3c3c3c';
    ctx.fillRect(0,0,totalCanvasWidth,totalCanvasHeight)

    ctx.fillStyle = '#000000';
    ctx.fillRect(canvasXOrigin + boardLeft, canvasYOrigin +boardUp, newCanvasWidth, newCanvasHeight)

    ctx.fillStyle = '#070599';

    for (var i = 0; i < heightNumber; i ++) {

        for (var j = 0; j < widthNumber; j++) {
            cell = cellStorage[i][j];
            ctx.fillRect(canvasXOrigin + cell.x + boardLeft, canvasYOrigin + cell.y + boardUp, cellWidth, cellHeight);
        }

    }

    ctx.fillStyle = '#FF0000';
    ctx.fillRect(totalCanvasWidth / 2 - cellWidth / 2, totalCanvasHeight / 2 - cellHeight / 2, cellWidth, cellHeight);

}

function update() {
    boardLeft = boardLeft - (snek.vx) * (cellGap + cellWidth);
    boardUp = boardUp - (snek.vy) * (cellGap + cellHeight);
}

function loop() {
    update()
    draw();
}

function exit() {
    clearInterval(intervalID);
}

// Create the background
init();
draw();

// Loop interval, game speed
// in this case 200ms
var intervalID = setInterval(loop,200);
