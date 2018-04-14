"use strict";

var Utils = {
    loadShaders : function(fragURL, vertURL, callback)
    {
        $.ajax({
            url: fragURL,
            success: function(fragSRC) {
                $("#fs").html(fragSRC);
                $.ajax({
                    url: vertURL,
                    success: function(vertSRC) {
                        $("#vs").html(vertSRC);
                        callback();
                    }
                });
            }
        });
    },

    rotate : function(sprite, rot)
    {
        twgl.m4.rotateZ(sprite.modelMatrix, rot, sprite.modelMatrix);
    },

    scale : function(sprite, val)
    {
        twgl.m4.scale(sprite.modelMatrix, twgl.v3.create(val,val,1), sprite.modelMatrix);    
    },

    lerp : function(start, end, amt)
    {
        return (1-amt)*start+amt*end
    },

    toDegrees : function(angle)
    {
        return angle * (180 / Math.PI);
    },

    toRadians : function(angle)
    {
        return angle * (Math.PI / 180);
    }
}