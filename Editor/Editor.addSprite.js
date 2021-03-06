
Editor.addSprite = function(e)
{
    if (e.target.files[0] && e.target.files[0].name !== "")
    {
        var src = "./assets/textures/" + e.target.files[0].name;
        var texture = e.target.files[0].name.slice(0, -4) + "_" + $("#editor_Texture_wrap_X_id").val() + "_" + $("#editor_Texture_wrap_Y_id").val();


        var wrapS, wrapT;
        if ($("#editor_Texture_wrap_X_id").val() == "REPEAT") wrapS = gl.REPEAT; else wrapS = gl.CLAMP_TO_EDGE;
        if ($("#editor_Texture_wrap_Y_id").val() == "REPEAT") wrapT = gl.REPEAT; else wrapT = gl.CLAMP_TO_EDGE;
        var min = gl.LINEAR;
        var max = gl.LINEAR;
            
        if (Game.world.textures[texture])
        {
            Editor.applySprite(texture, {src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT});
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
                Editor.applySprite(texture, {src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT});
            });
        }
        $("#editor_Add_Sprite_id").attr("type", "text");
        $("#editor_Add_Sprite_id").attr("type", "file");

    }
};

Editor.applySprite = function(texture, params)
{
    var type = $("#editor_Sprite_type_id").val();
    var x = Game.width/2;
    var y = Game.height/2;
    var z = $("#editor_zIndex_id").val();
    var distance = $("#editor_Distance_id").val();

    if (type == "prop")
        x = -Input.viewPos + Game.width/2;

    if (type == "layer")
        x = -Input.viewPos/distance + Game.width/2;

    var sprite = new Sprite({
        type : type,
        texture : texture,
        x : x,
        y : y,
        z : z,
        distance : distance
    });
    Game.world.texturesInfos[texture] = params;
    Editor.loadObjectInfo(sprite);
    Game.world.objects.push(sprite);
};