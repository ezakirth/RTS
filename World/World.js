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
        this.projectionMatrix = twgl.m4.ortho(0, Game.width, 0, Game.height, -100, 100);
        this.zindex = 0;
        this.time = 1;
        this.speed = 1;
        this.lastTime = 1;
        this.objects = [];

        this.tex = "2_WALK_00";
    }


    init()
    {
        $.getJSON( "./assets/map.json", function( data ) {
            Game.world.load(data);
        });
    }

    update()
    {
        if (this.loaded)
        {
            this.time = Date.now();
            this.delta = this.time - this.lastTime;
            // Normalize game speed
            this.speed = 60/(1000/(this.delta));
            if (this.speed > 5) this.speed = 5;
            Input.update();

            this.terrain.update();
            for (var i=0; i<this.objects.length; i++)
            {
                if (this.objects[i].type != "terrain")
                this.objects[i].update();
            }

            this.objects.sort(Utils.compare);
        }
    }

    draw()
    {
        Editor.onscreen = 0;
        for (var i=0; i<this.objects.length; i++)
        {
            var sprite = this.objects[i];
            if (Editor["show" + sprite.type])
                sprite.draw();
        }
        
        this.lastTime = this.time;
    }

    touch(x, y)
    {
        for (var i=0; i<this.objects.length; i++)
        {
            var sprite = this.objects[i];
            if (Editor["show" + sprite.type])
                sprite.touch(x, y);
        }
    }
    
}
