"use strict";

/**
 * @class Quad
 * @author Xavier de Boysson
 * @
 */
class Quad {
    /**
     * Creates a Quad object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.w, this.h, this.x, this.y, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4 = 0;

        this.type = param.type;
        this.align = param.align;
        this.texture = param.texture;
        zbuffer += 0.00001;
        this.zindex = zbuffer;

        // initialize the buffers
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
            position: {
                data : [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ],
                drawType: gl.DYNAMIC_DRAW
            },
            texcoord: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
            indices: [0,1,2,3,4,5]
        });

        
        this.setVertices(param);



//        twgl.m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1, this.modelMatrix);

        this.modelMatrix = twgl.m4.identity();

        this.uniforms = {
            u_modelViewProjection: twgl.m4.identity(),
            u_texture: this.texture
        };
        
    }

    /**
     * Sets the vertices of a Quad
     * @param {Object} {x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    setVertices(param)
    {
        this.x = param.x || this.x;
        this.y = param.y || this.y;
        this.x2 = param.x2 || this.x2;
        this.y2 = param.y2 || this.y2;
        this.x3 = param.x3 || this.x3;
        this.y3 = param.y3 || this.y3;
        this.x4 = param.x4 || this.x4;
        this.y4 = param.y4 || this.y4;

        var bl = {x : this.x, y : this.y};
        var br = {x : this.x2, y : this.y2};
        var tr = {x : this.x3, y : this.y3};        
        var tl = {x : this.x4, y : this.y4};

        this.position = [
            bl.x, bl.y, this.zindex,
            br.x, br.y, this.zindex,
            tl.x, tl.y, this.zindex,
            tl.x, tl.y, this.zindex,
            br.x, br.y, this.zindex,
            tr.x, tr.y, this.zindex
        ];
        
        twgl.setAttribInfoBufferFromArray(gl, this.bufferInfo.attribs.a_position, this.position);        
    }

    transform()
    {

        // Projection*View*Model
        if (this.type == "static")
            twgl.m4.multiply(world.projectionMatrix, twgl.m4.identity(), this.uniforms.u_modelViewProjection);
        else
            twgl.m4.multiply(world.projectionMatrix, world.ViewMatrix, this.uniforms.u_modelViewProjection);

        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);

    }
    draw()
    {
        this.transform();

        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);

    }
}

