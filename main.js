"use strict";

function setup()
{
    Menu.init();
    Game.world = new World();
    Game.world.init();

    Game.scaleTo(window.innerWidth, window.innerHeight);

    $("#saveButton").attr("href", "data:application/xml;charset=utf-8," + JSON.stringify(Game.world.map));
    
}

function render()
{
    Game.world.update();
    Game.world.draw();

    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='lib/stats.js';document.head.appendChild(script);})()
