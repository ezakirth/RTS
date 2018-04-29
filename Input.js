"use strict";

var Input = {
    active : false,
    last : {x : 0, y : 0},
    origin: {x : 0, y : 0},
    pos : {x : 0, y : 0},
    delta : 0,
    inertia : 0,
    keyLeft : false,
    keyRight : false,
    viewPos : 0,
    update : function() {

        if (Input.keyLeft || Input.keyRight)
        {
            if (Input.keyLeft)
            {
                Input.inertia -= Game.world.speed;
                Input.viewPos += 5 * Game.world.speed;
            }
            else
            {
                Input.inertia += Game.world.speed;
                Input.viewPos -= 5 * Game.world.speed;
            }
        }
        Input.viewPos -= Input.inertia * Game.world.speed;
        Input.inertia -= (Input.inertia/20)*Game.world.speed;
        if (Input.viewPos > 0)
        {
            Input.inertia = 0;
            Input.viewPos = 0;
        } 
        if (Input.viewPos < -(Game.world.terrain.maxViewWidth))
        {
            Input.inertia = 0;
            Input.viewPos = -(Game.world.terrain.maxViewWidth);
        } 
        
    },

    inputUp : function(e)
    {
        Input.active = false;
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Game.target = null;
    },

    inputDown : function(e)
    {
        Input.active = true;
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
        Input.getPosition(Input.pos, e);
        Game.touch(Input.pos.x, Game.height - Input.pos.y);
    },
    
    inputMove : function(e)
    {
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.getPosition(Input.pos, e);
    
        if (Input.active)
        {
            var deltaX = (Input.last.x - Input.pos.x)*Game.world.speed;
            var deltaY = (Input.last.y - Input.pos.y)*Game.world.speed;
            if (Game.target)
            {
                Game.move(deltaX, deltaY);
            }
            else
            {
                Input.viewPos -= deltaX;
                Input.inertia = deltaX;
            }
        }
    },

    inputKeyDown : function(e)
    {
        if(e.keyCode == 37) { // left
            Input.keyLeft = true;
        }
        else if(e.keyCode == 39) { // right
            Input.keyRight = true;
        }
    },

    inputKeyUp : function(e)
    {
        Input.keyLeft = false;
        Input.keyRight = false;
    },

	getPosition : function(point, event)
	{
		if (event.touches)
		{
			point.x = (event.touches[0].pageX + Menu.overlay.offsetX) * Game.ratioX;
			point.y = (event.touches[0].pageY + Menu.overlay.offsetY) * Game.ratioY;
		}
		else
		{
			point.x = (event.pageX - Menu.overlay.offsetX) * Game.ratioX;
			point.y = (event.pageY - Menu.overlay.offsetY) * Game.ratioY;
        }

	},    
};

document.addEventListener('touchstart', Input.inputDown);
document.addEventListener('touchend', Input.inputUp);
document.addEventListener('touchmove', Input.inputMove);

document.addEventListener('mousedown', Input.inputDown);
document.addEventListener('mouseup', Input.inputUp);
document.addEventListener('mousemove', Input.inputMove);

document.addEventListener('keyup', Input.inputKeyUp);
document.addEventListener('keydown', Input.inputKeyDown);
