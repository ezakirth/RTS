Editor.overlay = {
    ctx : null,
    gap : 30,
    dir : .1,
    init : function()
    {
        Editor.overlay.ctx = document.getElementById("overlay").getContext("2d");
        var ctx = Editor.overlay.ctx;
        ctx.canvas.width = Game.width;
        ctx.canvas.height = Game.height;
        ctx.strokeStyle = "#94c0dc";
        ctx.font = "120px Arial";
        ctx.lineWidth = 4;

    },

    update : function()
    {
        var ctx = Editor.overlay.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (Editor.editMode && Editor.selected)
        {
            Editor.overlay.gap += Editor.overlay.dir;
            if (Editor.overlay.gap > 40 || Editor.overlay.gap < 30) Editor.overlay.dir *= -1;

            var sprite = Editor.selected;
            sprite.updateOverlayPos();            

            ctx.beginPath();
            ctx.setLineDash([30, Editor.overlay.gap]);

            ctx.moveTo(sprite.screenX, sprite.screenY);
            ctx.lineTo(sprite.screenX + sprite.w, sprite.screenY);

            ctx.moveTo(sprite.screenX + sprite.w, sprite.screenY);
            ctx.lineTo(sprite.screenX + sprite.w, sprite.screenY + sprite.h);

            ctx.moveTo(sprite.screenX + sprite.w, sprite.screenY + sprite.h);
            ctx.lineTo(sprite.screenX, sprite.screenY + sprite.h);

            ctx.moveTo(sprite.screenX, sprite.screenY + sprite.h);
            ctx.lineTo(sprite.screenX, sprite.screenY);
            
          //  ctx.rect(sprite.screenX, sprite.screenY, sprite.w, sprite.h);
            ctx.stroke();

            ctx.setLineDash([]);
            ctx.strokeText("╔", sprite.screenX - 75, sprite.screenY);
            ctx.strokeText("╗", sprite.screenX - 12 + sprite.w, sprite.screenY);
            ctx.strokeText("╚", sprite.screenX - 75, sprite.screenY + sprite.h + 75);
            ctx.strokeText("╝", sprite.screenX - 12 + sprite.w, sprite.screenY + sprite.h + 75);

        }
    }
};