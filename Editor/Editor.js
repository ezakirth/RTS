var Editor = {
    active : true,
    elem : null,
    selected : null,
    resizing : false,
    editMode : true,

    showterrain : true,
    showprop : true,
    showlayer : true,
    showstatic : true,
    onscreen : 0,

    palette : {
        canvas : null,
        ctx : null,
    },


    update : function()
    {
        $("#block_sprite label:first").html("Sprites ("+Editor.onscreen+ " out of " + Game.world.objects.length + " visible)");
        Editor.overlay.update();        
    },

    moveObject : function(x, y)
    {
        var sprite = Editor.selected;

        if (Editor.editMode && sprite && !sprite.locked)
        {
            if (Editor.resizing)
            {
                var spriteCenterX = sprite.screenX + sprite.w/2;
                var spriteCenterY = sprite.screenY + sprite.h/2;

                if (Input.pos.x > spriteCenterX )
                    sprite.w -= (x/Game.world.speed)*2;
                else
                    sprite.w += (x/Game.world.speed)*2;
                
                if (Input.pos.y > spriteCenterY )
                    sprite.h -= (y/Game.world.speed)*2;
                else
                    sprite.h += (y/Game.world.speed)*2;

                if (sprite.w < 1) sprite.w = 1;
                if (sprite.h < 1) sprite.h = 1;
            }
            else
            {
                sprite.x -= x/Game.world.speed;
                sprite.y += y/Game.world.speed;
            }
        }
    }
};


