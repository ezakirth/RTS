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


        this.offset = -10 + Math.random()*20;

        this.speed = 3 + (-1 + Math.random()*2);
        this.rotation = .4;
        this.pos = {x:150 + (Math.random()*3000), y:200};
        var i = Math.floor((0 + this.pos.x + ground.width/2)/(gl.canvas.clientWidth/ground.w));
        this.pos.y = ground.terrain[i] + ground.offsetY - 32 + this.offset;
    

    }

    draw(timestamp)
    {
        this.sprite.modelMatrix = twgl.m4.identity();

        this.pos.x += this.speed*speed;
        var i = Math.floor((0 + this.pos.x + ground.width/2)/(gl.canvas.clientWidth/ground.w));
        var h = ground.terrain[i]+ground.offsetY - 32 + this.offset;
        var h2 = ground.terrain[i+1]+ground.offsetY - 32 + this.offset;

        this.pos.y = lerp(this.pos.y, h, .1*speed);        



        var angle = Math.atan2(h2 - h, ground.w/4)
    
        this.rotation = lerp(this.rotation , angle , .1*speed);


        twgl.m4.translate(this.sprite.modelMatrix, twgl.v3.create(this.pos.x, this.pos.y,0), this.sprite.modelMatrix);

        twgl.m4.axisRotate(this.sprite.modelMatrix, twgl.v3.create(0,0,1), this.rotation*speed, this.sprite.modelMatrix);
        this.sprite.draw();
    }
}