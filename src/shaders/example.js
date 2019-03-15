/**
 * This is an example of shader configuration
 *
 * Special values like time and mouse are automatically injected by the engie
 * Controllables value are affected to UI encoders and MIDI inputs
 *
 * [string]       original:             Url of the original shader
 * glsl           fragmentShader:       Full code of fragment shader
 * [glsl]         vertexShader:         Full code of vertex shader. Optional, a simple one can be loaded.
 * [string]       wrapper               Type of wrapper ['image', 'vr']. If not set, the fragment need to have a main function. If set, the shader need to declare mainImage or mainVR functions
 *
 * array<object>  params:               Shader parameters to be passed as uniforms
 * string         params.name:          Name of the uniform
 * string         params.type:          Uniform type ['f', 'vec2', 'vec3']
 * string         params.range:         Value range
 * string         params.defaultValue:  Default value
 * string         params.step:          step for increment
 */

export default {
  original: 'https://example.website.com/originalShaderId',
  fragmentShader: `

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform float control1;
uniform vec2 mouse;
uniform vec2 resolution;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {}

void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir ) {}

void main(void){

	vec2 v = (gl_FragCoord.xy - resolution.xy/2.) / min(resolution.y,resolution.x) * 30.;
	gl_FragColor = vec4(v.x, v.y, control1, 1.);
	
	 
}
`,
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0., 1.],
      defaultValue: 0.5,
      step: 0.001
    },
  ],
}
