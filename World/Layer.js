"use strict";

/**
 * @class Layer
 * @author Xavier de Boysson
 * @
 */
class Layer extends Sprite {
    /**
     * Creates a Layer object
     * @param {Object} {texture : WebGLTexture, x : float, y : float, w : float, h : float, type : string, align : string, scale : float, distance : float}
     */
    constructor(param) {
        super(param);

        this.layerViewMatrix = twgl.m4.identity();
        this.distance = param.distance;
    }

    update()
    {
        // View matrix
        this.layerViewMatrix = twgl.m4.identity(this.layerViewMatrix);
        twgl.m4.translate(this.layerViewMatrix, twgl.v3.create(Input.viewPos/this.distance,0,0), this.layerViewMatrix);

        // Transform layer
        twgl.m4.multiply(Game.world.projectionMatrix, this.layerViewMatrix, this.uniforms.u_modelViewProjection);
        twgl.m4.multiply(this.uniforms.u_modelViewProjection, this.modelMatrix, this.uniforms.u_modelViewProjection);        
    }
    
}