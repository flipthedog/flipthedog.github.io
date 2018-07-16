// Canvas objects
var canvas = document.getElementById("snekCanvas");
var ctx =  canvas.getContext("2d");

exitVar = false;

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

var hasApple = false;
var appleCell = null;

document.addEventListener("keydown", function(event){
    if(event.keyCode == 13) {
        // ENTER
        exit();
    } else if (event.keyCode == 37) {
        // LEFT ARROW
        // console.log("left");
        if (snek.vx != 1) {
            snek.vx = -1;
            snek.vy = 0;
        }
    } else if (event.keyCode == 38) {
        // UP ARROW
        // console.log("up");
        if (snek.vy != 1) {
            snek.vx = 0;
            snek.vy = -1;
        }
    } else if (event.keyCode == 39) {
        // RIGHT ARROW
        // console.log("right");
        if (snek.vx != -1) {
            snek.vx = 1;
            snek.vy = 0;
        }
    } else if (event.keyCode == 40) {
        // DOWN ARROW
        // console.log("down");
        if (snek.vy != 1) {
            snek.vx = 0;
            snek.vy = 1;
        }
    }
});

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
    this.containsApple = false;
}

function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 1;
    this.vy = 0;
    this.previousPositions = new Array();
    this.snakeLength = 1;
}

function init() {

    dead = false;

    for (var j = 0; j < heightNumber ; j++) {

        for (var i = 0; i < widthNumber ; i++) {

            cell = new Cell((cellWidth * i) + cellGap  * (i + 1), (cellHeight * j) + cellGap * (j+ 1))
            cellStorage[i][j] = cell;

        }

    }
    randX = Math.floor(Math.random() * (widthNumber / 4));
    randY = Math.floor(Math.random() * (heightNumber / 4));
    console.log("Random: " + randX + ", " + randY);
    randomCell = cellStorage[randX][randY];

    snek = new Snake(randomCell.x,randomCell.y);
}

function draw() {
    drawBackground();
    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(snek.x, snek.y, cellWidth, cellHeight);

    for (i = 1; i < snek.snakeLength; i++) {
        if (snek.previousPositions[i] != null) {
            ctx.fillRect(snek.previousPositions[i].x, snek.previousPositions[i].y, cellWidth, cellHeight);
        }
    }

    if (snek.previousPositions.length > snek.snakeLength) {
        snek.previousPositions.shift();
    }
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

function update(){

    snek.x = snek.x + (snek.vx) * (cellGap + cellWidth);
    snek.y = snek.y + (snek.vy) * (cellGap + cellHeight);

    if (appleCell != null) {
        if (snek.x == appleCell.x && snek.y == appleCell.y) {
            currentScore = parseInt(document.getElementById('score').innerHTML) + 1;
            document.getElementById('score').innerHTML = currentScore.toString();
            appleCell.containsApple = false;
            snek.snakeLength++;
            hasApple = false;
        }
    }
    createNewApple();
    checkIfDead();
    snek2 = new Snake(snek.x,snek.y);
    snek.previousPositions.push(snek2);


}

function checkIfDead() {
    for (var i = 1; i < snek.previousPositions.length; i++){
        prevPose = snek.previousPositions[i];
        if(snek.x == prevPose.x && snek.y == prevPose.y){
            deads();
        }
    }
    if (snek.x < 0 || snek.y < 0 || snek.x >= newCanvasWidth || snek.y >= newCanvasHeight) {
        deads();
    }
}

function deads(){
    document.getElementById('status').innerHTML = "You ded.";
    dead = true;
    alert("You ded!");
    exit();
}

function createNewApple() {
    if (!hasApple) {
        hasApple = true;
        randX = Math.floor(Math.random() * (widthNumber));
        randY = Math.floor(Math.random() * (heightNumber));
        randomAppleCell = cellStorage[randX][randY];
        randomAppleCell.containsApple = true;
        appleCell = randomAppleCell;
    }
}
function loop() {
    update();
    draw();
}

// Create the background
init();
draw();

var intervalID = setInterval(loop,200);
