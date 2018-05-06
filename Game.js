"use strict";

var Game = {
    width : 1920,
    height : 1080,
    ratio : 16/9,
    selected : null,

    scaleTo : function(screenWidth, screenHeight)
    {
        // screen scaling
        Game.ratio = Game.width/Game.height;
        var css = {width : screenWidth, height: screenWidth/Game.ratio, left: 0, "margin-left" : 0, top: "50%", "margin-top" : -(screenWidth/Game.ratio)/2};
        if (screenWidth/Game.ratio > screenHeight)
            css = {width : screenHeight*Game.ratio, height: screenHeight, left: "50%", "margin-left" : -(screenHeight*Game.ratio)/2, top: 0, "margin-top" : 0};

        $("#canvas").css(css);
        $("#overlay").css(css);

        Editor.overlay.offsetX = $(Editor.overlay.ctx.canvas).offset().left;
        Editor.overlay.offsetY = $(Editor.overlay.ctx.canvas).offset().top;

        Game.scaledWidth = $("#canvas").width();
        Game.scaledHeight = $("#canvas").height();

        Game.ratioX = Game.width/Game.scaledWidth;
        Game.ratioY = Game.height/Game.scaledHeight;
    },

    world : null,

    update : function()
    {
        Game.world.update();
    },

    draw : function()
    {
        Game.world.draw();
    },

    touch : function(x, y)
    {
        Editor.overlay.touch(x, y);
        if (!Editor.resizing)
        {
            if (Editor.editMode)
            {
                Editor.selected = null;
                Editor.foundLocked = null;
                $("#block_info").empty();
            }

            Game.world.touch(x, y);

            if (Editor.editMode)
            {
                if (Game.selected) 
                {
                    Editor.loadObjectInfo(Game.selected);
                }
                else
                {
                    if (Editor.foundLocked)
                    {
                        Editor.loadObjectInfo(Editor.foundLocked);
                    }
                    else
                    {
                        Editor.selected = null;
                        $("#block_info").empty();
                    }
                }
            }
        }
    }

};