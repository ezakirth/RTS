"use strict";

var Game = {
    width : 1920,
    height : 1080,
    ratio : 16/9,

    scaleTo : function(screenWidth, screenHeight)
    {
        // screen scaling
        Game.ratio = Game.width/Game.height;
        var css = {width : screenWidth, height: screenWidth/Game.ratio, top: "50%", "margin-top" : -(screenWidth/Game.ratio)/2};
        if (screenWidth/Game.ratio > screenHeight)
            css = {width : screenHeight*Game.ratio, height: screenHeight, left: "50%", "margin-left" : -(screenHeight*Game.ratio)/2};

        $("#canvas").css(css);


        Game.ratioX = Game.width/screenWidth;
        Game.ratioY = Game.height/screenHeight;
    },

    world : null

};