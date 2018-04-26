"use strict";

/**
 * @class Layer
 * @author Xavier de Boysson
 * @
 */
class Layer {
    /**
     * Creates a Layer object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.layerViewMatrix = twgl.m4.identity();
        
        this.distance = param.distance;
        Game.world.z += 0.00001;
        this.zindex = Game.world.z;

        this.offset = param.offset;
        this.scale = param.scale;
        this.texture = param.texture
        this.x = 0;
        this.y = this.offset;
        this.w = 1024*this.scale;
        this.h = 512 ;

        var bl = {x : this.x, y : this.y};
        var br = {x : this.x + this.w, y : this.y};
        var tr = {x : this.x + this.w, y : this.y + this.h};
        var tl = {x : this.x, y : this.y + this.h};

        // initialize the buffers
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
            position: {
                data : [
                    bl.x, bl.y, this.zindex,
                    br.x, br.y, this.zindex,
                    tl.x, tl.y, this.zindex,
                    tl.x, tl.y, this.zindex,
                    br.x, br.y, this.zindex,
                    tr.x, tr.y, this.zindex
                ],
                drawType: gl.STATIC_DRAW
            },
            texcoord: [
                0, 1,
                this.scale, 1,
                0, 0,
                0, 0,
                this.scale, 1,
                this.scale, 0
            ],
            indices: [0,1,2,3,4,5]
        });

        this.modelMatrix = twgl.m4.identity();

        this.uniforms = {
            u_modelViewProjection: twgl.m4.identity(),
            u_texture: this.texture
        }; 


    }

    update()
    {
        // View matrix
        this.layerViewMatrix = twgl.m4.identity(this.layerViewMatrix);
        twgl.m4.translate(this.layerViewMatrix, twgl.v3.create(Input.viewPos/this.distance,0,0), this.layerViewMatrix);

        // Transform layer
        twgl.m4.multiply(Game.world.projectionMatrix, this.layerViewMatrix, this.uniforms.u_modelViewProjection);
        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);        
    }

    draw()
    {
        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);

        gl.drawElements(Game.renderMode, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);        
    }
    
}