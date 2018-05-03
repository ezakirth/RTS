"use strict";

/**
 * @class Terrain
 * @author Xavier de Boysson
 * @
 */
class Terrain {
    /**
     * Creates a Terrain object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, x2 : float, y2 : float, x3 : float, y3 : float, x4 : float, y4 : float}
     */
    constructor(param){
     //   super(param);
        this.type = param.type || "terrain";
        this.texture = param.texture;
        this.textureSettings = {};

        this.blockWidth = Math.floor(Game.width/32);
        this.mapSize = 4*this.blockWidth;

        if (param.terrain)
            this.terrain = param.terrain;
        else
        {
            var Simplex = new SimplexNoise();
            this.noise = param.noise;
            this.terrain = [];
            var xa, xb, ya, yb;

            var flatWidth = 20;
            var smoothWidth = 10;

            for (var i=0; i<=this.mapSize; i++)
            {
                var noiseVal = i/(Game.width/this.blockWidth);
                this.terrain[i] = Simplex.noise(noiseVal, 0)*this.noise;
                // Flatten left side and right side
                if (i <= flatWidth || i >= this.mapSize - flatWidth)
                {
                    this.terrain[i] = 0;
                }
            }

            for (var i=1; i<=smoothWidth ;i++)
            {
                this.terrain[flatWidth + i] = Utils.cerp(0, this.terrain[flatWidth + smoothWidth], i/smoothWidth); 
            }

            var j=1;
            for (var i=this.mapSize - flatWidth - smoothWidth; i<=this.mapSize - flatWidth; i++)
            {
                this.terrain[i] = Utils.cerp(this.terrain[this.mapSize - flatWidth - smoothWidth - 1], 0, ((i+1)-(this.mapSize - flatWidth - smoothWidth))/smoothWidth);
            }
        }

        this.texWidth = param.texWidth;
        this.texHeight = param.texHeight;
        this.maxViewWidth = (this.mapSize*(Game.width/this.blockWidth) - this.texWidth) - Game.width;
        this.offsetY = param.offsetY;
        this.position = [];
        this.indices = [];
        this.textcoord = [];
        this.z = 10;
        var index = 0;

        for (var i=0; i<this.mapSize; i+=2)
        {
            xa = (i)*(Game.width/this.blockWidth);
            xb = (i+1)*(Game.width/this.blockWidth);
            ya = this.terrain[i] + this.offsetY;
            yb = this.terrain[i+1] + this.offsetY;

            this.position.push(xa, ya, this.z);
            this.indices.push(index++);
            this.position.push(xb, yb - this.texHeight, this.z);
            this.indices.push(index++);

            var ratio = (i/this.blockWidth)*Math.floor(Game.width/this.texWidth);
            var step = (1/this.blockWidth)*Math.floor(Game.width/this.texWidth);
            this.textcoord.push(
                ratio, 0,
                ratio+step, 1
            );   

        }


        

        // initialize the buffers
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
            position: {
                data : this.position,
                //drawType: gl.STATIC_DRAW//gl.DYNAMIC_DRAW
            },
            texcoord: this.textcoord,
            indices: this.indices
        });
        
        this.modelMatrix = twgl.m4.identity();

        this.uniforms = {
            u_modelViewProjection: twgl.m4.identity(),
            u_texture: Game.world.textures[this.texture],
            u_color:  new Float32Array([1, 1, 1])
        };

        twgl.m4.translate(this.modelMatrix, twgl.v3.create(-this.texWidth/2,0,0), this.modelMatrix);


    }


    update()
    {
        // Projection*View*Model
        twgl.m4.multiply(Game.world.projectionMatrix, Game.world.ViewMatrix, this.uniforms.u_modelViewProjection);
        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);
    }

    draw()
    {
        twgl.setBuffersAndAttributes(gl, gl.programInfo, this.bufferInfo);
        twgl.setUniforms(gl.programInfo, this.uniforms);

        if (Editor.wireFrame == "1")
            gl.drawElements(gl.LINES, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
        else
            gl.drawElements(gl.TRIANGLE_STRIP, this.bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
    }

    touch(x, y)
    {
        
    }

}

