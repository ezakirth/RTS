var Editor = {
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

//        $("#saveButton").attr("href", "data:application/xml;charset=utf-8," + JSON.stringify(Game.world.map));
        $("#saveButton").click(function(e){e.preventDefault();console.log(JSON.stringify(Game.world.map))});
        
        Editor.addItem({lib : "General"});
        Editor.addItem({items : [{type : "text", label: "Texture set", id : "textures", readonly : true, value : ""}]});

        Editor.addItem({lib : "Options"});
        Editor.addItem({items : [{type : "checkbox", label: "Edit mode", id : "editMode", value : 1, checked : true}]});
        Editor.addItem({items : [{type : "checkbox", label: "Show wireframe", name: "wireFrame", id : "wireFrame", value : 1, checked : false}]});

/*
        Editor.addItem({lib: "Wireframe", items : [
            {type : "radio", name : "wireFrame", id : "wireFrame1", label : "On", value : 1},
            {type : "radio", name : "wireFrame", id : "wireFrame0", label : "Off", value : 0, checked : true},
        ]});
*/        
        
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

        Editor.addItem({itemInfo : true, items : [{type : "text", label : "x", id : "item_x", readonly : true, value : item.x}]});
        Editor.addItem({itemInfo : true, items : [{type : "text", label : "y", id : "item_y", readonly : true, value : item.y}]});
        Editor.addItem({itemInfo : true, items : [{type : "text", label : "r", id : "item_r", readonly : true, value : item.r}]});
        Editor.addItem({itemInfo : true, items : [{type : "text", label : "width", id : "item_w", readonly : true, value : item.w}]});
        Editor.addItem({itemInfo : true, items : [{type : "text", label : "height", id : "item_h", readonly : true, value : item.h}]});
        Editor.addItem({itemInfo : true, items : [{type : "text", label : "zindex", id : "item_zindex", readonly : false, value : item.zindex}]});
        Editor.addItem({itemInfo : true, items : [{type : "color", label : "color", id : "item_color", value : item.color, onchange: "Editor.selected.color = this.value;" }]});


        //return "rgb(" + "#FF0000".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",") + ")";
/*        for(var key in item) {
            var value = item[key];
            if ($.inArray( typeof value, ["string", "boolean", "number"]) !== -1)
            {
                Editor.addItem({itemInfo : true, lib : key, items : [{type : "text", id : "item_" + key, readonly : true, value : value}]});
            }
        }*/
    },

    addItem(params)
    {
        var div = document.createElement("div");
        div.className = "menuItem";

        if (params.lib)
        {
            var lib = document.createElement("label");
            lib.className = "menuItem";
            lib.innerText = params.lib || "Item";
            div.appendChild(lib);
        }

        if (params.items)
        {
            for (var i=0; i<params.items.length; i++)
            {
                var item = params.items[i];
                
                if (item.label)
                {
                    var label = document.createElement("label");
                    label.className = "itemLabel";
                    label.appendChild(document.createTextNode(item.label));
                    label.setAttribute("for", item.id);
                    div.appendChild(label);
                }

                var input = document.createElement("input");

                input.id = item.id;
                input.setAttribute("type", item.type);
                input.setAttribute("value", item.value);
                input.setAttribute("name", item.name);
                if (item.onchange)
                {
                    input.setAttribute("onchange", item.onchange);
                }
                if (item.checked)
                {
                    input.defaultChecked = item.checked;
                }            
                input.readOnly = item.readonly;

                div.appendChild(input);
            }
        }

        if (params.itemInfo)
        {
            $("#itemInfo").append(div);
        }
        else
            Editor.elem.appendChild(div);
        
    },

    update : function()
    {
        $("#textures").val(textures.types[textures.style]);
        Game.wireFrame = $("#wireFrame:checked").val();
        Editor.editMode = $("#editMode:checked").val();
        
        Editor.overlay.update();        
    }

};