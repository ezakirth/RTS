Editor.saveData = function(data, filename)
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

}

Editor.lockItem = function(lock)
{
    $("div#block_info :input").prop("disabled", lock);
    $("div#block_info select").prop("disabled", lock);
    $("#editor_locked_id").prop("disabled", false);
}

Editor.deleteItem = function()
{
    var confirmation = confirm("Are you sure ?");
    if (confirmation) {
        var index = Game.world.objects.indexOf(Editor.selected)
        if (index > -1) Game.world.objects.splice(index, 1);
        $("#block_info").empty();
        if (Editor.selected.type == "terrain")
            Game.world.terrain = null;

        Editor.selected = null;

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
}