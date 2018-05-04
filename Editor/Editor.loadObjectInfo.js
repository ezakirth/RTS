Editor.loadObjectInfo = function(item)
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

    Editor.addEditorItem({itemInfo : true, type : "button", label : "Delete sprite", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "checkbox", label : "locked", checked : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "checkbox", label : "mirrorX", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "x", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "y", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "number", label : "z", disabled : item.locked });
    if (item.type == "static")
        Editor.addEditorItem({itemInfo : true, type : "number", label : "r", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "w", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "h", disabled : item.locked });
    if (item.type == "layer")
        Editor.addEditorItem({itemInfo : true, type : "number", label : "distance", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapX", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapY", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "color", label : "color", disabled : item.locked });

}
