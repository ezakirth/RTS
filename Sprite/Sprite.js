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
        this.type = param.type || "static";
        this.align = param.align;
        this.texture = param.texture;

        this.locked = param.locked || false;

        this.mirrorX = param.mirrorX || false;
        this.mirrorY = param.mirrorY || false;

        this.distance = param.distance || 1;
        this.wrapX = param.wrapX || 1;
        this.wrapY = param.wrapY || 1;

        if (!param.z) param.z = 0;
        this.pos = twgl.v3.create(
            param.x || Game.width/2,
            param.y || Game.height/2,
            param.z
        );

        this.size = twgl.v3.create(
            param.w || 300,
            param.h || 300,
            1
        );

        this.r = param.r || 0;

        this.visible = false;

        this.setBuffer();

        this.layerViewMatrix = twgl.m4.identity();
        this.modelMatrix = twgl.m4.identity();

        this.uniforms = {
            u_modelViewProjection: twgl.m4.identity(),
            u_texture: Game.world.textures[this.texture],
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
        if (this.type == "prop" || this.type == "terrain")
        {
            twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);
        }
        else
        {
            if (this.type == "layer")
            {
                this.layerViewMatrix = twgl.m4.identity(this.layerViewMatrix);
                twgl.m4.translate(this.layerViewMatrix, twgl.v3.create(Input.viewPos/this.distance,0,0), this.layerViewMatrix);
            }
            twgl.m4.multiply(Game.world.projectionMatrix, this.layerViewMatrix, this.uniforms.u_modelViewProjection);
        }

        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);

        // Visibility test
        this.visible = true;
/*        var currentMatrix = this.modelMatrix;
        if (this.type == "prop") currentMatrix = Game.world.ViewMatrix;
        if (this.type == "layer") currentMatrix = this.layerViewMatrix;
        var min = -(twgl.m4.getTranslation(currentMatrix)[0] + 256);
        var max = min + Game.width + 512;
        if (this.x > min && this.x < max)
            this.visible = true;
        if (this.type == "static") this.visible = true;
*/

    }

    draw()
    {
        if (this.visible)
        {
            twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
            twgl.setUniforms(gl.programInfo, this.uniforms);

            if (Editor.wireFrame == "1")
                gl.drawElements(gl.LINE_STRIP, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
            else
                gl.drawElements(gl.TRIANGLES, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        }
    }

    updateOverlayPos()
    {
        var layerPos = null;
        if (this.type == "prop" || this.type == "prop")
            layerPos = twgl.m4.getTranslation(Game.world.ViewMatrix);
        else
            layerPos = twgl.m4.getTranslation(this.layerViewMatrix);

        var screenPos = twgl.m4.getTranslation(this.modelMatrix);
        this.screenX = screenPos[0] - this.w/2 + layerPos[0];
        this.screenY = Game.height - (screenPos[1] + this.h/2);
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

    get z()
    {
        return this.pos[2];
    }

    set z(z)
    {
        this.pos[2] = z;
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
        var rgb = Math.floor(this.uniforms.u_color[2]*255) | (Math.floor(this.uniforms.u_color[1]*255) << 8) | (Math.floor(this.uniforms.u_color[0]*255) << 16);
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
