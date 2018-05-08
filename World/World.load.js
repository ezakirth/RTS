
World.prototype.load = function(map)
{
    if (map)
    {
        Game.world.loaded = false;
        Game.world.texturesInfos = {};

        var textureList = [];
        for (var i=0; i<map.objects.length;i++)
        {
            var object = map.objects[i];
            textureList.push(object.texture);
            Game.world.texturesInfos[object.texture] = { src : map.texturesInfos[object.texture].src, min : map.texturesInfos[object.texture].min, max : map.texturesInfos[object.texture].max, wrapS : map.texturesInfos[object.texture].wrapS, wrapT : map.texturesInfos[object.texture].wrapT};
        }
        textureList = [...new Set(textureList)];
        textureList.push("2_WALK_000");
        Game.world.texturesInfos["2_WALK_000"] = {
            src : "./assets/textures/2_WALK_000.png",
            min : gl.LINEAR,
            max : gl.LINEAR,
            wrapS : gl.CLAMP_TO_EDGE,
            wrapT : gl.CLAMP_TO_EDGE
        };
        textureList.push("2_WALK_001");
        Game.world.texturesInfos["2_WALK_001"] = {
            src : "./assets/textures/2_WALK_001.png",
            min : gl.LINEAR,
            max : gl.LINEAR,
            wrapS : gl.CLAMP_TO_EDGE,
            wrapT : gl.CLAMP_TO_EDGE
        };
        textureList.push("2_WALK_002");
        Game.world.texturesInfos["2_WALK_002"] = {
            src : "./assets/textures/2_WALK_002.png",
            min : gl.LINEAR,
            max : gl.LINEAR,
            wrapS : gl.CLAMP_TO_EDGE,
            wrapT : gl.CLAMP_TO_EDGE
        };
        textureList.push("2_WALK_003");
        Game.world.texturesInfos["2_WALK_003"] = {
            src : "./assets/textures/2_WALK_003.png",
            min : gl.LINEAR,
            max : gl.LINEAR,
            wrapS : gl.CLAMP_TO_EDGE,
            wrapT : gl.CLAMP_TO_EDGE
        };

        textureList.push("2_WALK_004");
        Game.world.texturesInfos["2_WALK_004"] = {
            src : "./assets/textures/2_WALK_004.png",
            min : gl.LINEAR,
            max : gl.LINEAR,
            wrapS : gl.CLAMP_TO_EDGE,
            wrapT : gl.CLAMP_TO_EDGE
        };
        
        var tex = {};

        for (var i=0;i<textureList.length; i++)
        {
            var textureName = textureList[i];
            tex[textureName] = {
                min : Game.world.texturesInfos[textureName].min,
                max : Game.world.texturesInfos[textureName].max,
                wrapS: Game.world.texturesInfos[textureName].wrapS,
                wrapT: Game.world.texturesInfos[textureName].wrapT,
                src: Game.world.texturesInfos[textureName].src         
            }
        }

        Game.world.textures = null;
        Game.world.textures = twgl.createTextures(gl, tex, function()
        {
            Game.world.objects = [];
            Game.world.terrain = null;

            for (var i=0; i<map.objects.length;i++)
            {
                var object = map.objects[i];

                if (object.type == "terrain")
                {
                    Game.world.terrain = new Terrain({
                        texture : object.texture,
                        offsetY : object.offsetY,
                        terrain : object.terrain,
                        texWidth : object.texWidth,
                        texHeight : object.texHeight,
                        noise : object.noise
                    });
                    Game.world.objects.push(Game.world.terrain);
                }
            }

            for (var i=0; i<map.objects.length;i++)
            {
                var object = map.objects[i];

                if (object.type != "terrain")
                {
                  //  if (object.type != "prop")
                    {
                        var sprite = new Sprite({
                            type : object.type,
                            texture : object.texture,
                            x : object.pos[0],
                            y : object.pos[1],
                            z : object.pos[2],
                            w : object.size[0],
                            h : object.size[1],
                            color : object.color,
                            locked : object.locked,
                            distance : object.distance,
                            wrapX : object.wrapX,
                            wrapY : object.wrapY,
                            mirrorX : object.mirrorX
                        });
                        Game.world.objects.push(sprite);
                    }
                }
            }
            Game.world.loaded = true;
            for (var i=0;i<3;i++)
            {
                Game.world.objects.push(new Unit({
                    type : "prop",
                    texture : "2_WALK_000",
                    w : 164,
                    h : 164 
                }));
            }

            Editor.init();
        });                


    }
}