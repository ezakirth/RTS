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
        this.static = param.static;
        this.align = param.align;
        this.texture = param.texture;
        Game.world.z += 0.00001;
        this.zindex = Game.world.z;

        this.scale = param.scale || 1;

        this.pos = twgl.v3.create(
            param.x || 0,
            param.y || 0,
            0
        );

        this.size = twgl.v3.create(
            param.w || 100,
            param.h || 100,
            1
        );

        this.r = 0;

        var bl = {x : -.5, y : -.5};
        var br = {x : .5, y : -.5};
        var tr = {x : .5, y : .5};
        var tl = {x : -.5, y : .5};

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
                ]
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

        this.screenX = 0;
        this.screenY = 0;
    }



    update()
    {
        this.modelMatrix =  twgl.m4.identity(this.modelMatrix);
        twgl.m4.translate(this.modelMatrix, this.pos, this.modelMatrix);
        twgl.m4.rotateZ(this.modelMatrix, this.r, this.modelMatrix);
        twgl.m4.scale(this.modelMatrix, this.size, this.modelMatrix);
        

        // Projection*View*Model
        if (this.static)
            twgl.m4.multiply(Game.world.projectionMatrix, twgl.m4.identity(), this.uniforms.u_modelViewProjection);
        else
            twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);

        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);

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
        var screenPos = twgl.m4.getTranslation(this.modelMatrix);
        var spriteX = screenPos[0];
        var spriteY = screenPos[1];
        if ( (x > spriteX - this.w/2 && x < spriteX + this.w/2) && (y > spriteY - this.h/2 && y < spriteY + this.h/2) )
        {
            if (!Game.target || this.zindex > Game.target.zindex)
            {
                this.cursorX = x;
                this.cursorY = y;
                this.screenX = spriteX - this.w/2;
                this.screenY = Game.height - (spriteY + this.h/2);
                Game.target = this;
            }
        }

    }

    get x()
    {
        return this.pos[0];
    }

    set x(x)
    {
        this.pos[0] = x;
    }

    get y()
    {
        return this.pos[1];
    }

    set y(y)
    {
        this.pos[1] = y;
    }

    get w()
    {
        return this.size[0];
    }

    set w(w)
    {
        this.size[0] = w;
    }

    get h()
    {
        return this.size[1];
    }

    set h(h)
    {
        this.size[1] = h;
    }


}
