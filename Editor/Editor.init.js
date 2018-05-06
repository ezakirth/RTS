Editor.init = function()
{
        Editor.elem = document.getElementById("Editor");

        Editor.addEditorItem([{block : "General", block_id : "block_general"}]);
        Editor.addEditorItem([{block_id : "block_general", type : "checkbox", label: "Edit mode", onchange : "Editor.editMode = this.checked;", checked : Editor.editMode}]);
        Editor.addEditorItem([{block_id : "block_general", type : "checkbox", label: "Show wireframe", onchange : "Editor.wireFrame = this.checked;", checked : Editor.wireFrame}]);

        Editor.addEditorItem([{block : "Map", block_id : "block_map"}]);
        Editor.addEditorItem([
            {block_id : "block_map", type : "file", label : "Load", accept : ".json", onchangeEvent : Editor.loadMap },
            {block_id : "block_map", type : "button", value : "Save", onclick : "Editor.saveMap()" }
        ]);

        Editor.addEditorItem([{block : "Terrain", block_id : "block_terrain"}]);
        Editor.addEditorItem([{block_id : "block_terrain", type : "number", label : "offsetY", value : 256 }]);
        Editor.addEditorItem([{block_id : "block_terrain", type : "number", label : "texWidth", value : 192 }]);
        Editor.addEditorItem([{block_id : "block_terrain", type : "number", label : "texHeight", value : 384 }]);
        Editor.addEditorItem([{block_id : "block_terrain", type : "number", label : "noise", value : 64 }]);
        Editor.addEditorItem([{block_id : "block_terrain", type : "file", label : "Add Terrain", accept : ".png", onchangeEvent : Editor.addTerrain }]);


        Editor.addEditorItem([{block : "Sprite", block_id : "block_sprite"}]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "select", label : "Sprite type", list : ["static", "prop", "layer"]}]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "select", label : "Texture wrap X", list : ["CLAMP", "REPEAT"] }]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "select", label : "Texture wrap Y", list : ["CLAMP", "REPEAT"] }]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "number", label : "zIndex", value : 1 }]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "number", label : "Distance", value : 1 }]);
        Editor.addEditorItem([{block_id : "block_sprite", type : "file", label : "Add Sprite", accept : ".png", onchangeEvent : Editor.addSprite }]);

        $("label.menuItem").click(function(){
            if ($(this).hasClass("hiding"))
            {
                $(this).removeClass("hiding");
                $(this).parent().find("div").show();
            }
            else
            {
                $(this).addClass("hiding");
                $(this).parent().find("div").hide();
            }
        });

        if (Game.world.terrain)
        {
            $("#block_terrain").hide();
            $("#block_sprite").show();
        }
        else
        {
            $("#block_sprite").hide();
            $("#block_terrain").show();
        }
}

Editor.loadObjectInfo = function(sprite)
{
    Editor.selected = sprite;

    $("#block_info").empty();
    
    Editor.addEditorItem([{block : "Object Information", block_id : "block_info"}]);

    Editor.addEditorItem([{block_id : "block_info", type : "button", value : "Delete sprite", onclick : "Editor.deleteItem()", disabled : sprite.locked }]);
    Editor.addEditorItem([{block_id : "block_info", type : "checkbox", label : "locked", checked : sprite.locked }]);
    if (sprite.type != "terrain")
        Editor.addEditorItem([{block_id : "block_info", type : "checkbox", label : "mirrorX", disabled : sprite.locked }]);
    Editor.addEditorItem([{block_id : "block_info", type : "text", label : "x", disabled : sprite.locked }]);
    Editor.addEditorItem([{block_id : "block_info", type : "text", label : "y", disabled : sprite.locked }]);
    Editor.addEditorItem([{block_id : "block_info", type : "number", label : "z", disabled : sprite.locked }]);
    if (sprite.type == "static")
        Editor.addEditorItem([{block_id : "block_info", type : "number", label : "r", disabled : sprite.locked }]);

    if (sprite.type != "terrain")
    {
        Editor.addEditorItem([{block_id : "block_info", type : "text", label : "w", disabled : sprite.locked }]);
        Editor.addEditorItem([{block_id : "block_info", type : "text", label : "h", disabled : sprite.locked }]);
        if (sprite.type == "layer")
            Editor.addEditorItem([{block_id : "block_info", type : "number", label : "distance", disabled : sprite.locked }]);
        if (Game.world.texturesInfos[sprite.texture].wrapS == gl.REPEAT)
            Editor.addEditorItem([{block_id : "block_info", type : "text", label : "wrapX", disabled : sprite.locked }]);
        if (Game.world.texturesInfos[sprite.texture].wrapT == gl.REPEAT)
            Editor.addEditorItem([{block_id : "block_info", type : "text", label : "wrapY", disabled : sprite.locked }]);
    }
    Editor.addEditorItem([{block_id : "block_info", type : "color", label : "tint", disabled : sprite.locked }]);
}
