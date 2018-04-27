uniform mat4 u_modelViewProjection;

attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec4 v_position;
varying vec2 v_texCoord;

void main() {
v_texCoord = a_texcoord;
v_position = (u_modelViewProjection * a_position);
gl_Position = v_position;
}