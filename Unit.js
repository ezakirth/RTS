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
        this.sprite = new Sprite({
            align : "center",
            type : "unit",
            texture : textures.unit,
            x : 0 + .1,
            y : 0 + .1,
            w : 100,
            h : 100
        });

        this.visible = false;

        this.offset = -10 + Math.random()*20;

        this.speed = 3 + (-1 + Math.random()*2);
        this.rotation = .4;

        this.pos = twgl.v3.create(
            150 + (Math.random()*3000),
            200,
            0
        );

        var i = Math.floor((this.pos[0] + world.ground.width/2)/(gl.canvas.clientWidth/world.ground.w));
        this.pos[1] = world.ground.terrain[i] + world.ground.offsetY - 32 + this.offset;
    

    }

    update()
    {
        this.visible = false;


        this.pos[0] += this.speed*world.speed;

        var min = -(twgl.m4.getTranslation(world.ViewMatrix)[0] + 256);
        var max = min + gl.canvas.clientWidth + 512;
        var x = this.pos[0];

        if (x > min && x < max)
            this.visible = true;

            var i = Math.floor((this.pos[0] + world.ground.width/2)/(gl.canvas.clientWidth/world.ground.w));
            var h = world.ground.terrain[i] + world.ground.offsetY - 32 + this.offset;

            this.pos[1] = Utils.lerp(this.pos[1], h, .08*world.speed);        

            
        if (this.visible)
        {
            var h2 = world.ground.terrain[i+1] + world.ground.offsetY - 32 + this.offset;
            var angle = Math.atan2(h2 - h, world.ground.w/2);
            this.rotation = Utils.lerp(this.rotation , angle , .1*world.speed);

            this.sprite.modelMatrix = twgl.m4.identity(this.sprite.modelMatrix);
            twgl.m4.translate(this.sprite.modelMatrix, this.pos, this.sprite.modelMatrix);
            Utils.rotate(this.sprite, this.rotation);
        }
    }

    draw()
    {
        if (this.visible)
            this.sprite.draw();
    }
}