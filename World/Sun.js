"use strict";

/**
 * @class Sun
 * @author Xavier de Boysson
 * @
 */
class Sun {
    /**
     * Creates a Sun object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.size = param.size;
        this.x = param.x;
        this.y = param.y;


        this.halo = new Sprite({
            type : "static",
            texture : textures.halo,
            x : this.x,
            y : this.y,
            w : 1.75 * this.size,
            h : 1.75 * this.size,
        });
    
        this.sun = new Sprite({
            type : "static",
            texture : textures.sun,
            x : this.x,
            y : this.y,
            w : this.size,
            h : this.size
        });
    
        this.glow = new Sprite({
            type : "static",
            texture : textures.glow,
            x : this.x,
            y : this.y,
            w : this.size,
            h : this.size
        });

    }

    move(x, y)
    {
        this.halo.x -= x;
        this.halo.y += y;
        this.glow.x -= x;
        this.glow.y += y;
        this.sun.x -= x;
        this.sun.y += y;
    }

    update()
    {

        this.halo.r += .002*Game.world.speed;
        if (this.halo.r > 2*Math.PI)
            this.halo.r = 0;

        this.glow.r -= .004*Game.world.speed;
        if (this.glow.r < -2*Math.PI)
            this.glow.r = 0;

        this.halo.update();
        this.sun.update();
        this.glow.update();
    }

    draw()
    {
        this.halo.draw();
        this.sun.draw();
        this.glow.draw();
    }

    touch(x, y)
    {
        this.sun.touch(x, y);
    }
    
}