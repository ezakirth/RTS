var gl, programInfo, bufferInfo = null;
loadShaders("shader.frag", "shader.vert", setup);

var Simplex = new SimplexNoise();

var uniforms = null;

function setup()
{
    gl = document.getElementById("canvas").getContext("webgl");
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;    
    
    twgl.setDefaults({attribPrefix: "a_"});
    programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

    const arrays = {
        position: [
            0, 0, 0,
            gl.canvas.clientWidth, 0, 0,
            0, gl.canvas.clientHeight, 0,
            0, gl.canvas.clientHeight, 0,
            gl.canvas.clientWidth, 0, 0,
            gl.canvas.clientWidth, gl.canvas.clientHeight, 0
                ],

        texcoord: [
            0, 1,
            1, 1,
            0, 0,
            0, 0,
            1, 1,
            1, 0,
            ],

    };
    
    bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    uniforms = {
        u_worldViewProjection: twgl.m4.identity()
      };

    uniforms.u_texture = twgl.createTexture(gl, {
        src: "bike.png"
      }, render);
    


}


  function render() {
      
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);




    twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1, uniforms.u_worldViewProjection);


    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

//    gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(render);
  }