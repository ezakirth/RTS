

var zbuffer = 0;
function setup()
{

    bg = new Sprite({
        texture : textures.bg,
        x : .01,
        y : .01 + 200,
        w : gl.canvas.clientWidth,
        h : gl.canvas.clientHeight - 200
    });
    

    sun = new Sprite({
        texture : textures.sun,
        x : gl.canvas.clientWidth - 600,
        y : gl.canvas.clientHeight/2,
        w : 400,
        h : 400
    });

    halo = new Sprite({
        texture : textures.halo,
        x : gl.canvas.clientWidth - 800,
        y : gl.canvas.clientHeight - 650,
        w : 800,
        h : 800
    });


    glow = new Sprite({
        texture : textures.glow,
        x : gl.canvas.clientWidth - 600,
        y : gl.canvas.clientHeight/2,
        w : 400,
        h : 400
    });


    ground = new Ground({
        texture : textures.ground,
        offsetY : 100,
        size : 256
    });



}


function render(timestamp)
{
    Input.update();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    bg.draw();

    sun.draw();
  //  halo.draw();
  //  glow.draw();

    ground.draw();


    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
