"use strict";

/**
 * @class World
 * @author Xavier de Boysson
 * @
 */
class World {
    /**
     * Creates a World object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.ViewMatrix = twgl.m4.identity();
        this.projectionMatrix = twgl.m4.ortho(0, Game.width, 0, Game.height, -1, 1);
        this.z = 0;
        this.time = 1;
        this.speed = 1;
        this.lastTime = 1;
        this.units = [];
    }

    init()
    {
        this.sky = new Sky();

        this.map = new Map({
            texture : textures.ground,
            offsetY : 256,
            texWidth : 192,
            texHeight : 384,
            noise : 64
        });
        
        for (var i=0;i<1000;i++)
        {
            this.units[i] = new Unit();
        }
    }

    update()
    {
        this.time = Date.now();
        // Normalize game speed
        this.speed = 60/(1000/(this.time - this.lastTime));
        if (this.speed > 5) this.speed = 5;
        Input.update();
        this.ViewMatrix = twgl.m4.identity(this.ViewMatrix);
        twgl.m4.translate(this.ViewMatrix, twgl.v3.create(Input.viewPos,0,0), this.ViewMatrix);

        this.sky.update();

        this.map.update();
        
        for (var i=0; i<this.units.length; i++)
        {
            this.units[i].update();
        }        

    }

    draw()
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.sky.draw();
        this.map.draw();
            
        for (var i=0; i<this.units.length; i++)
        {
            this.units[i].draw();
        }
    
        this.lastTime = this.time;

    }
    
}