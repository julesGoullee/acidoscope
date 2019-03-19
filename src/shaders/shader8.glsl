// thanks to iq for some primitive distance functions

// info: http://miss-cache.blogspot.com/2015/01/modelling-with-distance-functions-shape.html

#define COLOR_PALETTE 2

#if COLOR_PALETTE==1
vec3 backgrColor = vec3(0.51, 0.85, 0.98);
vec3 insideColor0 = vec3(0.4, 0.75, 0.34);
vec3 insideColor1 = vec3(0.32, 0.94, 0.47);
vec3 borderColor = vec3(0.0, 0.25, 0.06);
vec3 glowColor = vec3(0.06, 0.12, 0.08);
float glowStrength = 0.07;
#elif COLOR_PALETTE==2
vec3 backgrColor = vec3(0.85);
vec3 insideColor0 = vec3(0.0);
vec3 insideColor1 = vec3(0.73, 0.0, 0.0);
vec3 borderColor = vec3(0.0);
vec3 glowColor = vec3(0.36);
float glowStrength = 0.85;
#else
vec3 backgrColor = vec3(0.0);
vec3 insideColor0 = vec3(1.0);
vec3 insideColor1 = vec3(1.0);
vec3 borderColor = vec3(1.0);
vec3 glowColor = vec3(0.43, 0.85, 1.0);
float glowStrength = 0.99;
#endif


float distBox(vec2 p, vec2 b)
{
  vec2 di = abs(p) - b;
  float mc = max(di.x, di.y);
  return mc < 0.0 ? mc : length(max(di,0.0));
}

float distDisc(vec2 p, float radius) { return length(p) - radius; }
float distCircle(vec2 p, float R, float r) { return abs(length(p) - R) - r; }
float distCircleTaxi(vec2 p, float R, float r) { return abs(abs(p.x) + abs(p.y) - R) - r; }
float distHex(vec2 p, float h) { p = abs(p); return max(p.x+p.y*0.57735,p.y)-h; }
float distRouBox(vec2 p, vec2 b, float c) { return length( max( abs(p) - b + vec2(c, c), 0.0 ) ) - c; }

vec2 rotate(vec2 p, float a) { return vec2(p.x*cos(a)+p.y*sin(a), p.y*cos(a)-p.x*sin(a)); }
  #define SQRT2_OVER2 0.70710678

vec2 calcCoordsID(vec2 uv, int ID, float rotation)
{
  vec2 cellSize = vec2(PI / 16.0, PI / 20.0);

  if(ID == 0)
  {
    uv = vec2(length(uv), atan(uv.y/uv.x) * 0.2);
  }
  else if(ID == 2)
  {
    uv = vec2(log(length(uv) + 0.001) * 2.0, atan(uv.y, uv.x)) * 0.2;
  }
  else if(ID == 3)
  {
    uv = vec2(uv.x*uv.y, 0.5*(uv.y*uv.y - uv.x*uv.x)) * 2.5; // Parabolic coordinates? But reversed (parabolic to carthesian)
  }
  else if(ID == 4)
  {
    uv = exp(uv.x)*vec2(cos(uv.y), sin(uv.y));
  }
  else if(ID == 5)
  {
    float ff = length(uv) * 3.5;
    uv =  2.5 * uv * atan(ff) / (ff + 0.01);
  }
  else if(ID == 6)
  {
    uv = vec2(log(length(uv) + 0.001), atan(uv.y/uv.x));
    uv = rotate(uv, PI*0.25);
    cellSize *= SQRT2_OVER2 * vec2(1.0, 1.0) * 2.0;
    //uv.y += 1.0 * uv.x;
  }
  else if(ID == 7)
  {
    uv.x /= (1.0 + 2.0 * abs(uv.y));
  }

  vec2 uvIntMod2 = mod(floor((uv) / cellSize), 2.0);
  uv = mod(uv, cellSize);
  if(abs(uvIntMod2.x) < 0.1 || abs(2.0-uvIntMod2.x) < 0.1) uv.x = cellSize.x - uv.x;
  if(abs(uvIntMod2.y) < 0.1 || abs(2.0-uvIntMod2.y) < 0.1) uv.y = cellSize.y - uv.y;

  uv -= cellSize*0.5;

  return uv;
}

vec2 deformCoords(vec2 uv)
{
  float t = mod(iTime, 20.0);
  float t01 = 0.0;
  if(t > 17.0) t01 = (t-17.0) / 3.0;

  int id0 = int(floor(mod(iTime/20.0, 8.0)));
  int id1 = int(floor(mod(iTime/20.0 + 1.0, 8.0)));

  vec2 uv1 = calcCoordsID(uv, id0, 0.0);
  vec2 uv2 = calcCoordsID(uv, id1, 0.0);
  uv = mix(uv1, uv2, t01);

  return uv;
}

float signNoZero(float x)
{
  return x > 0.0 ? 1.0 : -1.0;
}

vec2 domainXFormID(vec2 p, int ID, float t)
{
  if(ID == 0)
  p.x += p.y * t;
  else if(ID == 1)
  p.y += (0.045 - abs(p.x)) * t;
  else if(ID == 2)
  p.x -= signNoZero(p.x) * (0.05 - 0.5*abs(p.y)) * t;
  else if(ID == 3)
  p.y -= signNoZero(p.y) * 0.5*abs(p.x) * t;
  else if(ID == 4)
  p.x -= signNoZero(p.x) * 0.45 * length(p) * t;
  else if(ID == 5)
  p.y += 0.35 * length(p) * t;
  else if(ID == 6)
  p.x -= signNoZero(p.x) * 0.05 * t;
  else if(ID == 7)
  {
    p.x -= signNoZero(p.x) * 0.05 * t;
    p.y -= signNoZero(p.y) * 0.05 * t;
  }
  else if(ID == 8)
  p.x *= (1.0 + t * 80.0 * abs(p.y));
  else if(ID == 9)
  p.y += t * cos(p.x * 20.0 * PI) * 0.025;

  return p;
}

vec2 deformPos(vec2 p)
{
  int id = int(floor(mod(iTime, 40.0)))/4;
  float t02 = mod(iTime, 4.0) * 0.5;
  float t010 = t02 > 1.0 ? 2.0 - t02 : t02;
  t010 = smoothstep(0.0, 1.0, t010);

  return domainXFormID(p, id, t010);
}

float distShapeID(vec2 p, int ID, vec2 par)
{
  float d = 0.0;
  if(ID == 0)
  d = distCircle(p, par.x, par.y);
  else if(ID == 1)
  d = distCircleTaxi(p, par.x, par.y);
  else if(ID == 6)
  d = distBox(p, par);
  else if(ID == 3)
  d = distRouBox(p, vec2(par.x), par.y);
  else if(ID == 4)
  d = distHex(p, par.x);
  else if(ID == 5)
  d = distBox(p, vec2(30.0, par.x * 0.5));
  else if(ID == 2)
  d = distBox(p, vec2(par.x * 0.5, 30.0));
  else if(ID == 7)
  d = min(distBox(p, vec2(30.0, par.x * 0.5)), distBox(p, vec2(par.y * 0.5, 30.0)));

  return d;
}

float distShapeCSG(vec2 p, int opID, int shapeID0, int shapeID1)
{
  float t = 1. + abs(sin(phase*PI + PI/2.));
  vec2 param0 = vec2(4.0 * t, 1.5);
  vec2 param1 = vec2(4.0 * t, 1.5);

  if(opID == 2) param1 *= 1.2;
  if(opID == 3) param1 *= 0.4;

  float d = distShapeID(p, shapeID0, param0);
  float d2 = distShapeID(p, shapeID1, param1);

  if(opID == 1) 	   d = min(d,  d2);
  else if(opID == 2) d = max(d,  d2);
  else if(opID == 3) d = max(d, -d2);

  return d;
}

float distShape(vec2 modpos)
{
  modpos *= 100.0;
  float time = iTime * 0.45;

  float t01 = smoothstep(0.0, 1.0, mod(time, 1.0));

  int id00 = int(floor(mod(time, 8.0)));
  int id01 = int(floor(mod(time+5.0, 8.0)));

  int id10 = int(floor(mod(time+1.0, 8.0)));
  int id11 = int(floor(mod(time+6.0, 8.0)));

  int op0Id = int(floor(mod(time, 4.0)));
  int op1Id = int(floor(mod(time+1.0, 4.0)));

  float d1 = distShapeCSG(modpos, op0Id, id00, id01);
  float d2 = distShapeCSG(modpos, op1Id, id10, id11);

  float d = mix(d1, d2, t01);

  return d * 0.01;
}

vec2 rotateCoords(vec2 uv)
{
  float angle = 0.0;
  float time = mod(iTime, 23.0);
  if(time < 8.0)
  {
    angle = smoothstep(0.0, 1.0, time * 0.125) * PI ;
  }
  uv = rotate(uv, angle);

  return uv;
}

vec3 getColor(float d)
{
  float borderOffset = 0.0033;
  float inSmooth = smoothstep(1.0, 0.0, -d < 0.01 ? 0.0 : (-d-0.01) * 200.0);
  vec3 inColor = inSmooth * insideColor0 + (1.0 - inSmooth) * insideColor1;

  float outSmooth = smoothstep(1.0, 0.0, d < borderOffset ? 0.0 : (d-borderOffset) * (170.0 - glowStrength * 130.0));
  outSmooth *= clamp(5.0 * glowStrength, 0.0, 1.0);
  vec3 outColor = outSmooth * glowColor + (1.0 - outSmooth) * backgrColor;

  vec3 color = vec3(0.0);
  float border = smoothstep(1.0, 0.0, abs(d) * 300.0);
  vec3 noBorderColor = d > 0.0 ? outColor : inColor;
  color = border * borderColor + (1.0 - border) * noBorderColor;

  return color;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  float time010 = mod(iTime, 2.0) * 1.0;
  time010 = smoothstep(0.0, 1.0, time010 > 1.0 ? 2.0 - time010 : time010);

  vec2 uv = fragCoord.xy / iResolution.x;
  uv = uv * 2.0 - vec2(1.0, iResolution.y/iResolution.x);

  uv = deformCoords(uv);
  uv = rotateCoords(uv);
  uv = deformPos(uv);

  float d = distShape(uv);

  float color = d < 0.0 ? 1.0 : smoothstep(1.0, 0.0, d * 250.0);
  fragColor = vec4(color, color * 0.3, color * 0.1, 1.0);
  fragColor = vec4(getColor(d), 1.0);
}
