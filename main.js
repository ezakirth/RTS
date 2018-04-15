"use strict";

function setup()
{
    Game.world = new World();
    Game.world.init();

    Game.scaleTo(window.innerWidth, window.innerHeight);
}

function render()
{
    Game.world.update();
    Game.world.draw();

    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
