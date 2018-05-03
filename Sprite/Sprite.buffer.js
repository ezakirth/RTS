// initialize the buffers
Sprite.prototype.setBuffer = function()
{
    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
        position: {
            data : this.getBufferPosition(),
            //drawType: gl.STATIC_DRAW//gl.DYNAMIC_DRAW
        },
        texcoord: this.getBufferTexCoord(),
        indices: [0,1,2,3,4,5]
    });
}

Sprite.prototype.updateBufferPosition = function()
{
    twgl.setAttribInfoBufferFromArray(gl, this.bufferInfo.attribs.a_position, this.getBufferPosition());
}

Sprite.prototype.updateBufferTexcoord = function()
{
    twgl.setAttribInfoBufferFromArray(gl, this.bufferInfo.attribs.a_texcoord, this.getBufferTexCoord());
}

Sprite.prototype.getBufferPosition = function()
{
    var bl = {x : -.5, y : -.5, z : 0};
    var br = {x : .5, y : -.5, z : 0};
    var tr = {x : .5, y : .5, z : 0};
    var tl = {x : -.5, y : .5, z : 0};

    return [
        bl.x, bl.y, bl.z,
        br.x, br.y, br.z,
        tl.x, tl.y, tl.z,
        tl.x, tl.y, tl.z,
        br.x, br.y, br.z,
        tr.x, tr.y, tr.z
    ];
}

Sprite.prototype.getBufferTexCoord = function()
{
    if (this.mirrorX)
    {
        return [
            this.wrapX, this.wrapY,
            0, this.wrapY,
            this.wrapX, 0,
            this.wrapX, 0,
            0, this.wrapY,
            0, 0
        ];
    }
    else
    {
        return [
            0, this.wrapY,
            this.wrapX, this.wrapY,
            0, 0,
            0, 0,
            this.wrapX, this.wrapY,
            this.wrapX, 0
        ];
    }
}

