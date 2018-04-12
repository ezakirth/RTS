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
    update : function() {

        if (Input.keyLeft || Input.keyRight)
        {
            if (Input.keyLeft)
            {
                Input.inertia = 10;
            }
            else
            {
                Input.inertia = -10;
            }
        }
    
        Input.inertia -= Input.inertia/20;
        twgl.m4.translate(ground.uniforms.u_worldViewProjection, twgl.v3.create(Input.inertia,0,0), ground.uniforms.u_worldViewProjection);
     
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
        Input.inertia = -(Input.lastX - Input.mouseX);
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



