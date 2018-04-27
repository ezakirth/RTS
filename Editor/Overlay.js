var Overlay = {
    ctx : null,
    init : function()
    {
        Overlay.ctx = document.getElementById("overlay").getContext("2d");
        Overlay.ctx.canvas.width = Game.width;
        Overlay.ctx.canvas.height = Game.height;
        Overlay.ctx.strokeStyle = "red";
    },

    update : function()
    {
        var ctx = Overlay.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (Game.target)
        {
            var sprite = Game.target;
            ctx.beginPath();
            ctx.rect(sprite.screenX, sprite.screenY, sprite.w, sprite.h);
            ctx.stroke();
        }
    }
};