var gl = null;
loadShaders("shader.frag", "shader.vert", GLsetup);

function GLsetup()
{
    gl = document.getElementById("canvas").getContext("webgl");
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    
    gl.programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    gl.useProgram(gl.programInfo.program);

    twgl.setDefaults({attribPrefix: "a_"});
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
  //  gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(1, 1, 1, 1);




    textures = twgl.createTextures(gl,
    {
        dirt_grass : {src: "dirt_grass.png"},
        dirt : {src: "dirt.png"},
        grass_top : {src: "grass_top.png"},
    }, function() {setup(); render();});
}