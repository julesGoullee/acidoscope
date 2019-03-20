uniform float sizeUniform;
uniform float colorUniform;
uniform float countUniform;
float x = 0.0;
vec2 u;
vec2 c;

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 v = (countUniform*fragCoord.xy-resolution) /max(resolution.x,resolution.y);
  float tt = 1. + abs(sin(phase*PI + PI/2.));

  for(int i=1;i<5;i++)
  {

    vec2 newv = v;
    x = fract(u.x * u.y + 0.9);
    x *= (1.0 - length(fract(v)*sizeUniform - vec2(0.1, 0.1)) * (3.0));
    float speed = 10. * time; // speed control
    newv.x += 0.8/float(i)*sin(float(i)*v.y+time/(100.0/speed)+0.2*float(i));
    newv.y += 0.9/float(i)*sin(float(i)*v.x+time/(100.0/speed)+0.2*float(i)+0.9)-0.3 * tt;
    v = newv;

  }
  c = vec2(x , 0.4);
  fragColor = vec4(c,colorUniform,1.0)*1.4;
}
