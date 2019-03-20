export default {
  original: 'https://www.shadertoy.com/view/wdlSD2',
  name: 'Anaglyph fractal',
  fragmentShader: require('./shader4.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0, 5],
      defaultValue: 2.5,
      step: 0.01
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.5, 0.7],
      defaultValue: 0.66,
      step: 0.001
    }
  ],
}
