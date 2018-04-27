"use strict";

/**
 * @class Sprite
 * @author Xavier de Boysson
 * @
 */
class Sprite {
    /**
     * Creates a Sprite object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, w : float, h : float, type : string, align : string, scale : float}
     */
    constructor(param) {
        this.type = param.type || "dynamic";
        this.align = param.align;
        this.texture = param.texture;
        Game.world.z += 0.00001;
        this.zindex = Game.world.z;
        this.scale = param.scale || 1;

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

        this.screenPos = twgl.m4.getTranslation(this.modelMatrix);
        this.screenX = 0;
        this.screenY = 0;
    }

    update()
    {
        // Projection*View*Model
        if (this.type == "static")
            twgl.m4.multiply(Game.world.projectionMatrix, twgl.m4.identity(), this.uniforms.u_modelViewProjection);
        else
            twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);

        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);

        this.screenPos = twgl.m4.getTranslation(this.modelMatrix);
    }

    draw()
    {
        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);

        if (Game.wireFrame == "1")
            gl.drawElements(gl.LINE_STRIP, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        else
            gl.drawElements(gl.TRIANGLES, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
    }
    
    touch(x, y)
    {
        var spriteX = this.screenPos[0];
        var spriteY = this.screenPos[1];
        
        if (this.align == "center")
        {
            spriteX -= this.w/2;
            spriteY -= this.h/2;
        }

        if ( (x > spriteX && x < spriteX + this.w) && (y > spriteY && y < spriteY + this.h) )
        {
            if (!Game.target || this.zindex > Game.target.zindex)
            {
                this.screenX = spriteX;
                this.screenY = Game.height - (spriteY + this.h);
                Game.target = this;
            }
        }

    }

}
