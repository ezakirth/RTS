"use strict";

/**
 * @class Sprite
 * @author Xavier de Boysson
 * @
 */
class Sprite {
    /**
     * Creates a Sprite object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, w : float, h : float}
     */
    constructor(param) {
        this.type = param.type;
        this.align = param.align;
        this.texture = param.texture;
        Game.world.z += 0.00001;
        this.zindex = Game.world.z;

        this.x = param.x || 0;
        this.y = param.y || 0;
        this.w = param.w || 100;
        this.h = param.h || 100;

        if (this.align == "center")
        {
            this.x -= this.w/2;
            this.y -= this.h/2;
        }

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
            texcoord: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
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
        // Projection*View*Model
        if (this.type == "static")
            twgl.m4.multiply(Game.world.projectionMatrix, twgl.m4.identity(), this.uniforms.u_modelViewProjection);
        else
            twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);

        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);
    }

    draw()
    {
        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);

        gl.drawElements(Game.renderMode, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
    }    

}

