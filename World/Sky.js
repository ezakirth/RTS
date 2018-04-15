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
        this.size = 2;
        this.bg = new Sprite({
            type : "static",
            texture : textures.bg,
            x : 0,
            y : 0,
            w : Game.width,
            h : Game.height
        });

        this.halo = new Sprite({
            align : "center",
            type : "static",
            texture : textures.halo,
            w : 350 * this.size,
            h : 350 * this.size
        });
    
        this.sun = new Sprite({
            align : "center",
            type : "static",
            texture : textures.sun,
            w : 200 * this.size,
            h : 200 * this.size
        });
    
        this.glow = new Sprite({
            align : "center",
            type : "static",
            texture : textures.glow,
            w : 220 * this.size,
            h : 220 * this.size
        });

        this.pos = twgl.v3.create(
            Game.width -  200 * this.size,
            Game.height - 150 * this.size,
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

        this.rotHalo += .002*Game.world.speed;
        if (this.rotHalo > 2*Math.PI)
            this.rotHalo = 0;

        this.rotGlow -= .004*Game.world.speed;
        if (this.rotGlow < -2*Math.PI)
            this.rotGlow = 0;

        this.scaleHalo += .02 * Game.world.speed;
        this.scaleGlow += .01 * Game.world.speed;

        Utils.rotate(this.halo, this.rotHalo);
        Utils.rotate(this.glow, this.rotGlow);
        
        Utils.scale(this.halo, 1 + Math.sin(this.scaleHalo)/15);
        Utils.scale(this.glow, 1 + Math.sin(this.scaleGlow)/5);

        this.bg.update();
        this.halo.update();
        this.sun.update();
        this.glow.update();
    }

    draw()
    {
        this.bg.draw();
        this.halo.draw();
        this.sun.draw();
        this.glow.draw();
    }
    
}