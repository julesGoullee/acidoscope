#ifdef GL_ES
precision mediump float;
#endif

// inspired by https://www.shadertoy.com/view/ll2GD3

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
  return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 p = ( fragCoord.xy / resolution.xy );
  fragColor = vec4(p.x, 1.-p.x, p.y, 1.0);
}


void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{
  mainImage(fragColor, fragCoord);

}
