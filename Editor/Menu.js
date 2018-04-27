var Menu = {
    elem : null,
    palette : {
        canvas : null,
        ctx : null,
    },
    init : function()
    {
        Menu.elem = document.getElementById("Menu");

        Menu.addItem({lib : "Texture set", items : [{type : "text", id : "textures", readonly : true, value : ''}]});

        Menu.addItem({lib: "Wireframe", items : [
            {type : "radio", name : "wireFrame", id : "wireFrame1", label : "Yes", value : 1, checked : true},
            {type : "radio", name : "wireFrame", id : "wireFrame0", label : "No", value : 0},
        ]});
        
        
        Menu.update();
    },

    loadObj : function(obj)
    {
        Object.keys(obj).forEach(function(key)
        {
            Menu.addItem(key, obj[key]);
        });
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
    }

};