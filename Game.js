"use strict";

var Game = {
    width : 1920,
    height : 1080,
    ratio : 16/9,
    target : null,

    scaleTo : function(screenWidth, screenHeight)
    {
        // screen scaling
        Game.ratio = Game.width/Game.height;
        var css = {width : screenWidth, height: screenWidth/Game.ratio, left: 0, "margin-left" : 0, top: "50%", "margin-top" : -(screenWidth/Game.ratio)/2};
        if (screenWidth/Game.ratio > screenHeight)
            css = {width : screenHeight*Game.ratio, height: screenHeight, left: "50%", "margin-left" : -(screenHeight*Game.ratio)/2, top: 0, "margin-top" : 0};

        $("#canvas").css(css);
        $("#overlay").css(css);

        Overlay.offsetX = $(Overlay.ctx.canvas).offset().left;
        Overlay.offsetY = $(Overlay.ctx.canvas).offset().top;

        Game.scaledWidth = $("#canvas").width();
        Game.scaledHeight = $("#canvas").height();

        Game.ratioX = Game.width/Game.scaledWidth;
        Game.ratioY = Game.height/Game.scaledHeight;
    },

    world : null,

    update : function()
    {
        Game.wireFrame = $("input[name='wireFrame']:checked").val();
    },

    touch : function(x, y)
    {
        Game.world.touch(x, y);
    }
};