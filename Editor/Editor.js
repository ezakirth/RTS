var Editor = {
    active : true,
    elem : null,
    selected : null,
    editMode : true,

    palette : {
        canvas : null,
        ctx : null,
    },
    init : function()
    {
        Editor.elem = document.getElementById("Editor");

        Editor.addItem({type : "file", label : "Load", id : "load" });
        Editor.addItem({lib : "General"});
        Editor.addItem({type : "select", label : "Texture set", id : "textures", list : ["grass", "asian", "desert", "jungle", "rock", "snow"] });
        

        Editor.addItem({lib : "Options"});
        Editor.addItem({type : "checkbox", label: "Edit mode", id : "editMode", onchange : "Editor.editMode = this.checked;", checked : true});
        Editor.addItem({type : "checkbox", label: "Show wireframe", id : "wireFrame", onchange : "Game.wireFrame = this.checked;", checked : false});
        
        Editor.update();
    },

    loadItem(item)
    {
        Editor.selected = item;

        if ($("#itemInfo").length == 0)
        {
            var div = document.createElement("div");
            div.id = "itemInfo";
            Editor.elem.appendChild(div);
        }

        $("#itemInfo").empty();
        Editor.addItem({itemInfo : true, lib : "Item information"});

        Editor.addItem({itemInfo : true, type : "checkbox", label : "locked", checked : item.locked });
        Editor.addItem({itemInfo : true, type : "select", label : "type", list : ["static", "prop", "layer"], readonly : item.locked});
        Editor.addItem({itemInfo : true, type : "text", label : "x", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "y", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "r", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "w", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "h", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "number", label : "zindex", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "wrapX", readonly : item.locked });
        Editor.addItem({itemInfo : true, type : "text", label : "wrapY", readonly : item.locked });

        Editor.addItem({itemInfo : true, type : "color", label : "color", readonly : item.locked });

    },

    addItem(item)
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
                if (item.label == "locked") item.onchange += "Editor.lockItem(this.checked);";
                if (item.label == "zindex") item.onchange += "Editor.selected.setBufferPosition();";
                if (item.label == "wrapX" || item.label == "wrapY") item.onchange += "Editor.selected.setBufferTexcoord();";
            }

            if (item.id == "textures") item.onchange = "Editor.setTexture(this.value);";
            
            var label = document.createElement("label");
            label.className = "itemLabel";
            if (item.label == "Load") label.className += " load";
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
            if (item.readonly)
            {
                if (item.type == "select") input.disabled = item.readonly;
                input.readOnly = item.readonly;
            }
            else
            {
                if (item.type != "select")
                    input.setAttribute("onclick", "this.select()");
            }

            div.appendChild(input);
        }

        if (item.type == "file")
        {
            input.setAttribute("accept", ".json");
            $(input).change(function(e) {
                if (e.target.files[0])
                {
                    var tmppath = URL.createObjectURL(e.target.files[0]);
                    $.getJSON( tmppath, function( data ) {
                        Game.world.load(data);
                    });
                }
            });
            var button = document.createElement("button");
            button.style.float = "right";
            var a = document.createElement("a");
            a.id = "saveButton";
            a.setAttribute("download", "map.json");
            a.innerText = "Save";
            a.setAttribute("href", "data:application/xml;charset=utf-8," + JSON.stringify(Game.world));
            button.appendChild(a);
            div.appendChild(button);    
        }


        if (item.itemInfo)
        {
            $("#itemInfo").append(div);
        }
        else
            Editor.elem.appendChild(div);
        
    },

    setTexture(tex)
    {
        for (var i=0; i<Game.world.objects.length; i++)
        {
            var texture = textures[Game.world.objects[i].texture.split("_")[0] + "_" + tex];
            if (texture === undefined) texture = textures[Game.world.objects[i].texture];
            Game.world.objects[i].uniforms.u_texture = texture;
        }
    },

    lockItem(lock)
    {
        $("div#itemInfo :input").attr("readonly", lock);
        $("div#itemInfo select").attr("disabled", lock);
    },

    update : function()
    {
        Editor.overlay.update();        
    },

    moveObject : function(x, y)
    {
        if (Editor.editMode && Editor.selected && !Editor.selected.locked)
        {
            Editor.selected.x -= x/Game.world.speed;
            Editor.selected.y += y/Game.world.speed;
        }
    }
    

};
