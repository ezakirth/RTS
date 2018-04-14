"use strict";

var zbuffer = 0;
var world = null;
function setup()
{
    world = new World();
    world.init();
}

function render(timestamp)
{
    world.update(timestamp);
    world.draw();

    requestAnimationFrame(render);
}

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
