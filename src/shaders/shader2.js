export default {
  original: 'https://www.shadertoy.com/view/ltBcRc',
  name: 'Kaleidoic trip',
  fragmentShader: require('./shader2.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0.3, 1],
      defaultValue: 0.4,
      step: 0.005
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.3, 2],
      defaultValue: 1,
      step: 0.005
    },
    {
      name: 'control3',
      type: 'f',
      range: [0.1, 2],
      defaultValue: 0.35,
      step: 0.005
    },
    {
      name: 'control4',
      type: 'f',
      range: [0.1, 1],
      defaultValue: 0.99,
      step: 0.005
    },
  ],
}
