document.write(Date());
document.getElementById("variable").innerText = "Hello JS!";

var canvas = document.getElementById("snekCanvas");
var ctx =  canvas.getContext();

ctx.fillStyle = '#FF0000';
ctx.fillRect(0,0,150,75);