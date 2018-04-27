var Menu = {
    elem : null,
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
            if (item.checked)
            {
                input.defaultChecked = item.checked;
            }            
            input.readOnly = item.readonly;

            div.appendChild(input);



        }

        Menu.elem.appendChild(div);
        
    },

    update : function()
    {
        $("#textures").val(textures.types[textures.style]);
        Game.wireFrame = $("input[name='wireFrame']:checked").val();
        
        Menu.overlay.update();        
    }

};