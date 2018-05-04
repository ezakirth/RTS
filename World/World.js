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
        this.loaded = false;
        this.textures = {};
        this.texturesInfos = {};
        this.ViewMatrix = twgl.m4.identity();
        this.projectionMatrix = twgl.m4.ortho(0, Game.width, 0, Game.height, -100, 100);
        this.zindex = 10;
        this.time = 1;
        this.speed = 1;
        this.lastTime = 1;
        this.objects = [];
    }


    init()
    {
        this.loaded = true;
        $.getJSON( "./assets/map.json", function( data ) {
            Game.world.load(data);
        });
/*
        Game.world.texture = "grass";
        this.objects.push(new Sprite({
            type : "static",
            texture : "bg_"+Game.world.texture,
            x : Game.width/2,
            y : Game.height/2,
            w : Game.width,
            h : Game.height,
            locked : true
        }));

        this.objects.push(new Sprite({
            type : "static",
            texture : "halo",
            x: Game.width -  400,
            y: Game.height - 300,
            w : 1.75 * 350,
            h : 1.75 * 350,
        }));

        this.objects.push(new Sprite({
            type : "static",
            texture : "sun",
            x: Game.width -  400,
            y: Game.height - 300,
            w : 350,
            h : 350
        }));

        this.objects.push(new Sprite({
            type : "static",
            texture : "glow",
            x: Game.width -  400,
            y: Game.height - 300,
            w : 350,
            h : 350
        }));
        

//        this.sun = new Sun({ size : 350, x: Game.width -  400, y: Game.height - 300 });



        this.objects.push(new Sprite({
            type : "layer",
            texture : "bg2_"+Game.world.texture,
            x : (1024*4)/2,
            y : 96 + 512/2,
            w : 1024*4,
            h : 512,
            distance: 8,
            wrapX : 4
        }));
        
        this.objects.push(new Sprite({
            type : "layer",
            texture : "bg2_"+Game.world.texture,
            x : (1024*8)/2,
            y : 148 + 512/2,
            w : 1024*8,
            h : 512,
            distance: 4,
            wrapX : 8
        }));

        this.terrain = new Terrain({
            texture : "ground_"+Game.world.texture,
            offsetY : 256,
            texWidth : 192,
            texHeight : 384,
            noise : 64
        });

        this.objects.push(this.terrain);        
       */

    }

    update()
    {
        if (this.loaded)
        {
            this.time = Date.now();
            // Normalize game speed
            this.speed = 60/(1000/(this.time - this.lastTime));
            if (this.speed > 5) this.speed = 5;
            Input.update();

            this.ViewMatrix = twgl.m4.identity(this.ViewMatrix);

            twgl.m4.translate(this.ViewMatrix, twgl.v3.create(Input.viewPos,0,0), this.ViewMatrix);

            for (var i=0; i<this.objects.length; i++)
            {
                this.objects[i].update();
            }

            this.objects.sort(Utils.compare);
        }
    }

    draw()
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (var i=0; i<this.objects.length; i++)
        {
            this.objects[i].draw();
        }    
        
        this.lastTime = this.time;
    }

    touch(x, y)
    {
        for (var i=0; i<this.objects.length; i++)
        {
            this.objects[i].touch(x, y);
        }
    }
    
}