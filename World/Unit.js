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
            x : 0 + .1,
            y : 0 + .1,
            w : 100,
            h : 100
        });

        this.rotation = 0;
        this.visible = false;

        this.pos = twgl.v3.create(
            150 + (Math.random()*3000),
            200,
            0
        );

        // add a random heught pos offset for each unit so they're not all stacked up
        this.offset = -10 + Math.random()*20;

        // height relative to position in map
        var i = Math.floor((this.pos[0] + Game.world.map.texWidth/2)/(Game.width/Game.world.map.blockWidth));
        this.pos[1] = Game.world.map.terrain[i] + Game.world.map.offsetY - 32 + this.offset;
    

    }

    update()
    {
        this.visible = false;

        // Set player x: move unit through the Game.world if possible
        if (!(this.fighting || this.dying))
            this.pos[0] += this.speed*Game.world.speed;

        // Set player y: height relative to position in map
        var i = Math.floor((this.pos[0] + Game.world.map.texWidth/2)/(Game.width/Game.world.map.blockWidth));
        var h = Game.world.map.terrain[i] + Game.world.map.offsetY - 32 + this.offset;
        this.pos[1] = Utils.lerp(this.pos[1], h, .08*Game.world.speed);        

        // Visibility test
        var min = -(twgl.m4.getTranslation(Game.world.ViewMatrix)[0] + 256);
        var max = min + Game.width + 512;
        var x = this.pos[0];
        if (x > min && x < max)
            this.visible = true;
        
        if (this.visible)
        {
            // Place and rotate sprite to match map location
            var h2 = Game.world.map.terrain[i+1] + Game.world.map.offsetY - 32 + this.offset;
            var angle = Math.atan2(h2 - h, Game.world.map.blockWidth/2);
            this.rotation = Utils.lerp(this.rotation , angle , .1*Game.world.speed);

            this.sprite.modelMatrix = twgl.m4.identity(this.sprite.modelMatrix);
            twgl.m4.translate(this.sprite.modelMatrix, this.pos, this.sprite.modelMatrix);
            Utils.rotate(this.sprite, this.rotation);

            this.sprite.update();            
        }
    }

    draw()
    {
        if (this.visible)
            this.sprite.draw();
    }
}