"use strict";

function setup()
{
    Editor.init();
    Game.world = new World();
    Game.world.init();
}

function render()
{
    Game.update();
    Editor.update();

    Game.draw();

    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='lib/stats.js';document.head.appendChild(script);})()
