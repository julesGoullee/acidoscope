export default {
  original: 'https://www.shadertoy.com/view/wdlSD2',
  name: 'Anaglyph fractal',
  fragmentShader: `
  
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1492

uniform float time;
uniform vec2 resolution;
uniform float control1;
uniform float control2;

vec4 light;
float ui;
mat2 m,n,nn;
float map (vec3 p) {
    float d = length(p-light.xyz)-light.w;
    d = min(d,max(10.-p.z,0.));
    float t = 1.5 + cos(control1*PI)/2.;
    for (int i = 0; i < 13; i++) {
        t = t*control2;
        p.xy = m*p.xy;
        p.yz = n*p.yz;
        p.zx = nn*p.zx;
        p.xz = abs(p.xz) - t;

    }
    d = min(d,length(p)-1.4*t);

    return d;
}
vec3 norm (vec3 p) {
    vec2 e = vec2 (.001,0.);
    return normalize(vec3(
        map(p+e.xyy) - map(p-e.xyy),
        map(p+e.yxy) - map(p-e.yxy),
        map(p+e.yyx) - map(p-e.yyx)
    ));
}
vec3 dive (vec3 p, vec3 d) {
    for (int i = 0; i < 20; i++) {
        p += d*map(p);
    }
    return p;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 v = fragCoord/resolution.xy*2.-1.;
	  v.x *= resolution.x/resolution.y;
    ui = 100.*time;
    float y = -0.001*ui;
    m = mat2(sin(y),cos(y),-cos(y),sin(y));
    y = 0.0035*ui;
    n = mat2(sin(y),cos(y),-cos(y),sin(y));
    y = 0.0023*ui;
    nn = mat2(sin(y),cos(y),-cos(y),sin(y));
    vec3 r = vec3(0,0,-15.+2.*sin(0.01*ui));
    light = vec4(10.*sin(0.01*ui),2,-23,1);
    vec3 d = normalize(vec3(v,5.));
    vec3 p = dive(r,d);
    d = normalize(light.xyz-p);
    vec3 no = norm(p);

    vec3 bounce = dive(p+0.01*d,d),
    col = mix(no,vec3(0),dot(no, normalize(light.xyz-p)));
    if (length(bounce-light.xyz) > light.w+0.1) col *= 0.2;

    fragColor = vec4(col,1.0);
}

void main() {

  mainImage(gl_FragColor, gl_FragCoord.xy);
  
}
`,
  params: [
    {
      name: 'time',
      type: 'f',
      special: 'time',
    },
    {
      name: 'beat',
      type: 'f',
      special: 'beat',
      defaultValue: 0.,
    },
    {
      name: 'beatStartTime',
      type: 'f',
      special: 'beat',
      defaultValue: 0.,
    },
    {
      name: 'speed',
      type: 'f',
      special: 'controllable',
      defaultValue: 1.,
      range: [0., 4.],
      step: 0.01,
    },
    {
      name: 'resolution',
      type: 'v2',
      special: 'resolution',
    },
    {
      name: 'mouse',
      type: 'v2',
      special: 'mouse',
    },
    {
      name: 'control1',
      special: 'controllable',
      type: 'f',
      range: [0, 5],
      defaultValue: 2.5,
      step: 0.01
    },
    {
      name: 'control2',
      special: 'controllable',
      type: 'f',
      range: [0.5, 0.7],
      defaultValue: 0.66,
      step: 0.001
    }
  ],
}
