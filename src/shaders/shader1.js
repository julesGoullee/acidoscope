export default {
  original: 'http://glslsandbox.com/e#53202.0',
  name: 'Spiral eyes',
  fragmentShader: require('./shader1.glsl'),
  params: [
    {
      name: 'control1',
      type: 'f',
      defaultValue: 0.2,
      range: [0.01, 0.7],
      step: 0.01,
    },
    {
      name: 'control2',
      type: 'f',
      defaultValue: 0.1,
      range: [0.01, 0.7],
      step: 0.01,
    },
  ],
}
