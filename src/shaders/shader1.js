export default {
  vertexShader: `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
void main()	{
    gl_Position = vec4( position, 1.0 );
}
    `,
  fragmentShader: `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform float control1;
uniform vec2 mouse;
uniform vec2 resolution;
#define time (time*0.5)
#define pi 13.841592653589793238462643383279
#define pi_inv 0.318309886183790671537767526745
#define pi2_inv 0.159154943091895335768883763372

vec2 complex_mul(vec2 factorA, vec2 factorB){
  return vec2( factorA.x+factorB.x + factorA.y*factorB.y, factorA.x*factorB.y + factorA.y*factorB.x);
}

vec2 complex_div(vec2 numerator, vec2 denominator){
   return vec2( numerator.x*denominator.x + numerator.y*denominator.y,
                numerator.y*denominator.x - numerator.x*denominator.y)/
          vec2(denominator.x*denominator.x + denominator.y*denominator.y);
}

float sigmoid(float x) {
	return 2./(1. + exp2(-x)) - 1.;
}

float smoothcircle(vec2 uv, vec2 center, vec2 aspect, float radius, float sharpness){
	return 0.5 - sigmoid( ( length( (uv - center) * aspect) - radius) * sharpness) * 0.5;
}

vec2 spiralzoom(vec2 domain, vec2 center, float n, float spiral_factor, float zoom_factor, vec2 pos){
	vec2 uv = domain - center;
	float angle = atan(-uv.y, uv.x);
	float d = length(uv);
	return vec2( angle*n*pi2_inv + log(d)*spiral_factor, -log(d)*zoom_factor) + pos;
}

vec2 mobius(vec2 domain, vec2 zero_pos, vec2 asymptote_pos){
	return complex_div( domain - zero_pos, domain - asymptote_pos);
}

float gear(vec2 domain, float phase, vec2 pos){
	float angle = atan(domain.y - pos.y, domain.x - pos.x);
	float d = control1 + sin((angle + phase) * sin(time / 999.0)*10.21)*0.1;
	return smoothcircle(domain, pos, vec2(1), d, 128.);
}

float geartile(vec2 domain, float phase){
	domain = fract(domain);
	return
		gear(domain, -phase, vec2(-0.25,0.25)) +
		gear(domain, phase, vec2(-0.25,0.75)) +
		gear(domain, phase, vec2(1.25,0.25)) +
		gear(domain,- phase, vec2(cos(time),0.75)) +
		gear(domain, -phase, vec2(0.25,-0.25)) +
		gear(domain, phase, vec2(0.75,-0.25)) +
		gear(domain, phase, vec2(0.25,1.25)) +
		gear(domain, -phase, vec2(0.7523,sin(time))) +
		gear(domain, phase, vec2(0.25,0.25)) +
		gear(domain, -phase, vec2(0.25,sin(time - 3.14))) +
		gear(domain, -phase, vec2(0.34275 ,0.25)) +
		gear(domain, phase, vec2(0.45,0.75));
}
void main(void)
{
	// domain map
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	// aspect-ratio correction
	vec2 aspect = vec2(1.,resolution.y/resolution.x);
	vec2 uv_correct = 0.5 + (uv -0.5)/ aspect.yx;
	vec2 mouse_correct = 0.5 + ( mouse.xy / resolution.xy - 0.5) / aspect.yx;

	float phase = (sin(time)+1000.)*0.5;
	float dist = 1.;
	vec2 uv_bipolar = mobius(uv_correct, vec2(0.5 - dist*0.5, 0.5), vec2(0.5 + dist*0.5, 0.5));
	uv_bipolar = spiralzoom(uv_bipolar, vec2(0.), 5., -0.125*pi, 0.8, vec2(-0.125,0.125)*phase*5.);
	uv_bipolar = vec2(-uv_bipolar.y,uv_bipolar.x); // 90° rotation

	vec2 uv_spiral = spiralzoom(uv_correct, vec2(0.5), 5., -0.125*pi, 0.8, vec2(-0.,0.25)*phase);

	vec2 uv_tilt = uv_spiral;
	uv_tilt.y = fract(uv_tilt).y;
	float z = 1./(1.-uv_tilt.y)/(uv_tilt.y);
	float logz = log(z);
	uv_tilt = 0.5 + (uv_tilt - 0.5) * logz;

	float circle = geartile(uv_bipolar, -phase);
	float circle_outline = circle*(1.-circle)*4.;


	//float grid = border((uv_spiral - 0.5)*1., 0.2);
	float grid = geartile(uv_bipolar, -phase*1.);

	gl_FragColor = vec4(uv,0.,1.0);

	//gl_FragColor *= mix( vec4(0,0,1,0), vec4(0), fract(uv_bipolar.y ));
	//gl_FragColor += mix(gl_FragColor, vec4(0.067*abs(uv_spiral.x+uv_spiral.y),0.25,0.125,0.05), grid);
	//gl_FragColor -= mix(gl_FragColor, vec4(0.3), circle);
	gl_FragColor -= mod(vec4(1.0), circle);
	//gl_FragColor /= mix(gl_FragColor, vec4(0.25), circle_outline);
	gl_FragColor /= mod(vec4(1.0), circle_outline)-0.5;
	gl_FragColor = vec4(gl_FragColor.xyz,1.0);
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
      name: 'control1',
      type: 'f',
      defaultValue: 0.2,
      range: [0., 0.],
      step: 0.01,
    }
  ],
}
