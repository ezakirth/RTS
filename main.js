
var viewMatrix, projectionMatrix;
var zbuffer = 0;
function setup()
{

    ViewMatrix = twgl.m4.identity();
    projectionMatrix = twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1);

    bg = new Sprite({
        type : "static",
        texture : textures.bg,
        x : .01,
        y : .01,
        w : gl.canvas.clientWidth,
        h : gl.canvas.clientHeight
    });
    

    halo = new Sprite({
        align : "center",
        type : "static",
        texture : textures.halo,
        x : 0.1,
        y : 0.1,
        w : 350,
        h : 350
    });

    sun = new Sprite({
        align : "center",
        type : "static",
        texture : textures.sun,
        x : 0.1,
        y : 0.1,
        w : 200,
        h : 200
    });

    glow = new Sprite({
        align : "center",
        type : "static",
        texture : textures.glow,
        x : 0.1,
        y : 0.1,
        w : 220,
        h : 220
    });

    ground = new Ground({
        texture : textures.ground,
        offsetY : 256,
        width : 192,
        height : 384
    });

    units = [];
    for (var i=0;i<100;i++)
    {
        units[i] = new Unit();
    }


    twgl.m4.translate(sun.modelMatrix, twgl.v3.create(gl.canvas.clientWidth - 400, gl.canvas.clientHeight - 150,0), sun.modelMatrix);
    twgl.m4.translate(halo.modelMatrix, twgl.v3.create(gl.canvas.clientWidth - 400, gl.canvas.clientHeight - 150,0), halo.modelMatrix);
    twgl.m4.translate(glow.modelMatrix, twgl.v3.create(gl.canvas.clientWidth - 400, gl.canvas.clientHeight - 150,0), glow.modelMatrix);

}


function rotate(sprite, rot)
{
    twgl.m4.axisRotate(sprite.modelMatrix, twgl.v3.create(0,0,1), rot*speed, sprite.modelMatrix);
}

function scale(sprite, val)
{
    twgl.m4.scale(sprite.modelMatrix, twgl.v3.create(val,val,1), sprite.modelMatrix);    
}

var last = 0;
function render(timestamp)
{
    // Normalize game speed
    if (timestamp === undefined)
        timestamp = 1;
    speed = 60/(1000/(timestamp - last));
    last = timestamp;

    Input.update();
    ViewMatrix = twgl.m4.identity();
    twgl.m4.translate(ViewMatrix, twgl.v3.create(Input.Pos,0,0), ViewMatrix);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawSky(timestamp);
    ground.draw();

    for (var i=0;i<units.length;i++)
    {
        units[i].draw(timestamp);
    }
    
    requestAnimationFrame(render);
}


function drawSky(timestamp)
{
    bg.draw();

    rotate(halo, .004*speed);
    rotate(glow, -.01*speed);
    scale(halo, 1 + Math.sin(timestamp/100)/200*speed);
    scale(glow, 1 + Math.sin(timestamp/200)/150*speed);

    halo.draw();
    sun.draw();
    glow.draw();
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
