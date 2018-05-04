var Editor = {
    active : true,
    elem : null,
    selected : null,
    editMode : true,
    wireFrame : false,

    palette : {
        canvas : null,
        ctx : null,
    },

    loadObjectInfo : function(item)
    {
        Editor.selected = item;

        if ($("#itemInfo").length == 0)
        {
            var div = document.createElement("div");
            div.id = "itemInfo";
            Editor.elem.appendChild(div);
        }

        $("#itemInfo").empty();
        Editor.addEditorItem({itemInfo : true, lib : "Object information (" + item.type + ")"});
        Editor.addEditorItem({itemInfo : true, type : "checkbox", label : "locked", checked : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "checkbox", label : "mirrorX", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "x", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "y", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "number", label : "z", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "number", label : "r", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "w", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "h", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "number", label : "distance", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapX", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapY", disabled : item.locked });
        Editor.addEditorItem({itemInfo : true, type : "color", label : "color", disabled : item.locked });

    },



    saveData : function(data, filename)
    {
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "octet/stream"});
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement('a');
        document.body.append(a);
        a.href = url;
        a.download = filename;
        a.click();
        $(a).remove();
        window.URL.revokeObjectURL(url);
    
    },

    lockItem : function(lock)
    {
        $("div#itemInfo :input").prop("disabled", lock);
        $("div#itemInfo select").prop("disabled", lock);
        $("#locked_id").prop("disabled", false);
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


