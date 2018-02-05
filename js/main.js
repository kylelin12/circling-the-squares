var canvas = document.getElementById("canvas-one");
var ctx = canvas.getContext("2d");
var rbutt = document.getElementById("reset-button");
var tbutt = document.getElementById("toggle-button");
var diminput = document.getElementById("dimension-slider");
var curstats = document.getElementById("current-dimshape");

var togglestate = "circle";
var firstrun = true;
var curx;
var cury;

var togglefunction = function() {
    if (togglestate == "circle") {
        togglestate = "square";
    } else {
        togglestate = "circle";
    }
    updatecurstats();
};

var resetfunction = function() {
    ctx.clearRect(0, 0, 900, 900);
    firstrun = true;
    var curx = undefined;
    var cury = undefined;
    ctx.closePath();
};

var rancolor = function() {
    var colorgen = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    console.log("Generated color: " + colorgen);
    return colorgen;   
};

var drawshape = function(e) {
    var xcor = e.offsetX;
    var ycor = e.offsetY;
    var dimension = diminput.value;
    var halfdim = dimension / 2;
    var color = rancolor();
    ctx.beginPath();
    if (togglestate == "circle") {
        ctx.arc(xcor, ycor, halfdim, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.stokeStyle = color;
        ctx.fill();
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(xcor - halfdim, ycor - halfdim, dimension, dimension);
    }
    if (firstrun == true) {
        ctx.moveTo(xcor, ycor);
        curx = xcor;
        cury = ycor;
        firstrun = false;
    }
    color = rancolor();
    ctx.strokeStyle = color;
    ctx.moveTo(curx, cury);
    ctx.lineTo(xcor, ycor);
    curx = xcor;
    cury = ycor;
    ctx.stroke();
};

var updatecurstats = function(e) {
    var curstatsstring = "Shape: " + togglestate + " / Dimension: " + diminput.value;
    curstats.innerHTML = curstatsstring;
}

canvas.addEventListener('click', drawshape, true);
rbutt.addEventListener('click', resetfunction, true);
tbutt.addEventListener('click', togglefunction, true);
diminput.addEventListener('input', updatecurstats, true);