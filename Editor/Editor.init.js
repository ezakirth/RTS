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
        Editor.addEditorItem({type : "select", label : "Texture wrapS", id : "textureWrapS", list : ["CLAMP_TO_EDGE", "REPEAT"] });
        Editor.addEditorItem({type : "select", label : "Texture wrapT", id : "textureWrapT", list : ["CLAMP_TO_EDGE", "REPEAT"] });
        Editor.addEditorItem({type : "number", label : "zIndex", id : "zIndex", value : 1 });
        Editor.addEditorItem({type : "number", label : "Distance", id : "Distance", value : 1 });

        Editor.addEditorItem({type : "file", label : "Add Sprite", id : "add" });


}
