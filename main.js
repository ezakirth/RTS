"use strict";

function setup()
{
    Game.world = new World();
    Game.world.init();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    Game.world.update();
    Editor.update();
    
    Game.world.draw();


    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='lib/stats.js';document.head.appendChild(script);})()
