Sprite.prototype.touch = function(x, y)
{
    var layerPos = null;
    if (this.type == "prop")
        layerPos = twgl.m4.getTranslation(Game.world.ViewMatrix);
    else
        layerPos = twgl.m4.getTranslation(this.layerViewMatrix);

    var screenPos = twgl.m4.getTranslation(this.modelMatrix);
    var spriteX = screenPos[0] + layerPos[0];
    var spriteY = screenPos[1];
    if ( (x > spriteX - this.w/2 && x < spriteX + this.w/2) && (y > spriteY - this.h/2 && y < spriteY + this.h/2) )
    {
        if (!Game.selected || this.zindex > Game.selected.zindex)
        {
            this.screenX = spriteX - this.w/2;
            this.screenY = Game.height - (spriteY + this.h/2);
            
            if (this.locked)
            {
                Editor.foundLocked = this;
            }
            else
            {
                Game.selected = this;
            }
        }
        
        if (Editor.foundLocked && this.zindex < Editor.foundLocked.zindex)
        {
            if (this.locked)
            {
                Editor.foundLocked = this;
                Game.selected = this;
                this.screenX = spriteX - this.w/2;
                this.screenY = Game.height - (spriteY + this.h/2);
            }
        }


    }

}