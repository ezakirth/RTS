
Editor.addTerrain = function(e)
{
    if (e.target.files[0] && e.target.files[0].name !== "")
    {
        var src = "./assets/textures/" + e.target.files[0].name;
        var texture = e.target.files[0].name.slice(0, -4) + "_REPEAT_CLAMP";

        var wrapS = gl.REPEAT;
        var wrapT = gl.CLAMP_TO_EDGE;
        var min = gl.LINEAR;
        var max = gl.LINEAR;

        if (Game.world.textures[texture])
        {
            Editor.applyTerrain(texture, {src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT});
        }
        else
        {
            Game.world.textures.loading = twgl.createTextures(gl, {
                [texture] : {
                    min : min,
                    max : max,
                    wrapS : wrapS,
                    wrapT : wrapT,
                    src : src
                }
            }, function() {
                Game.world.textures[texture] = Game.world.textures.loading[texture];
                Game.world.textures.loading = null;
                Editor.applyTerrain(texture, {src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT});
            });
        }
        $("#editor_Add_Terrain_id").attr("type", "text");
        $("#editor_Add_Terrain_id").attr("type", "file");
        $("#block_terrain").hide();
        $("#block_sprite").show();

    }
};

Editor.applyTerrain = function(texture, params)
{
    var terrain = new Terrain({
        texture : texture,
        texWidth : parseFloat($("#editor_texWidth_id").val()),
        texHeight : parseFloat($("#editor_texHeight_id").val()),
        noise : parseFloat($("#editor_noise_id").val())
    });

    Game.world.texturesInfos[texture] = params;
    Editor.loadObjectInfo(terrain);
    Game.world.terrain = terrain;
    Game.world.objects.push(terrain);

    for (var i=0; i<Game.world.objects.length; i++)
    {
        var sprite = Game.world.objects[i];
        if (sprite.speed)
        {
            sprite.layerViewMatrix = Game.world.terrain.layerViewMatrix;
        }
    }
};