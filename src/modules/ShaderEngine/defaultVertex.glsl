#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main()	{

  // For applying shader to a projected plane
  //gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  // For applying whole screen, need a plane geometry [-1, 1]
  gl_Position = vec4( position, 1.0 );

}
