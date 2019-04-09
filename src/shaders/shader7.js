
export default {
  original: 'https://www.shadertoy.com/view/4sjSRt',
  name: 'sunflower3',
  fragmentShader: require('./shader7.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.5,
      step: 0.005
    },
    {
      name: 'control2',
      type: 'f',
      range: [0.0, 1.],
      defaultValue: 0.04,
      step: 0.005
    },
    {
      name: 'control3',
      type: 'f',
      range: [0.0, 200.],
      defaultValue: 100.,
      step: 1.
    },
    {
      name: 'control4',
      type: 'f',
      range: [-3.0, 3],
      defaultValue: 0.5,
      step: 0.05
    },
  ],
}
