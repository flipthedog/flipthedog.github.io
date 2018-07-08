// document.write(Date());
// document.getElementById("variable").innerText = "Hello JS!";

var cellwidth = 20;
var cellheight = 20;
var canvas = document.getElementById("snekCanvas");
var ctx =  canvas.getContext("2d");

ctx.fillStyle = '#00000e';
ctx.fill()


function createBackground() {
    ctx.fillRect(0,0,150,75);
    var widthNumber = 100;
    var heightNumber = 100;

    ctx.fillStyle = '#07053b';
    for (j = 0; j < heightNumber ; j++) {

        for (i = 0; i < widthNumber ; i++) {
            ctx.fillRect(cellwidth * widthNumber + 5, cellheight * heightNumber + 5, cellwidth, cellheight)
        }

    }
}