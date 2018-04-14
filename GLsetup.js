"use strict";

var gl = null;
Utils.loadShaders("shader.frag", "shader.vert", GLsetup);

function GLsetup()
{
    gl = document.getElementById("canvas").getContext("webgl",{ alpha: true });
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    
    gl.programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    gl.useProgram(gl.programInfo.program);

    twgl.setDefaults({attribPrefix: "a_"});
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
//    gl.clearColor(45.9, 26.775, 21.93, 1);
    gl.clearColor(0.180, 0.105, 0.086, 1);

    loadTextures();

}

