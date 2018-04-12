/**
 * @class Ground
 * @author Xavier de Boysson
 * @
 */
class Ground {
    /**
     * Creates a Ground object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {


        var Simplex = new SimplexNoise();
        var w = Math.floor(gl.canvas.clientWidth/32);
        this.w = w;
        var terrain = [];
        var xa, xb, ya, yb;
        var noiseVal = 0;
        for (var i=0; i<w*10+1; i++)
        {
            noiseVal = i/(gl.canvas.clientWidth/w);
            terrain[i] = Simplex.noise(noiseVal, 0)*50;
        }
        

        zbuffer += 0.00001;
        this.zindex = zbuffer;
        this.position = [];
        this.indices = [];
        var index = 0;

        this.textcoord = [];
        for (var i=0; i<w*10; i+=2)
        {
            xa = (i)*(gl.canvas.clientWidth/w);
            xb = (i+1)*(gl.canvas.clientWidth/w);
            ya = terrain[i] + param.offsetY;
            yb = terrain[i+1] + param.offsetY;

            this.position.push(xa, ya + param.size, this.zindex);
            this.position.push(xb, yb, this.zindex);

            var ratio = (i/w)*Math.floor(gl.canvas.clientWidth/param.size);
            var step = (1/w)*Math.floor(gl.canvas.clientWidth/param.size);
            this.textcoord.push(
                ratio, 0,
                ratio+step, 1
            );   

            this.indices.push(index++);
        }


        this.texture = param.texture;

        // initialize the buffers
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
            position: {
                data : this.position,
                drawType: gl.STATIC_DRAW
            },
            texcoord: this.textcoord,
            indices: this.indices
        });

        


        this.uniforms = {
            u_worldViewProjection: twgl.m4.identity(),
            u_texture: this.texture
        };
        twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1, this.uniforms.u_worldViewProjection);
        twgl.m4.translate(this.uniforms.u_worldViewProjection, twgl.v3.create(-12*256,0,0), this.uniforms.u_worldViewProjection);

    }


    draw()
    {
        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);

        gl.drawElements(gl.TRIANGLE_STRIP, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
  //      gl.drawElements(gl.LINE_STRIP, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        

    }
}

