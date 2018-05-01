"use strict";

var textures = null;
function loadTextures()
{
    var types = ["grass", "asian", "desert", "jungle", "rock", "snow"];

    var tex = {};
    for (var i=0; i<types.length; i++)
    {
        var type = types[i];
        tex["ground_"+type] = {
            minMag: gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/ground_" + type + ".png"            
        }

        tex["bg_"+type] = {
            minMag : gl.NEAREST,
            src: "assets/textures/bg_" + type + ".png"
        }

        tex["bg2_"+type] = {
            minMag : gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/bg2_" + type + ".png"
        }

        tex["bg3_"+type] = {
            minMag : gl.LINEAR,
            wrapS: gl.REPEAT,
            wrapT: gl.CLAMP_TO_EDGE,
            src: "assets/textures/bg_small2.png"
        }

        tex["doodad_corner_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad_corner_" + type + ".png"
        }

        tex["doodad1_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad1_" + type + ".png"
        }

        tex["doodad2_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad2_" + type + ".png"
        }

        tex["doodad3_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad3_" + type + ".png"
        }

        tex["doodad4_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/doodad4_" + type + ".png"
        }

        tex["sun_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/sun.png"
        }

        tex["glow_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/glow.png"
        }

        tex["halo_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/halo.png"
        }


        tex["unit_"+type] = {
            minMag : gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
            src: "assets/textures/unit.png"
        }       
    }

    textures = twgl.createTextures(gl, tex, function()
    {
        setup();
        resizeCanvas();
        render();
    });    
}