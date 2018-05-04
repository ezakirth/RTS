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
    $("div#itemInfo :input").prop("disabled", lock);
    $("div#itemInfo select").prop("disabled", lock);
    $("#locked_id").prop("disabled", false);
}

Editor.deleteItem = function()
{
    for (var i=0; i<Game.world.objects.length; i++)
    {
        if (Editor.selected == Game.world.objects[i])
        {
            Game.world.objects[i] = null;
            break;
        }
    }
    $("#itemInfo").empty();
    Editor.selected = null;
    
}