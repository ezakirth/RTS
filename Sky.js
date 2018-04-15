"use strict";

/**
 * @class Sky
 * @author Xavier de Boysson
 * @
 */
class Sky {
    /**
     * Creates a Sky object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.bg = new Sprite({
            type : "static",
            texture : textures.bg,
            x : .01,
            y : .01,
            w : gl.canvas.clientWidth,
            h : gl.canvas.clientHeight
        });

        this.halo = new Sprite({
            align : "center",
            type : "static",
            texture : textures.halo,
            x : 0.1,
            y : 0.1,
            w : 350,
            h : 350
        });
    
        this.sun = new Sprite({
            align : "center",
            type : "static",
            texture : textures.sun,
            x : 0.1,
            y : 0.1,
            w : 200,
            h : 200
        });
    
        this.glow = new Sprite({
            align : "center",
            type : "static",
            texture : textures.glow,
            x : 0.1,
            y : 0.1,
            w : 220,
            h : 220
        });

        this.pos = twgl.v3.create(
            gl.canvas.clientWidth - 400,
            gl.canvas.clientHeight - 150,
            0
        );

        this.scaleHalo = 0;
        this.scaleGlow = 0;
        this.rotHalo = 0;
        this.rotGlow = 0;
    }

    update()
    {
        this.sun.modelMatrix =  twgl.m4.identity(this.sun.modelMatrix);
        this.halo.modelMatrix =  twgl.m4.identity(this.halo.modelMatrix);
        this.glow.modelMatrix =  twgl.m4.identity(this.glow.modelMatrix);

        twgl.m4.translate(this.sun.modelMatrix, this.pos, this.sun.modelMatrix);
        twgl.m4.translate(this.halo.modelMatrix, this.pos, this.halo.modelMatrix);
        twgl.m4.translate(this.glow.modelMatrix, this.pos, this.glow.modelMatrix);

        this.rotHalo += .002*world.speed;
        if (this.rotHalo > 2*Math.PI)
            this.rotHalo = 0;

        this.rotGlow -= .004*world.speed;
        if (this.rotGlow < -2*Math.PI)
            this.rotGlow = 0;

        this.scaleHalo += .02 * world.speed;
        this.scaleGlow += .01 * world.speed;

        Utils.rotate(this.halo, this.rotHalo);
        Utils.rotate(this.glow, this.rotGlow);
        
        Utils.scale(this.halo, 1 + Math.sin(this.scaleHalo)/15);
        Utils.scale(this.glow, 1 + Math.sin(this.scaleGlow)/5);
    }

    draw()
    {
        this.bg.draw();
        this.halo.draw();
        this.sun.draw();
        this.glow.draw();
    }
    
}