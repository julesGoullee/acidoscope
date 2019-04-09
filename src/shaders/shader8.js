
export default {
  original: 'https://www.shadertoy.com/view/Mtl3WH',
  name: 'Shape',
  fragmentShader: require('./shader8.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0.1, 0.8],
      defaultValue: 0.6,
      step: 0.005
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.0,
      step: 0.005
    },
    {
      name: 'control3',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.5,
      step: 0.005,
    },
    {
      name: 'control4',
      type: 'f',
      range: [0, 1.],
      defaultValue: 0.5,
      step: 0.001
    },
  ],
}
