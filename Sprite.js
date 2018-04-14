"use strict";

/**
 * @class Sprite
 * @author Xavier de Boysson
 * @
 */
class Sprite extends Quad {
    /**
     * Creates a Sprite object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, w : float, h : float}
     */
    constructor(param) {
        super(param);      
    }

    /**
     * Sets the vertices of a Sprite
     * @param {Object} {x : float, y : float, w : float, h : float}
     */
    setVertices(param)
    {
        this.x = param.x || this.x;
        this.y = param.y || this.y;
        this.w = param.w || this.w;
        this.h = param.h || this.h;

        if (this.align == "center")
        {
            this.x = this.x - this.w/2;
            this.y = this.y - this.h/2;
        }
        var bl = {x : this.x, y : this.y};
        var br = {x : this.x + this.w, y : this.y};
        var tr = {x : this.x + this.w, y : this.y + this.h};
        var tl = {x : this.x, y : this.y + this.h};

        this.position = [
            bl.x, bl.y, this.zindex,
            br.x, br.y, this.zindex,
            tl.x, tl.y, this.zindex,
            tl.x, tl.y, this.zindex,
            br.x, br.y, this.zindex,
            tr.x, tr.y, this.zindex
        ];
        
        twgl.setAttribInfoBufferFromArray(gl, this.bufferInfo.attribs.a_position, this.position);        
    }

}

