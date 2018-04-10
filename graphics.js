function sprite(texture, x, y, w, h)
{
    var tl = {x : 0, y : 0};
    var tr = {x : gl.canvas.clientWidth, y : 0};
    var bl = {x : 0, y : gl.canvas.clientHeight};
    var br = {x : gl.canvas.clientWidth, y : gl.canvas.clientHeight};

    var tl = {x : x, y : y};
    var tr = {x : x + w, y : y};
    var bl = {x : x, y : y + h};
    var br = {x : x + w, y : y + h};
    zbuffer += .00001;    
    gl.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
        position: [tl.x, tl.y, zbuffer, tr.x, tr.y, zbuffer, bl.x, bl.y, zbuffer, bl.x, bl.y, zbuffer, tr.x, tr.y, zbuffer, br.x, br.y, zbuffer],
        texcoord: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    });

    gl.uniforms.u_texture = texture;
    gl.useProgram(gl.programInfo.program);
    twgl.setBuffersAndAttributes(gl, gl.programInfo, gl.bufferInfo);
    twgl.setUniforms(gl.programInfo, gl.uniforms);
    twgl.drawBufferInfo(gl, gl.bufferInfo);
}
