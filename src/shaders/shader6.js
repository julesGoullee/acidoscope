
export default {
  original: 'https://www.shadertoy.com/view/Xs3Gzfs',
  name: 'Bubbles',
  fragmentShader: require('./shader6.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.25,
      step: 0.005
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.2,
      step: 0.005
    },
    {
      name: 'control3',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 1.,
      step: 0.1
    },
    {
      name: 'control4',
      type: 'f',
      range: [0.0, 0.5],
      defaultValue: 0.1,
      step: 0.005
    },
  ],
}
