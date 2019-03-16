export default {
  original: 'http://glslsandbox.com/e#53200.0',
  name: 'Blobs',
  fragmentShader: require('./shader3.glsl'),
  params: [
    {
      name: 'sizeUniform',
      type: 'f',
      range: [0., 1.],
      defaultValue: 0.4,
      step: 0.01,
    },
    {
      name: 'colorUniform',
      type: 'f',
      range: [0.1, 0.9],
      defaultValue: 0.6,
      step: 0.01,
    },
    {
      name: 'countUniform',
      type: 'f',
      range: [1., 50.],
      defaultValue: 15.,
      step: 0.3,
    },
  ],
}
