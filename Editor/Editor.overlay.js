Editor.overlay = {
    ctx : null,
    init : function()
    {
        Editor.overlay.ctx = document.getElementById("overlay").getContext("2d");
        var ctx = Editor.overlay.ctx;
        ctx.canvas.width = Game.width;
        ctx.canvas.height = Game.height;
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
    
        ctx.font = "120px Arial";
        ctx.lineCap="round";
    },

    update : function()
    {
        var ctx = Editor.overlay.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (Editor.editMode && Editor.selected)
        {

            var sprite = Editor.selected;
            sprite.updateOverlayPos();            

            ctx.beginPath();
            ctx.setLineDash([30, 30]);
            ctx.strokeStyle = "#FFFFFF";
            ctx.moveTo(sprite.screenX, sprite.screenY);
            ctx.lineTo(sprite.screenX + sprite.w, sprite.screenY);
            ctx.lineTo(sprite.screenX + sprite.w, sprite.screenY + sprite.h);
            ctx.lineTo(sprite.screenX, sprite.screenY + sprite.h);
            ctx.lineTo(sprite.screenX, sprite.screenY);
          //  ctx.rect(sprite.screenX, sprite.screenY, sprite.w, sprite.h);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;

            ctx.fillText("╔", sprite.screenX - 75, sprite.screenY);
            ctx.fillText("╗", sprite.screenX - 12 + sprite.w, sprite.screenY);
            ctx.fillText("╚", sprite.screenX - 75, sprite.screenY + sprite.h + 75);
            ctx.fillText("╝", sprite.screenX - 12 + sprite.w, sprite.screenY + sprite.h + 75);
            ctx.strokeText("╔", sprite.screenX - 75, sprite.screenY);
            ctx.strokeText("╗", sprite.screenX - 12 + sprite.w, sprite.screenY);
            ctx.strokeText("╚", sprite.screenX - 75, sprite.screenY + sprite.h + 75);
            ctx.strokeText("╝", sprite.screenX - 12 + sprite.w, sprite.screenY + sprite.h + 75);
        }
    }
};