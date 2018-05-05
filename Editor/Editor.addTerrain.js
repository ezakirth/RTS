
Editor.addTerrain = function(e)
{
    if (e.target.files[0] && e.target.files[0].name != "")
    {
        var src = "./assets/textures/" + e.target.files[0].name;
        var texture = e.target.files[0].name.slice(0, -4) + "_REPEAT_CLAMP";

        if (Game.world.textures[texture])
        {
            var wrapS = gl.REPEAT;
            var wrapT = gl.CLAMP_TO_EDGE;
            var min = gl.LINEAR;
            var max = gl.LINEAR;

            var terrain = new Terrain({
                texture : texture,
                offsetY : parseFloat($("#editor_offsetY_id").val()),
                texWidth : parseFloat($("#editor_texWidth_id").val()),
                texHeight : parseFloat($("#editor_texHeight_id").val()),
                noise : parseFloat($("#editor_noise_id").val())
            });

            Game.world.texturesInfos[texture] = { src: src, min : min, max : max, wrapS : wrapS, wrapT : wrapT};
            Editor.loadObjectInfo(terrain);
            Game.world.terrain = terrain;
            Game.world.objects.push(terrain);

        }
        else
        {
            var wrapS = gl.REPEAT;
            var wrapT = gl.CLAMP_TO_EDGE;
            var min = gl.LINEAR;
            var max = gl.LINEAR;

            Game.world.textures.loading = twgl.createTextures(gl, {
                [texture] : {
                    wrapS : wrapS,
                    wrapT : wrapT,
                    src : src
                }
            }, function() {
                Game.world.textures[texture] = Game.world.textures.loading[texture];
                Game.world.textures.loading = null;

                var terrain = new Terrain({
                    texture : texture,
                    texWidth : parseFloat($("#editor_texWidth_id").val()),
                    texHeight : parseFloat($("#editor_texHeight_id").val()),
                    noise : parseFloat($("#editor_noise_id").val())
                });

                Game.world.texturesInfos[texture] = { src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT};
             //   Editor.loadObjectInfo(terrain);
                Game.world.terrain = terrain;
                Game.world.objects.push(terrain);
            });
        }
        $("#editor_Add_Terrain_id").attr("type", "text");
        $("#editor_Add_Terrain_id").attr("type", "file");
        $("#block_terrain").hide();
        $("#block_sprite").show();

    }
}