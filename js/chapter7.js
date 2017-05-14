window.onload = init;

function init() {

    a();
}

function canvasSupport() {
    return Modernizr.canvas;
}

var flowerImage;

// canvasApp
function a() {

    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;

    flowerImage = new Image();
    flowerImage.src = "img/flower_small.jpg";
    flowerImage.onload = previewHandler;

    // var selectObj = document.getElementById("backgroundColor");
    // var index = selectObj.selectedIndex;
    // var bgColor = selectObj[index].value;
    // console.log(bgColor);
}

var w;
var h;

function previewHandler() {

    // if (!canvasSupport()) {
    //     return;
    // }

    var canvas = document.getElementById("tshirtCanvas");
    if (!canvas.getContext) {
        return;
    }

    var context = canvas.getContext("2d");
    context.save();
    context.scale(2, 2);

    w = canvas.width / 2;
    h = canvas.height / 2;

    fillBackgroundColor(canvas, context);
    context.strokeStyle = "#646464";
    context.strokeRect(0, 0, w, h);

    var selectObj = document.getElementById("shape");
    var shape = selectObj.value;
    if (shape == "squares") {
        for (var squares = 0; squares < 20; squares++) {
            drawSquare(canvas, context);
        }
    } else if (shape == "circles") {
        for (var circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
        }
    }

    drawText(canvas, context);
    context.drawImage(flowerImage, 10, h - 40);

    // context.fillStyle = '#E872B0';
    // context.fillRect(10, 10, 100, 100);
    context.restore();
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var backgroundColor = selectObj.value;

    context.fillStyle = backgroundColor;
    context.rect(0, 0, w, h);
    context.fill();
}

function drawSquare(canvas, context) {

    var colors = [
        'rgb(216, 61, 84)',
        'rgb(232, 114, 176)',
        'rgb(226, 90, 136)',
    ];
    var maxWidth = 40;
    var minWidth = 10;

    var randomX = Math.random() * (w - maxWidth);
    var randomY = Math.random() * (h - maxWidth);

    var randomWidth = minWidth + Math.random() * (maxWidth - minWidth);

    context.save();
    context.fillStyle = "lightBlue"; // colors[Math.floor(Math.random() * (colors.length))];
    context.globalAlpha = 0.5;
    context.fillRect(randomX, randomY, randomWidth, randomWidth);
    context.restore();
}

function drawCircle(canvas, context) {

    var colors = [
        'rgb(216, 61, 84)',
        'rgb(232, 114, 176)',
        'rgb(226, 90, 136)',
    ];
    var maxRadius = 40;
    var minRadius = 10;

    var randomRadius = minRadius + Math.random() * (maxRadius - minRadius);

    var randomX = randomRadius + Math.random() * (w - randomRadius * 2);
    var randomY = randomRadius + Math.random() * (h - randomRadius * 2);

    context.save();
    context.fillStyle = colors[Math.floor(Math.random() * (colors.length))];
    context.globalAlpha = 0.5;
    context.beginPath();
    context.arc(randomX, randomY, randomRadius, 0, (Math.PI / 180) * 360, false);
    context.fill();
    context.closePath();
    context.restore();
}

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var foregroundColor = selectObj.value;

    context.save();
    context.fillStyle = foregroundColor;
    context.font = "normal" + " " + "normal" + " " + "18" + "px " + "garamond";

    context.textAlign = "left";
    context.fillText("I saw this tweet", 10, 20);

    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", w - 10, h - 20);

    var selectObj = document.getElementById("tweets");
    var tweet = selectObj.value;

    context.font = "italic" + " " + "22" + "px " + "serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(tweet, w / 2, h / 2);

    context.restore();
}
