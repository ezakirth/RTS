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
        Game.world.zindex += 0.00001;
        this.type = param.type || "static";
        this.texture = param.texture;
        this.locked = param.locked || false;

        this.mirrorX = param.mirrorX || false;
        this.mirrorY = param.mirrorY || false;

        this.distance = param.distance || 1;
        this.wrapX = param.wrapX || 1;
        this.wrapY = param.wrapY || 1;

        this.pos = twgl.v3.create(
            param.x || Game.width/2,
            param.y || Game.height/2,
            param.z || 1
        );
        this.z += Game.world.zindex;

        this.size = twgl.v3.create(
            param.w || 300,
            param.h || 300,
            1
        );

        this.r = param.r || 0;

        this.visible = false;

        this.setBuffer();

        if (this.type == "prop")
            this.layerViewMatrix = Game.world.terrain.layerViewMatrix;
        else
            this.layerViewMatrix = twgl.m4.identity();
            

        this.modelMatrix = twgl.m4.identity();

        this.uniforms = {
            u_modelViewProjection: twgl.m4.identity(),
            u_texture: Game.world.textures[this.texture],
            u_color:  new Float32Array([1, 1, 1])
        };

        this.tint = param.color || "#FFFFFF";
        this.color = param.color || "#FFFFFF";
        this.screenX = 0;
        this.screenY = 0;
    }

    update()
    {
        this.visibilityTest();
        
        // Projection*View*Model
        if (this.type == "layer" || this.type == "terrain")
        {
            this.layerViewMatrix = twgl.m4.identity(this.layerViewMatrix);
            twgl.m4.translate(this.layerViewMatrix, twgl.v3.create(Input.viewPos/this.distance,0,0), this.layerViewMatrix);
        }

        if (this.visible)
        {
            this.modelMatrix =  twgl.m4.identity(this.modelMatrix);
            twgl.m4.translate(this.modelMatrix, this.pos, this.modelMatrix);
            if (this.type != "terrain")
            {
                twgl.m4.rotateZ(this.modelMatrix, this.r, this.modelMatrix);
                twgl.m4.scale(this.modelMatrix, this.size, this.modelMatrix);
            }
            twgl.m4.multiply(Game.world.projectionMatrix, this.layerViewMatrix, this.uniforms.u_modelViewProjection);
            twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);
        }
    }

    visibilityTest()
    {
        if (this.type == "static" || this.type == "terrain")
            this.visible = true;
        else
        {
            this.visible = false;

            var min = -(twgl.m4.getTranslation(this.layerViewMatrix)[0]);
            var max = min + Game.width;
            if (this.x + this.w/2 > min && this.x - this.w/2 < max)
                this.visible = true;
        }
    }

    draw()
    {
        if (this.visible)
        {
            Editor.onscreen ++;
            twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
            twgl.setUniforms(gl.programInfo, this.uniforms);
            gl.drawElements(gl.TRIANGLES, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        }
    }

    updateOverlayPos()
    {
        var layerPos = twgl.m4.getTranslation(this.layerViewMatrix);
        var screenPos = twgl.m4.getTranslation(this.modelMatrix);

        this.screenX = screenPos[0] - this.w/2 + layerPos[0];
        this.screenY = Game.height - (screenPos[1] + this.h/2);
        if (this.type == "terrain")
        {
            this.screenX = screenPos[0] + layerPos[0];
            this.screenY = Game.height - (screenPos[1]);
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

    get tint()
    {
        var rgb = Math.floor(this.uniforms.u_color[2]*255) | (Math.floor(this.uniforms.u_color[1]*255) << 8) | (Math.floor(this.uniforms.u_color[0]*255) << 16);
        return "#" + (0x1000000 | rgb).toString(16).substring(1);
    }

    set tint(hex)
    {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        this.uniforms.u_color[0] = parseInt(result[1], 16)/255;
        this.uniforms.u_color[1] = parseInt(result[2], 16)/255;
        this.uniforms.u_color[2] = parseInt(result[3], 16)/255;
        this.color = hex;
    }

}
