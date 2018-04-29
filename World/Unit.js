"use strict";

/**
 * @class Unit
 * @author Xavier de Boysson
 * @
 */
class Unit {
    /**
     * Creates a Unit object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        this.fighting = false;
        this.dying = false;

        this.speed = 3 + (-1 + Math.random()*2);


        this.sprite = new Sprite({
            align : "center",
            type : "unit",
            texture : textures.unit,
            w : 100,
            h : 100
        });

        this.visible = false;

        // add a random heught pos offset for each unit so they're not all stacked up
        this.offset = -10 + Math.random()*20;

        this.sprite.x = (150 + (Math.random()*3000));

        // height relative to position in terrain
        var i = Math.floor((this.sprite.x + Game.world.terrain.texWidth/2)/(Game.width/Game.world.terrain.blockWidth));
        this.sprite.y = (Game.world.terrain.terrain[i] + Game.world.terrain.offsetY - 32 + this.offset);
    

    }

    update()
    {
        this.visible = false;

        // Set player x: move unit through the Game.world if possible
        if (!(this.fighting || this.dying))
            this.sprite.x = (this.sprite.x + this.speed*Game.world.speed);

        // Set player y: height relative to position in terrain
        var i = Math.floor((this.sprite.x + Game.world.terrain.texWidth/2)/(Game.width/Game.world.terrain.blockWidth));
        var h = Game.world.terrain.terrain[i] + Game.world.terrain.offsetY - 32 + this.offset;
        this.sprite.y = (Utils.lerp(this.sprite.y, h, .08*Game.world.speed));

        // Visibility test
        var min = -(twgl.m4.getTranslation(Game.world.ViewMatrix)[0] + 256);
        var max = min + Game.width + 512;
        if (this.sprite.x > min && this.sprite.x < max)
            this.visible = true;
        
        if (this.visible)
        {
            // Place and rotate sprite to match terrain location
            var h2 = Game.world.terrain.terrain[i+1] + Game.world.terrain.offsetY - 32 + this.offset;
            var angle = Math.atan2(h2 - h, Game.world.terrain.blockWidth/2);
            this.sprite.r = Utils.lerp(this.sprite.r , angle , .1*Game.world.speed);


            this.sprite.update();            
        }
    }

    draw()
    {
        if (this.visible)
            this.sprite.draw();
    }

    touch(x, y)
    {
        this.sprite.touch(x, y);
    }
}