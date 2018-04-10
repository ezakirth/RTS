var gl = null;
loadShaders("shader.frag", "shader.vert", GLsetup);

function GLsetup()
{
    gl = document.getElementById("canvas").getContext("webgl");
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    gl.uniforms = {
        u_worldViewProjection: twgl.m4.identity(),
        u_texture: null
    };
    
    
    gl.programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    twgl.setDefaults({attribPrefix: "a_"});
    twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1, gl.uniforms.u_worldViewProjection);
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
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