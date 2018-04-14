"use strict";

var Input = {
    active : false,
    lastX : 0,
    lastY : 0,
    originX : 0,
    originY : 0,
    mouseX : 0,
    mouseY : 0,
    delta : 0,
    inertia : 0,
    keyLeft : false,
    keyRight : false,
    Pos : 0,
    update : function() {

        if (Input.keyLeft || Input.keyRight)
        {
            if (Input.keyLeft)
            {
                Input.inertia -= world.speed;
                Input.Pos += 5 * world.speed;
            }
            else
            {
                Input.inertia += world.speed;
                Input.Pos -= 5 * world.speed;
            }
        }
        Input.Pos -= Input.inertia * world.speed;
        Input.inertia -= (Input.inertia/20)*world.speed;
        if (Input.Pos > 0)
        {
            Input.inertia = 0;
            Input.Pos = 0;
        } 
        if (Input.Pos < -(world.ground.max))
        {
            Input.inertia = 0;
            Input.Pos = -(world.ground.max);
        } 
        
    }
};

document.onmouseup = function(e)
{
    Input.active = false;
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;
    Input.mouseX = e.clientX;
    Input.mouseY = e.clientY;   
}
document.onmousedown = function(e)
{
    Input.active = true;
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;
    Input.originX = Input.mouseX;
    Input.originY = Input.mouseY;
}

document.onmousemove = function(e) {
    Input.lastX = Input.mouseX;
    Input.lastY = Input.mouseY;    
    Input.mouseX = e.clientX;
    Input.mouseY = e.clientY;

    if (Input.active)
    {
        Input.Pos -= (Input.lastX - Input.mouseX)*world.speed;
        Input.inertia = (Input.lastX - Input.mouseX)*world.speed;
    }
}


document.onkeydown = function(e)
{
    if(e.keyCode == 37) { // left
        Input.keyLeft = true;
    }
    else if(e.keyCode == 39) { // right
        Input.keyRight = true;
    }
};

document.onkeyup = function(e)
{
    Input.keyLeft = false;
    Input.keyRight = false;
};



