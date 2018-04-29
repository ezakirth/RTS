Menu.overlay = {
    ctx : null,
    init : function()
    {
        Menu.overlay.ctx = document.getElementById("overlay").getContext("2d");
        Menu.overlay.ctx.canvas.width = Game.width;
        Menu.overlay.ctx.canvas.height = Game.height;
        Menu.overlay.ctx.strokeStyle = "red";
    },

    update : function()
    {
        var ctx = Menu.overlay.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (Menu.selected)
        {
            var sprite = Menu.selected;
            sprite.updateOverlayPos();            

            ctx.beginPath();
            ctx.rect(sprite.screenX, sprite.screenY, sprite.w, sprite.h);
            ctx.stroke();
        }
    }
};