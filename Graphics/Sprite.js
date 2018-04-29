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
        this.static = param.static || false;
        this.layer = param.layer || false;
        this.align = param.align;
        this.texture = param.texture;
        Game.world.z ++;
        this.zindex = Game.world.z;

        this.layerViewMatrix = twgl.m4.identity();
        this.distance = param.distance;

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
            u_texture: this.texture,
            u_color:  new Float32Array([1, 1, 1])
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
        {
            if (this.layer)
            {
                this.layerViewMatrix = twgl.m4.identity(this.layerViewMatrix);
                twgl.m4.translate(this.layerViewMatrix, twgl.v3.create(Input.viewPos/this.distance,0,0), this.layerViewMatrix);
                twgl.m4.multiply(Game.world.projectionMatrix, this.layerViewMatrix, this.uniforms.u_modelViewProjection);
            }
            else
                twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);
        }

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
                this.screenX = spriteX - this.w/2;
                this.screenY = Game.height - (spriteY + this.h/2);
                Game.target = this;
                Menu.loadItem(this);
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

    get color()
    {
        var rgb = Math.floor(this.uniforms.u_color[2])*255 | (Math.floor(this.uniforms.u_color[1])*255 << 8) | (Math.floor(this.uniforms.u_color[0])*255 << 16);
        return "#" + (0x1000000 | rgb).toString(16).substring(1);
    }

    set color(hex)
    {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        this.uniforms.u_color[0] = parseInt(result[1], 16)/255;
        this.uniforms.u_color[1] = parseInt(result[2], 16)/255;
        this.uniforms.u_color[2] = parseInt(result[3], 16)/255;
    }

}
