var Simplex = new SimplexNoise();

var zbuffer = 0;
function setup()
{
    sprite = new Sprite({
        texture : textures.dirt_grass
    });

    quad = new Quad({
        texture : textures.dirt_grass
    });
}


function render(timestamp)
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var x = Math.cos(timestamp/1000)*100;
    var y = Math.sin(timestamp/1000)*100;

    sprite.setVertices({
        x : 300 - x, y : 300 - y,
        w : 100, h : 100
    });
    quad.setVertices({
        x : 100 + x, y : 100 + y,
        x2 : 200 + x, y2 : 100 + y,
        x3 : 200 + x, y3 : 200 + y,
        x4 : 100 + x, y4 : 200 + y
    });
    
    sprite.draw();
    quad.draw();

    requestAnimationFrame(function(timestamp) { zbuffer = 0; render(timestamp); });
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
