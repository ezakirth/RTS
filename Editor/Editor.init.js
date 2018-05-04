Editor.init = function()
{
        Editor.elem = document.getElementById("Editor");

        Editor.addEditorItem({lib : "General"});
        Editor.addEditorItem({type : "checkbox", label: "Edit mode", id : "editMode", onchange : "Editor.editMode = this.checked;", checked : Editor.editMode});
        Editor.addEditorItem({type : "checkbox", label: "Show wireframe", id : "wireFrame", onchange : "Editor.wireFrame = this.checked;", checked : Editor.wireFrame});
        Editor.addEditorItem({lib : "Map"});
        Editor.addEditorItem({type : "file", label : "Load", id : "load" });

        Editor.addEditorItem({lib : "Environment"});
        Editor.addEditorItem({type : "select", label : "Sprite type", id : "spriteType", list : ["static", "prop", "layer"]});
        Editor.addEditorItem({type : "select", label : "Texture wrap X", id : "textureWrapS", list : ["CLAMP", "REPEAT"] });
        Editor.addEditorItem({type : "select", label : "Texture wrap Y", id : "textureWrapT", list : ["CLAMP", "REPEAT"] });
        Editor.addEditorItem({type : "number", label : "zIndex", id : "zIndex", value : 1 });
        Editor.addEditorItem({type : "number", label : "Distance", id : "Distance", value : 1 });

        Editor.addEditorItem({type : "file", label : "Add Sprite", id : "add" });

        // Object information
        var div = document.createElement("div");
        div.id = "itemInfo";
        Editor.elem.appendChild(div);
}

Editor.loadObjectInfo = function(item)
{
    Editor.selected = item;

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
    if (Game.world.texturesInfos[item.texture].wrapS == gl.REPEAT)
        Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapX", disabled : item.locked });
    if (Game.world.texturesInfos[item.texture].wrapT == gl.REPEAT)
        Editor.addEditorItem({itemInfo : true, type : "text", label : "wrapY", disabled : item.locked });
    Editor.addEditorItem({itemInfo : true, type : "color", label : "tint", disabled : item.locked });

}
