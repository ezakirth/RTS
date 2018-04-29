var Menu = {
    elem : null,
    selected : null,

    palette : {
        canvas : null,
        ctx : null,
    },
    init : function()
    {
        Menu.elem = document.getElementById("Menu");


//        $("#saveButton").attr("href", "data:application/xml;charset=utf-8," + JSON.stringify(Game.world.map));
        $("#saveButton").click(function(e){e.preventDefault();console.log(JSON.stringify(Game.world.map))});
        
        Menu.addItem({lib : "Texture set", items : [{type : "text", id : "textures", readonly : true, value : ''}]});

        Menu.addItem({lib: "Wireframe", items : [
            {type : "radio", name : "wireFrame", id : "wireFrame1", label : "On", value : 1},
            {type : "radio", name : "wireFrame", id : "wireFrame0", label : "Off", value : 0, checked : true},
        ]});
        
        
        Menu.update();
    },

    loadItem(item)
    {
        Menu.selected = item;
        $("#itemInfo").empty();

        Menu.addItem({itemInfo : true, lib : "x", items : [{type : "text", id : "item_x", readonly : true, value : item.x}]});
        Menu.addItem({itemInfo : true, lib : "y", items : [{type : "text", id : "item_y", readonly : true, value : item.y}]});
        Menu.addItem({itemInfo : true, lib : "w", items : [{type : "text", id : "item_w", readonly : true, value : item.w}]});
        Menu.addItem({itemInfo : true, lib : "h", items : [{type : "text", id : "item_h", readonly : true, value : item.h}]});
        Menu.addItem({itemInfo : true, lib : "zindex", items : [{type : "text", id : "item_zindex", readonly : true, value : item.zindex}]});
        Menu.addItem({itemInfo : true, lib : "color", items : [{type : "color", id : "item_color", readonly : true, value : item.color, onchange: "Menu.selected.color = this.value;" }]});


        //return "rgb(" + "#FF0000".match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",") + ")";
/*        for(var key in item) {
            var value = item[key];
            if ($.inArray( typeof value, ["string", "boolean", "number"]) !== -1)
            {
                Menu.addItem({itemInfo : true, lib : key, items : [{type : "text", id : "item_" + key, readonly : true, value : value}]});
            }
        }*/
    },

    addItem(params)
    {
        var div = document.createElement("div");
        div.className = "menuItem";

        var lib = document.createElement("label");
        lib.className = "menuItem";
        lib.innerText = params.lib || "Item";
        div.appendChild(lib);

        for (var i=0; i<params.items.length; i++)
        {
            var item = params.items[i];
            
            if (item.label)
            {
                var label = document.createElement("label");
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

        if (params.itemInfo)
        {
            $("#itemInfo").append(div);
        }
        else
            Menu.elem.appendChild(div);
        
    },

    update : function()
    {
        $("#textures").val(textures.types[textures.style]);
        Game.wireFrame = $("input[name='wireFrame']:checked").val();
        
        Menu.overlay.update();        
    }

};