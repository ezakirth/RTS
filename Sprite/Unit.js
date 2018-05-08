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
        this.z = Game.world.terrain.z + 5 + Game.world.zindex;
        this.fighting = false;
        this.dying = false;

        this.speed = 2;//    + (Math.random());

        // add a random heught pos offset for each unit so they're not all stacked up
        this.offset = -25;// -10 + Math.random()*20;

        this.x = (300 + (Math.random()*(Game.width - 300)));

        // height relative to position in terrain
        var i = Math.floor((this.x - Game.world.terrain.x + Game.world.terrain.texWidth/2)/(Game.width/Game.world.terrain.blockWidth));
        this.y = (Game.world.terrain.terrain[i] + Game.world.terrain.y + this.offset);

      //  this.wrapX = 1/13;
       // this.fighting = true;
      //  this.updateBufferTexcoord();

      this.texid = Math.floor(Math.random()*5);
      this.t = 0;
    }

    update()
    {
        // Set player x: move unit through the Game.world if possible
        if (!(this.fighting || this.dying))
            this.x = (this.x + this.speed*Game.world.speed);

        this.uniforms.u_texture = Game.world.textures[Game.world.tex + this.texid];

        this.t += Game.world.delta;
        if (this.t > 100)
        {
            this.t = 0;
            this.texid ++
            if (this.texid > 4) this.texid = 0;
        }

        if (Game.world.terrain)
        {
            // Set player y: height relative to position in terrain
            var i = Math.floor((this.x - Game.world.terrain.x)/(Game.width/Game.world.terrain.blockWidth));
//            var i = Math.floor((this.x - Game.world.terrain.x + Game.world.terrain.texWidth/4)/(Game.width/Game.world.terrain.blockWidth));
            var h = Game.world.terrain.terrain[i] + Game.world.terrain.y + this.offset;
            this.y = (Utils.lerp(this.y, h, .08*Game.world.speed));

            super.update();            
            
            if (this.visible)
            {
                // Place and rotate sprite to match terrain location
                var h2 = Game.world.terrain.terrain[i+1] + Game.world.terrain.y + this.offset;
                var angle = Math.atan2(h2 - h, Game.world.terrain.blockWidth/2);
                this.r = Utils.lerp(this.r , angle , .1*Game.world.speed);
            }
        }
    }


}