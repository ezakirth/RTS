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

    cerp : function(start, end, amt)
    {
        var amt2 = (1 - Math.cos(amt * Math.PI)) / 2;
        return start * (1 - amt2) + end * amt2;
    },    

    toDegrees : function(angle)
    {
        return angle * (180 / Math.PI);
    },

    toRadians : function(angle)
    {
        return angle * (Math.PI / 180);
    },

    componentToHex(c) {
        var hex = Math.floor(c*255).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    
    rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    },

    compare : function(a,b) {
        if (a.z < b.z)
          return -1;
        if (a.z > b.z)
          return 1;
        return 0;
      }
          
}