Sprite.prototype.touch = function(x, y)
{
    var layerPos = twgl.m4.getTranslation(this.layerViewMatrix);

    var screenPos = twgl.m4.getTranslation(this.modelMatrix);
    var spriteX = screenPos[0] + layerPos[0];
    var spriteY = screenPos[1];
    var hit = false;

    if (this.type == "terrain")
    {
        var i = Math.floor((-spriteX+x + this.texWidth/2)/(Game.width/this.blockWidth));
        var h = this.terrain[i] + this.y;
        hit = (y < h && y +384 > h);
    }
    else
        hit = (x > spriteX - this.w/2 && x < spriteX + this.w/2) && (y > spriteY - this.h/2 && y < spriteY + this.h/2);

    if ( hit )
    {
        if (!Game.selected || this.z > Game.selected.z)
        {            
            if (this.locked)
            {
                Editor.foundLocked = this;
            }
            else
            {
                Game.selected = this;
            }
        }
        
        if (Editor.foundLocked && this.z < Editor.foundLocked.z)
        {
            if (this.locked)
            {
                Editor.foundLocked = this;
                Game.selected = this;
            }
        }
    }
};