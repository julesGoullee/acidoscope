export default {
  original: 'http://glslsandbox.com/e#53200.0',
  name: 'Blobs',
  fragmentShader: `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float speedUniform;
uniform float sizeUniform;
uniform float colorUniform;
uniform float countUniform;
float x = 0.0;
vec2 u;
vec2 c;

void main (void) {
	vec2 v = (countUniform*gl_FragCoord.xy-resolution) /max(resolution.x,resolution.y);

	for(int i=1;i<5;i++)
	{

		vec2 newv = v;
		x = fract(u.x * u.y + 0.9);
		x *= (1.0 - length(fract(v)*sizeUniform - vec2(0.1, 0.1)) * (3.0));
		float speed = speedUniform * time; // speed control
    newv.x += 0.8/float(i)*sin(float(i)*v.y+time/(100.0/speed)+0.2*float(i));
	  newv.y += 0.9/float(i)*sin(float(i)*v.x+time/(100.0/speed)+0.2*float(i)+0.9)-0.3;
		v = newv;

	}
	c = vec2(x , 0.4);
	gl_FragColor = vec4(c,colorUniform,1.0)*1.4;
}
`,
  params: [
    {
      name: 'time',
      type: 'f',
      defaultValue: 0.,
      special: 'time',
    },
    {
      name: 'resolution',
      type: 'v2',
      defaultValue: [0.,0.],
      special: 'resolution',
    },
    {
      name: 'mouse',
      type: 'v2',
      defaultValue: [0.,0.],
      special: 'mouse',
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
      name: 'speedUniform',
      special: 'controllable',
      type: 'f',
      range: [1., 100.],
      defaultValue: 10.,
      step: 0.4,
    },
    {
      name: 'sizeUniform',
      special: 'controllable',
      type: 'f',
      range: [0., 1.],
      defaultValue: 0.4,
      step: 0.01,
    },
    {
      name: 'colorUniform',
      special: 'controllable',
      type: 'f',
      range: [0.1, 0.9],
      defaultValue: 0.6,
      step: 0.01,
    },
    {
      name: 'countUniform',
      special: 'controllable',
      type: 'f',
      range: [1., 50.],
      defaultValue: 15.,
      step: 0.3,
    },
  ],
}
