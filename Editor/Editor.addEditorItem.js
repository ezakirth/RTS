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

        if (item.type == "button")
        {
            var button = document.createElement("button");
            $(button).click(Editor.deleteItem);
            button.textContent = item.label;
            div.appendChild(button);
        }
        else
        {
            var label = document.createElement("label");
            label.className = "itemLabel";
            if (item.type == "file") label.className += " file";
            label.appendChild(document.createTextNode(item.label));
            label.setAttribute("for", item.id);
            div.appendChild(label);
        }

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

        if (item.type != "button")
        {
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

            div.appendChild(input);
        }
    }

    if (item.itemInfo)
        $("#itemInfo").append(div);
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
