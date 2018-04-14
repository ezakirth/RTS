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
            src: "textures/ground_" + types[style] + ".png"
        },

        bg : {
            minMag : gl.NEAREST,
            src: "textures/bg_" + types[style] + ".png"
        },

        bg2 : {
            minMag : gl.NEAREST,
            src: "textures/bg2_" + types[style] + ".png"
        },

        doodad_corner : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/doodad_corner_" + types[style] + ".png"
        },

        doodad1 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/doodad1_" + types[style] + ".png"
        },

        doodad2 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/doodad2_" + types[style] + ".png"
        },

        doodad3 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/doodad3_" + types[style] + ".png"
        },

        doodad4 : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/doodad4_" + types[style] + ".png"
        },
        
        sun : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/sun.png"
        },

        glow : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/glow.png"
        },

        halo : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "textures/halo.png"
        },


        unit : {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "unit.png"
        },

    }, function() {setup(); render();});    
}