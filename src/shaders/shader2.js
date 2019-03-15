export default {
  original: 'https://www.shadertoy.com/view/ltBcRc',
  name: 'Kaleidoic trip',
  fragmentShader: `

uniform float time;
uniform float control1;
uniform float control2;
uniform float control3;
uniform float control4;
uniform vec2 mouse;
uniform vec2 resolution;
#define pi 13.841592653589793238462643383279
#define pi_inv 0.318309886183790671537767526745
#define pi2_inv 0.159154943091895335768883763372

#define l 120
void main(void){
	vec2 v = (gl_FragCoord.xy - resolution.xy/2.) / min(resolution.y,resolution.x) * 30.;
	vec2 vv = v; vec2 vvv = v;
	float ft = time+360.1;
	float tm = ft*0.1;
	float tm2 = ft*0.3;
	vec2 mspt = (vec2(
			sin(tm)+cos(tm*0.2)+sin(tm*0.5)+cos(tm*-0.4)+sin(tm*1.3),
			cos(tm)+sin(tm*0.1)+cos(tm*0.8)+sin(tm*-1.1)+cos(tm*1.5)
			)+1.0)*control3; //5x harmonics, scale back to [0,1]
	float R = 0.0;
	float RR = 0.0;
	float RRR = 0.0;
	float a = (1.-mspt.x)*0.5;
	float C = cos(tm2*0.03+a*0.01)*1.1;
	float S = sin(tm2*0.033+a*0.23)*1.1;
	float C2 = cos(tm2*0.024+a*0.23)*3.1;
	float S2 = sin(tm2*0.03+a*0.01)*3.3;
	vec2 xa=vec2(C, -S);
	vec2 ya=vec2(S, C);
	vec2 xa2=vec2(C2, -S2);
	vec2 ya2=vec2(S2, C2);
	vec2 shift = vec2( 0.033, 0.14);
	vec2 shift2 = vec2( -0.023, -0.22);
	float Z = control1 + mspt.y*0.3;
	float m = control4 +sin(time*0.03)*0.003;
	for ( int i = 0; i < l; i++ ){
		float r = dot(v,v);
		float r2 = dot(vv,vv);
		if ( r > 1.0 )
		{
			r = (1.0)/r ;
			v.x = v.x * r;
			v.y = v.y * r;
		}
		if ( r2 > 1.0 )
		{
			r2 = control2 / r2;
			vv.x = vv.x * r2;
			vv.y = vv.y * r2;
		}
		R *= m;
		R += r;
		R *= m;
		R += r2;
		if(i < l-1){
			RR *= m;
			RR += r;
			RR *= m;
			RR += r2;
			if(i < l-2){
				RRR *= m;
				RRR += r;
				RRR *= m;
				RRR += r2;
			}
		}
		
		v = vec2( dot(v, xa), dot(v, ya)) * Z + shift;
		vv = vec2( dot(vv, xa2), dot(vv, ya2)) * Z + shift2;
	}
	
	float c = ((mod(R,2.0)>1.0)?1.0-fract(R):fract(R));
	float cc = ((mod(RR,2.0)>1.0)?1.0-fract(RR):fract(RR));
	float ccc = ((mod(RRR,2.0)>1.0)?1.0-fract(RRR):fract(RRR));
	gl_FragColor = vec4(ccc, cc, c, 1.0);
	 
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
      special: 'controllable',
      type: 'f',
      range: [0.3, 1],
      defaultValue: 0.4,
      step: 0.005
    },
    {
      name: 'control2',
      special: 'controllable',
      type: 'f',
      range: [0.3, 2],
      defaultValue: 1,
      step: 0.005
    },
    {
      name: 'control3',
      special: 'controllable',
      type: 'f',
      range: [0.1, 2],
      defaultValue: 0.35,
      step: 0.005
    },
    {
      name: 'control4',
      special: 'controllable',
      type: 'f',
      range: [0.1, 1],
      defaultValue: 0.99,
      step: 0.005
    }
  ],
}
