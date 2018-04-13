var gl = null;
loadShaders("shader.frag", "shader.vert", GLsetup);

function GLsetup()
{
    gl = document.getElementById("canvas").getContext("webgl");
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    
    gl.programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    gl.useProgram(gl.programInfo.program);

    twgl.setDefaults({attribPrefix: "a_"});
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.180, 0.105, 0.086, 1);


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


    }, function() {setup(); render();});
}