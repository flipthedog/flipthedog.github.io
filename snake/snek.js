// Snek.js
// Controls the snek game
// Definitely not snake...

// Game variables
var exitVar = false;
var hasApple = false;
var appleCell = null;

// Canvas objects
var canvas = document.getElementById("snekCanvas");
var ctx =  canvas.getContext("2d");

// Canvas dimensions
var canvasHeight = parseInt(canvas.getAttribute('width'));
var canvasWidth = parseInt(canvas.getAttribute('height'));

// Number of cells
var widthNumber = 15;
var heightNumber = 15;
var cellGap = 3;

// Cell dimensions
var cellWidth = parseInt((canvasWidth - ((widthNumber + 1 ) * cellGap)) / (widthNumber));
var cellHeight = parseInt((canvasHeight - ((heightNumber + 1) * cellGap)) / (heightNumber));

// Reset the canvas height to match whole integer pixels
// avoids ugly gaps
var newCanvasWidth =  ((cellGap ) * (widthNumber + 1)) + widthNumber * cellWidth;
var newCanvasHeight = ((cellGap ) * (heightNumber + 1)) + heightNumber * cellHeight;
canvas.setAttribute('width', newCanvasWidth );
canvas.setAttribute('height', newCanvasHeight);

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
for (var i =0; i < widthNumber; i++) {
    cellStorage[i] = new Array(widthNumber);
}

// Cell Object
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.containsApple = false;
}

// Snake Object
function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 1;
    this.vy = 0;
    this.previousPositions = new Array();
    this.snakeLength = 1;
    this.previousDir = [0,0];
}

// Initialize the game
function init() {

    // The player is not dead
    dead = false;

    // Create the cells
    for (var j = 0; j < heightNumber ; j++) {

        for (var i = 0; i < widthNumber ; i++) {

            cell = new Cell((cellWidth * i) + cellGap  * (i + 1), (cellHeight * j) + cellGap * (j+ 1))
            cellStorage[i][j] = cell;

        }

    }

    // Find and retrieve the starting cell
    randX = Math.floor(Math.random() * (widthNumber / 4));
    randY = Math.floor(Math.random() * (heightNumber / 4));
    randomCell = cellStorage[randX][randY];

    // Create a new snake at the starting cell
    snek = new Snake(randomCell.x,randomCell.y);
}

// Draw function to call more drawing functions
function draw() {
    drawBackground();
    drawSnake();
}

// Draw the snek on the canvas
function drawSnake() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(snek.x, snek.y, cellWidth, cellHeight);

    // Draw the previous snake positions
    for (i = 1; i < snek.snakeLength; i++) {
        if (snek.previousPositions[i] != null) {
            ctx.fillRect(snek.previousPositions[i].x, snek.previousPositions[i].y, cellWidth, cellHeight);
        }
    }

    // If the snake is too long, remove the last stored cell
    if (snek.previousPositions.length > snek.snakeLength) {
        snek.previousPositions.shift();
    }
}

// Draw the background of cells on the canvas
function drawBackground() {
    // Create the black background
    ctx.fillStyle = '#00000e';
    ctx.fillRect(0,0,newCanvasWidth ,newCanvasHeight );

    // Cell color
    ctx.fillStyle = '#070599';

    // Draw the cells
    for (var j = 0; j < heightNumber; j++) {

        for (var i = 0; i < widthNumber; i++) {
            cell2 = cellStorage[i][j];
            // console.log("This is the cell2 coords: " + cell2.x + ", " + cell2.y);
            if (dead){
                ctx.fillStyle = "#ff0000";
            }
            ctx.fillRect(cell2.x, cell2.y , cellWidth, cellHeight);
            if (cell2.containsApple ) {
                ctx.fillStyle = "#12ff00";
                var appleWidth = cellWidth / 4;
                var appleHeight = cellHeight / 4;

                ctx.fillRect(cell2.x + cellWidth / 2 - appleWidth / 2,cell2.y + cellHeight / 2 - appleHeight / 2, appleWidth, appleHeight);
                ctx.fillStyle = '#070599';
            }
        }

    }
}


// Exit the game loop
function exit() {
    clearInterval(intervalID);
}

// Game update
function update(){

    // Update the snake position
    snek.x = snek.x + (snek.vx) * (cellGap + cellWidth);
    snek.y = snek.y + (snek.vy) * (cellGap + cellHeight);

    // Update the snake previousDir
    // Avoids snake control bugs
    if(snek.vx === 0 && snek.vy == 1) {
        // Down
        snek.previousDir = [0,1]
    } else if(snek.vx === 0 && snek.vy == -1) {
        // Up
        snek.previousDir = [0,-1]
    } else if(snek.vx === -1 && snek.vy == 0) {
        // Left
        snek.previousDir = [-1,0]
    } else if(snek.vx === 1 && snek.vy == 0) {
        // Right
        snek.previousDir = [1,0]
    }

    // Check if the snek is currently at an apple
    if (appleCell != null) {
        if (snek.x == appleCell.x && snek.y == appleCell.y) {
            currentScore = parseInt(document.getElementById('score').innerHTML) + 1;
            document.getElementById('score').innerHTML = currentScore.toString();
            appleCell.containsApple = false;
            snek.snakeLength++;
            hasApple = false;
        }
    }

    // Check if a new apple needs to be made
    createNewApple();

    // Check if the game needs to end
    checkIfDead();

    // Push the previous snake position to storage
    snek2 = new Snake(snek.x,snek.y);
    snek.previousPositions.push(snek2);
}

// Function to check snake ending conditions
function checkIfDead() {
    // Check if the current snake position lines up with one of the previous positions
    for (var i = 1; i < snek.previousPositions.length; i++){
        prevPose = snek.previousPositions[i];
        if(snek.x == prevPose.x && snek.y == prevPose.y){
            deads();
        }
    }

    // Check that the snake is not outside the boundary
    if (snek.x < 0 || snek.y < 0 || snek.x >= newCanvasWidth || snek.y >= newCanvasHeight) {
        deads();
    }
}

// Game enters the dead state
function deads(){
    document.getElementById('status').innerHTML = "You ded.";
    dead = true;
    //alert("You ded!");
    exit();
}

// Create a new apple on screen for the snake to eat
function createNewApple() {
    if (!hasApple) {
        hasApple = true;
        // Find a new location for the apple
        randX = Math.floor(Math.random() * (widthNumber));
        randY = Math.floor(Math.random() * (heightNumber));
        randomAppleCell = cellStorage[randX][randY];
        randomAppleCell.containsApple = true;
        appleCell = randomAppleCell;
    }
}

// Main game loop
function loop() {
    update();
    draw();
}

// Create the background
init();
draw();

// Loop interval, game speed
// in this case 200ms
var intervalID = setInterval(loop,200);
