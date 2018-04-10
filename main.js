var Simplex = new SimplexNoise();

var zbuffer = 0;
function setup()
{
    console.log("ok");
}


function render(timestamp)
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var y = Math.sin(timestamp)* 100;
//    for (var i=0;i<5;i++)
    {
    sprite(textures.dirt_grass, 0, y+100, 100, 100);
    sprite(textures.dirt_grass, 25, y+125, 100, 100);
    sprite(textures.dirt_grass, 50, y+150, 100, 100);
    sprite(textures.dirt_grass, 75, y+175, 100, 100);
//    }
    requestAnimationFrame(function(timestamp) { zbuffer = 0; render(timestamp); });
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
