
Editor.addSprite = function(e)
{
    if (e.target.files[0] && e.target.files[0].name != "")
    {
        var src = "./assets/textures/" + e.target.files[0].name;
        var texture = e.target.files[0].name.slice(0, -4) + "_" + $("#textureWrapS").val() + "_" + $("#textureWrapT").val();

        var type = $("#spriteType").val();
        var x = Game.width/2;
        var y = Game.height/2;
        var z = $("#zIndex").val();
        var distance = $("#Distance").val();;

        if (type == "prop")
            x = -Input.viewPos + Game.width/2

        if (type == "layer")
            x = -Input.viewPos/.5 + Game.width/2

        if (Game.world.textures[texture])
        {
            var wrapS, wrapT;
            if ($("#textureWrapS").val() == "REPEAT") wrapS = gl.REPEAT; else wrapS = gl.CLAMP_TO_EDGE;
            if ($("#textureWrapT").val() == "REPEAT") wrapT = gl.REPEAT; else wrapT = gl.CLAMP_TO_EDGE;
            var min = gl.LINEAR;
            var max = gl.LINEAR;

            var sprite = new Sprite({
                type : type,
                texture : texture,
                x : x,
                y : y,
                z : z,
                distance : distance,
            });
            Game.world.texturesInfos[texture] = { src: src, min : min, max : max, wrapS : wrapS, wrapT : wrapT};
            
            Editor.loadObjectInfo(sprite);
            Game.world.objects.push(sprite);
        }
        else
        {
            var wrapS, wrapT;
            if ($("#textureWrapS").val() == "REPEAT") wrapS = gl.REPEAT; else wrapS = gl.CLAMP_TO_EDGE;
            if ($("#textureWrapT").val() == "REPEAT") wrapT = gl.REPEAT; else wrapT = gl.CLAMP_TO_EDGE;
            var min = gl.LINEAR;
            var max = gl.LINEAR;
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

                var sprite = new Sprite({
                    type : type,
                    texture : texture,
                    x : x,
                    y : y,
                    z : z,
                    distance : distance
                });
                Game.world.texturesInfos[texture] = { src : src, min : min, max : max, wrapS : wrapS, wrapT : wrapT};
                console.log(Game.world.texturesInfos[texture]);
                Editor.loadObjectInfo(sprite);
                Game.world.objects.push(sprite);
            });
        }
        $("#add").attr("type", "text");
        $("#add").attr("type", "file");

    }
}