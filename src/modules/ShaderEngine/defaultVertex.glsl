#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
void main()	{
    gl_Position = vec4( position, 1.0 );
}
