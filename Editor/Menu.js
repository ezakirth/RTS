var Menu = {
    elem : null,
    palette : {
        canvas : null,
        ctx : null,
    },
    init : function()
    {
        Menu.elem = document.getElementById("Menu");

        Menu.addItem("textures", true, "Texture set", '');
        Menu.addItem("nbTiles", true, "Nb tiles", '');
        Menu.addItem("layer", false, "Layer", 0);

        Menu.update();
    },

    loadObj : function(obj)
    {
        Object.keys(obj).forEach(function(key)
        {
            Menu.addItem(key, obj[key]);
        });
    },

    addItem(id, readonly, name, content)
    {
        var div = document.createElement("div");
        div.className = "menuItem";
        var label = document.createElement("label");
        var input = document.createElement("input");
        input.id = id;
        label.innerText = name;
        input.setAttribute("type", "text");
        input.setAttribute("value", content);
        input.readOnly = readonly;
        div.appendChild(label);
        div.appendChild(input);
        
        Menu.elem.appendChild(div);
        this["item_" + id] = div;
    },

    update : function()
    {
        $("#textures").val(textures.types[textures.style]);
    }

};