
var viewMatrix;
var zbuffer = 0;
function setup()
{

    ViewMatrix = twgl.m4.identity();
    bg = new Sprite({
        type : "static",
        texture : textures.bg,
        x : .01,
        y : .01 + 200,
        w : gl.canvas.clientWidth,
        h : gl.canvas.clientHeight - 200
    });
    

    halo = new Sprite({
        align : "center",
        type : "static",
        texture : textures.halo,
        x : 0.1,
        y : 0.1,
        w : 600,
        h : 600
    });

    sun = new Sprite({
        align : "center",
        type : "static",
        texture : textures.sun,
        x : 0.1,
        y : 0.1,
        w : 300,
        h : 300
    });


    ground = new Ground({
        texture : textures.ground,
        offsetY : 100,
        size : 256
    });

    glow = new Sprite({
        align : "center",
        type : "unit",
        texture : textures.glow,
        x : 600.1,
        y : 200.1,
        w : 100,
        h : 100
    });





}


function rotate(sprite, timestamp)
{
    twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1, sprite.uniforms.u_worldViewProjection);
    twgl.m4.translate(sprite.uniforms.u_worldViewProjection, twgl.v3.create(gl.canvas.clientWidth - 200, 500,0), sprite.uniforms.u_worldViewProjection);
    twgl.m4.axisRotate(sprite.uniforms.u_worldViewProjection, twgl.v3.create(0,0,-1), timestamp/600, sprite.uniforms.u_worldViewProjection);
    
}

function render(timestamp)
{
    ViewMatrix = twgl.m4.identity();

    Input.update();
    twgl.m4.translate(ViewMatrix, twgl.v3.create(Input.Pos,0,0), ViewMatrix);
    rotate(sun, timestamp);
    rotate(halo, -timestamp/8);

    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    bg.draw();

    halo.draw();
    sun.draw();
    ground.draw();

    glow.draw();

    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
