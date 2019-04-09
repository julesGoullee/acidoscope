#define N 10.
void mainImage( out vec4 o, vec2 u ) {
  float tt = 1. + abs(sin(phase*PI + PI/2.));
  u = (u+u-(o.xy=iResolution.xy))/o.y;
  //u = 2.*(u / iResolution.y -vec2(.9,.5));
  float t = iTime,
  r = length(u), a = atan(u.y,u.x),
  i = floor(r*N);
  a *= floor(pow(128.,i/N)); 	 a += 20.*sin(.5*t)+123.34*i-control3*r*cos(.5*t); // (r-0.*i/N)
  r +=  (control4 + tt+.5*cos(a)) / N;
  r = floor(N*r)/N;
  o = (1.-r)*vec4(control1,control2,1.-control1,1);
}
