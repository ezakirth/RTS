var FPS = 60;


var Simplex = null;
var ctx, canvas;


$(document).ready(function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineCap="round";
    Simplex = new SimplexNoise();


    startAnimating(FPS);
});


var stop = false;
var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    update();
}


var Input = {
    active : false,
    lastX : 0,
    lastY : 0,
    originX : 0,
    originY : 0,
    mouseX : 0,
    mouseY : 0,
    delta : 0,
    inertia : 0,
    keyLeft : false,
    keyRight : false,
};

document.onmouseup = function(e)
{
    Input.active = false;
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;
    Input.mouseX = e.clientX;
    Input.mouseY = e.clientY;   
}
document.onmousedown = function(e)
{
    Input.active = true;
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;
    Input.originX = Input.mouseX;
    Input.originY = Input.mouseY;
}

document.onmousemove = function(e) {
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;    
    Input.mouseX = e.clientX;
    Input.mouseY = e.clientY;

    if (Input.active)
    {
        Input.inertia = (Input.lastX - Input.mouseX)/10;
    }
}


document.onkeydown = function(e)
{
    if(e.keyCode == 37) { // left
        Input.keyLeft = true;
    }
    else if(e.keyCode == 39) { // right
        Input.keyRight = true;
    }
};

document.onkeyup = function(e)
{
    Input.keyLeft = false;
    Input.keyRight = false;
};



var w = Math.floor(window.innerWidth/30);
var movement = 0;
var noiseVal = 0;
var terrain = [];


var Bike = {
    x : 1000,
    y : 0,
    angle : 0,
    img : null,
    screenPos : 0,
};

Bike.img = document.createElement("img");
Bike.img.src = "ball.png";


function draw()
{
    ctx.fillStyle = "#00d8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (Input.keyLeft || Input.keyRight)
    {
        if (Input.keyLeft)
        {
            Input.inertia -= 1;
        }
        else
        {
            Input.inertia += 1;
        }
    }

    Bike.x +=5;
    movement += Input.inertia;
    Input.inertia -= Input.inertia/5;
  //  if (movement < 0) movement = 0;




    for (var i=0; i<w+4; i++)
    {
        noiseVal = movement/50 + i/(canvas.width/w);
        terrain[i] = Simplex.noise(noiseVal, 0)*50;
    }

    var step = 1;

    var offsetX = -75;
    var offsetY = 150;

    var widthRatio = (canvas.width + Math.abs(offsetX))/(w);
    var height = canvas.height - 100;

    var xa, xb, ya, yb = 0;



    // dirt
    ctx.fillStyle = "#91603f";
    for (var i=0; i<w; i++)
    {
        xa = (i     )*(widthRatio) + offsetX;
        xb = (i+1)*(widthRatio) + offsetX;
        ya = terrain[i] + height;
        yb = terrain[i+1] + height;

        xa = xa | 0;
        xb = xb | 0;
        ya = ya | 0;
        yb = yb | 0;


        ctx.beginPath();
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.lineTo(xb, canvas.height);
        ctx.lineTo(xa, canvas.height);
        ctx.lineTo(xa, ya);
        ctx.fill();
    }
    ctx.fillStyle = "#156b19";

    // grass
    for (var i=0; i<w; i++)
    {
        xa = (i     )*(widthRatio) + offsetX;;
        xb = (i+1)*(widthRatio) + offsetX;;
        ya = terrain[i] + height;
        yb = terrain[i+1] + height;

        xa = xa | 0;
        xb = xb | 0;
        ya = ya | 0;
        yb = yb | 0;

        ctx.beginPath();
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.lineTo(xb, yb + 40);
        ctx.lineTo(xa, ya + 40);
        ctx.lineTo(xa, ya);
        ctx.fill();
    }

    // floor
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;  
    for (var i=0; i<w; i++)
    {
        xa = (i     )*(widthRatio) + offsetX;;
        xb = (i+1)*(widthRatio) + offsetX;;
        ya = terrain[i] + height;
        yb = terrain[i+1] + height;

        xa = xa | 0;
        xb = xb | 0;
        ya = ya | 0;
        yb = yb | 0;



        ctx.beginPath();
        ctx.moveTo(xa - offsetX, ya - offsetY);
        ctx.lineTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.lineTo(xb - offsetX, yb - offsetY);
        ctx.lineTo(xa - offsetX, ya - offsetY);
        ctx.fill();
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for (var i=0; i<w; i++)
    {
        xa = (i     )*(widthRatio) + offsetX;;
        xb = (i+1)*(widthRatio) + offsetX;;
        ya = terrain[i] + height;
        yb = terrain[i+1] + height;

        xa = xa | 0;
        xb = xb | 0;
        ya = ya | 0;
        yb = yb | 0;


        ctx.beginPath();
        ctx.moveTo(xa, ya + 40);
        ctx.lineTo(xb, yb + 40);
        ctx.lineTo(xb, yb);
        ctx.lineTo(xa, ya);
        ctx.lineTo(xa, ya + 40);
        ctx.lineTo(xb, yb);

        ctx.moveTo(xb, yb + 40);
        ctx.lineTo(xb, canvas.height);
        ctx.lineTo(xa, canvas.height);
        ctx.lineTo(xb, yb + 40);

        ctx.moveTo(xa - offsetX, ya - offsetY);
        ctx.lineTo(xb - offsetX, yb - offsetY);
        ctx.lineTo(xa, ya);
        
//        ctx.moveTo(xa - offsetX, ya - offsetY);
//        ctx.lineTo(xb - offsetX, yb - offsetY);

        ctx.closePath();
        ctx.stroke();




/*
        ctx.beginPath();
        ctx.moveTo(xa, ya + 40);
        ctx.lineTo(xb, yb + 40);
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.moveTo(xa - offsetX, ya - offsetY);
        ctx.lineTo(xb - offsetX, yb - offsetY);

        ctx.closePath();
        ctx.stroke();
*/


    }

    var offset = (movement*(1920-75))/100;
    var pos = Bike.x - offset;
    var pos2 = pos + 30 ;


    i = (pos-offsetX)/(canvas.width/w);
    x = i*(widthRatio) + offsetX;

    h = terrain[Math.floor(i)];

    Bike.y = lerp(Bike.y,h,.1);
    if (isNaN(Bike.y)) Bike.y = h;

    y = Bike.y + height - 90;        
//    y = h + height - 90;


    i2 = (pos2-offsetX)/(canvas.width/w);
    x2 = i2*(widthRatio) + offsetX;
    h2 = terrain[Math.floor(i2)];

    ctx.fillStyle = "black";
    ctx.translate(x, y);
    var angle = Math.atan2(h2 - h, pos2 - pos)
    
    Bike.angle = lerp(Bike.angle , angle , .1);
    if (isNaN(Bike.angle)) Bike.angle = angle;

    ctx.rotate(Bike.angle);
    ctx.drawImage(Bike.img, -75, -70);


    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.font="20px Verdana";
    ctx.fillText("movement: " + movement + " / offset: " + offset,250,50);


}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }

function update()
{
    window.requestAnimationFrame(update);

    if (FPS == 144)
    {
        draw();
    }
    else
    {
        now = Date.now();
        elapsed = now - then;
        
        if (elapsed > fpsInterval)
        {
            then = now - (elapsed % fpsInterval);

            draw();
        }
    }
   
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

