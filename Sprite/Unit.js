"use strict";

/**
 * @class Unit
 * @author Xavier de Boysson
 * @
 */
class Unit extends Sprite {
    /**
     * Creates a Unit object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param) {
        super(param);

        this.z = ++Game.world.zindex;
        this.fighting = false;
        this.dying = false;

        this.speed = 3 + (-1 + Math.random()*2);

        this.visible = false;

        // add a random heught pos offset for each unit so they're not all stacked up
        this.offset = -10 + Math.random()*20;

        this.x = (150 + (Math.random()*3000));

        // height relative to position in terrain
        var i = Math.floor((this.x + Game.world.terrain.texWidth/2)/(Game.width/Game.world.terrain.blockWidth));
        this.y = (Game.world.terrain.terrain[i] + Game.world.terrain.offsetY - 32 + this.offset);
    }

    update()
    {
        // Set player x: move unit through the Game.world if possible
        if (!(this.fighting || this.dying))
            this.x = (this.x + this.speed*Game.world.speed);

        // Set player y: height relative to position in terrain
        var i = Math.floor((this.x + Game.world.terrain.texWidth/2)/(Game.width/Game.world.terrain.blockWidth));
        var h = Game.world.terrain.terrain[i] + Game.world.terrain.offsetY - 32 + this.offset;
        this.y = (Utils.lerp(this.y, h, .08*Game.world.speed));

        
        // Place and rotate sprite to match terrain location
        var h2 = Game.world.terrain.terrain[i+1] + Game.world.terrain.offsetY - 32 + this.offset;
        var angle = Math.atan2(h2 - h, Game.world.terrain.blockWidth/2);
        this.r = Utils.lerp(this.r , angle , .1*Game.world.speed);


        super.update();            
    }


}