"use strict";

var textures = null;
function loadTextures()
{
    var types = ["grass", "asian", "desert", "jungle", "rock", "snow"];
    var style = Math.floor(Math.random()*6);

    textures = twgl.createTextures(gl,
    {
        ground : {
            minMag: gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/ground_" + types[style] + ".png"
        },

        bg : {
            minMag : gl.NEAREST,
            src: "assets/textures/bg_" + types[style] + ".png"
        },

        bg2 : {
            minMag : gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/bg2_" + types[style] + ".png"
        },

        bg3 : {
            minMag : gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/bg_small2.png"
        },

        doodad_corner : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad_corner_" + types[style] + ".png"
        },

        doodad1 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad1_" + types[style] + ".png"
        },

        doodad2 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad2_" + types[style] + ".png"
        },

        doodad3 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad3_" + types[style] + ".png"
        },

        doodad4 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad4_" + types[style] + ".png"
        },
        
        sun : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/sun.png"
        },

        glow : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/glow.png"
        },

        halo : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/halo.png"
        },


        unit : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/unit.png"
        },

    }, function()
    {
        textures.types = types;
        textures.style = style;
        setup();
        render();
    });    
}