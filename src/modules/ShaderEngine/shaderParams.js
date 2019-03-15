import * as THREE from 'three'

const defaultParams = [
  {
    name: 'time',
    type: 'f',
    defaultValue: 0.,
    auto: true,
  },
  {
    name: 'resolution',
    type: 'v2',
    defaultValue: [0.,0.],
    auto: true,
  },
  {
    name: 'mouse',
    type: 'v2',
    defaultValue: [0.,0.],
    auto: true,
  },
  {
    name: 'phase',
    type: 'f',
    defaultValue: 0.0,
    auto: true,
  },
];

class ShaderParams {

  constructor(shaderEngine) {

    this.shaderEngine = shaderEngine;

    this.initialParams = []
      .concat(defaultParams)
      .concat(this.shaderEngine.shader.controllableParams)
      .reduce((acc, param) => ({
          ...acc,
          [param.name]: param,
        }),
        {}
      );

    this.uniforms = null;

    this.speed = 1.0;

    this.beatData = {
      beatStartTime: 0,
      bps: 1,
      bpm: 60,
      beat: 0,
    };

  }

  static getUniformDefaultValue(type, defaultValue) {
    switch(type) {
      case 'f': {
        return defaultValue || 0.;
      }
      case 'v2': {
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 2)) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        const x = defaultValue ? defaultValue[0] : 0.;
        const y = defaultValue ? defaultValue[1] : 0.;
        return new THREE.Vector2(x, y);
      }
      case 'v3': {
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 3)) {
          throw new Error(`Invalid v3 uniform default values ${defaultValue}`);
        }
        const x = defaultValue ? defaultValue[0] : 0.;
        const y = defaultValue ? defaultValue[1] : 0.;
        const z = defaultValue ? defaultValue[2] : 0.;
        return new THREE.Vector3(x, y, z);
      }
      default: {
        throw new Error(`Creating unknown uniform type ${type}`);
      }
    }
  }

  forInitialParams(fn) {

    const initialParams = this.initialParams;
    const paramNames = Object.keys(initialParams);

    paramNames.forEach(paramName => fn(initialParams[paramName]));

  }

  createUniforms() {

    this.uniforms = {};

    this.forInitialParams(param => {

      const value = ShaderParams.getUniformDefaultValue(param.type, param.defaultValue);

      this.uniforms[param.name] = {
        type: param.type,
        value,
      };

    });

    return this.uniforms;

  }

  updateSpecialUniforms() {

    this.setUniformValue('time', (this.shaderEngine.currentTime / 1000.) );

    const phase = (Date.now() - this.beatData.beatStartTime) / 1000 * this.beatData.bps;
    this.setUniformValue('phase', phase);

    const container = this.shaderEngine.container;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    this.setUniformValue('resolution', {x: width, y: height});

    // TODO mouse

  }

  getUniformValue(name) {

    return this.uniforms[name].value;

  }

  setUniformValue(name, value) {

    const initialParam = this.initialParams[name];

    switch(initialParam.type) {
      case 'i':
      case 'f': {
        this.uniforms[name].value = value;
        if(initialParam.range && this.uniforms[name].value < initialParam.range[0]) {
          this.uniforms[name].value = initialParam.range[0];
        }
        if(initialParam.range && this.uniforms[name].value > initialParam.range[1]) {
          this.uniforms[name].value = initialParam.range[1];
        }
        break;
      }
      case 'v2': {
        // TODO handle range
        if(value.x !== undefined) {
          this.uniforms[name].value.x = value.x;
        }
        if(value.y !== undefined) {
          this.uniforms[name].value.y = value.y;
        }
        break;
      }
      case 'v3': {
        if(value.x !== undefined) {
          this.uniforms[name].value.x = value.x;
        }
        if(value.y !== undefined) {
          this.uniforms[name].value.y = value.y;
        }
        if(value.z !== undefined) {
          this.uniforms[name].value.z = value.z;
        }
        break;
      }
      default: {
        throw new Error(`Setting unknown uniform type ${initialParam.type}`);
      }
    }

  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setBeat(beatData) {
    this.beatData = {
      beatStartTime: beatData.beatStartTime,
      bps: beatData.bps,
      bpm: beatData.bpm,
      beat: beatData.beat,
    };
  }

}

export default ShaderParams;
