var Editor = {
    active : true,
    elem : null,
    selected : null,
    editMode : true,
    wireFrame : false,

    palette : {
        canvas : null,
        ctx : null,
    },


    update : function()
    {
        Editor.overlay.update();        
    },

    moveObject : function(x, y)
    {
        if (Editor.editMode && Editor.selected && !Editor.selected.locked)
        {
            Editor.selected.x -= x/Game.world.speed;
            Editor.selected.y += y/Game.world.speed;
        }
    }
    

};


