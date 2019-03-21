
export default {
  original: 'https://www.shadertoy.com/view/lss3R7',
  name: 'Alhambra on lsd',
  fragmentShader: require('./shader10.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0.0, 3.],
      defaultValue: 0.6,
      step: 0.005
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.0, 3.],
      defaultValue: 0.7,
      step: 0.005
    },
    {
      name: 'control3',
      type: 'f',
      range: [0.0, 3.],
      defaultValue: 0.7,
      step: 0.005
    },
    {
      name: 'control4',
      type: 'f',
      range: [0.0, 9.],
      defaultValue: 3.0,
      step: 0.1
    },
  ],
}
