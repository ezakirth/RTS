Editor.addEditorItem = function(item)
{
    var div = document.createElement("div");
    div.className = "menuItem";

    if (item.lib)
    {
        var lib = document.createElement("label");
        lib.className = "menuItem";
        lib.innerText = item.lib || "Item";
        div.appendChild(lib);
    }
    else
    {
        
        if (item.itemInfo)
        {
            item.id = item.label + "_id";
            item.value = Editor.selected[item.label];
            item.onchange = "Editor.selected." + item.label + " = this.value;";

            if (item.type == "checkbox") item.onchange = "Editor.selected." + item.label + " = this.checked;";
            if (item.label == "locked") item.onchange += "Editor.foundLocked = null;if (this.checked){Editor.foundLocked = Editor.selected;} Editor.lockItem(this.checked);";
            if (item.label == "mirrorX" || item.label == "wrapX" || item.label == "wrapY") item.onchange += "Editor.selected.updateBufferTexcoord();";
            if (item.label == "r") item.onchange = "Editor.selected." + item.label + " = this.value*Math.PI/180;";
        }

        var label = document.createElement("label");
        label.className = "itemLabel";
        if (item.type == "file") label.className += " file";
        label.appendChild(document.createTextNode(item.label));
        label.setAttribute("for", item.id);
        div.appendChild(label);

        var input;

        if (item.type == "select")
        {
            input = document.createElement("select");

            for (var i = 0; i < item.list.length; i++) {
                var opt = document.createElement("option");
                var option = item.list[i];
                opt.value = option;
                opt.text = option;
                opt.selected = (opt.value == item.value);
                input.appendChild(opt);
                input.id = item.id;
            }                
        }
        else
        {
            input = document.createElement("input");

            input.id = item.id;
            input.setAttribute("type", item.type);

            input.setAttribute("value", item.value);
        }

        if (item.onchange)
        {
            input.setAttribute("onkeyup", item.onchange);
            input.setAttribute("onchange", item.onchange);
        }
        if (item.checked)
        {
            input.defaultChecked = item.checked;
        }            
        if (item.disabled)
        {
            input.disabled = item.disabled;
        }
        else
        {
            if (item.type != "select")
                input.setAttribute("onclick", "this.select()");
        }

        div.appendChild(input);
    }

    if (item.label == "Add Sprite")
    {
        input.setAttribute("accept", ".png");
        $(input).change(Editor.addSprite);
    }

    if (item.label == "Load")
    {
        input.setAttribute("accept", ".json");
        $(input).change(Editor.loadMap);
        var button = document.createElement("button");
        button.style.float = "right";
        $(button).click(Editor.saveMap);
        button.textContent = "Save";
        div.appendChild(button);    
    }


    if (item.itemInfo)
    {
        $("#itemInfo").append(div);
    }
    else
        Editor.elem.appendChild(div);
    
}

Editor.loadMap = function(e)
{
    if (e.target.files[0])
    {
        var tmppath = URL.createObjectURL(e.target.files[0]);
        $.getJSON( tmppath, function( data ) {
            Game.world.load(data);
        });
    }
}

Editor.saveMap = function(e)
{
    Editor.saveData(Game.world, 'map.json');
}

Editor.addSprite = function(e)
{
    if (e.target.files[0] && e.target.files[0].name != "")
    {
        var src = "./assets/textures/" + e.target.files[0].name;
        var textureName = e.target.files[0].name.slice(0, -4);

        var type = $("#spriteType").val();
        var x = Game.width/2;
        var y = Game.height/2;
        var z = $("#zIndex").val();;
        var distance = $("#Distance").val();;

        if (type == "prop")
            x = -Input.viewPos + Game.width/2

        if (type == "layer")
            x = -Input.viewPos/.5 + Game.width/2

        if (Game.world.textures[textureName])
        {
            var sprite = new Sprite({
                type : type,
                texture : textureName,
                x : x,
                y : y,
                z : z,
                distance : distance,
        });
            sprite.textureSettings = { min : min, max : max, wrapS : wrapS, wrapT : wrapT};
            
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
                [textureName] : {
                    min : min,
                    max : max,
                    wrapS : wrapS,
                    wrapT : wrapT,
                    src: src
                }
            }, function() {
                Game.world.textures[textureName] = Game.world.textures.loading[textureName];
                Game.world.textures.loading = null;

                var sprite = new Sprite({
                    type : type,
                    texture : textureName,
                    x : x,
                    y : y,
                    z : z,
                    distance : distance
                });
                sprite.textureSettings = { min : min, max : max, wrapS : wrapS, wrapT : wrapT};
                
                Editor.loadObjectInfo(sprite);
                Game.world.objects.push(sprite);
            });
        }
        $("#add").attr("type", "text");
        $("#add").attr("type", "file");

    }
}