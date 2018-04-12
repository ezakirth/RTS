    precision mediump float;
    
varying vec4 v_position;
varying vec2 v_texCoord;

uniform sampler2D u_texture;
    
    void main() {
      vec4 diffuseColor = texture2D(u_texture, v_texCoord);

      gl_FragColor = diffuseColor;
    }