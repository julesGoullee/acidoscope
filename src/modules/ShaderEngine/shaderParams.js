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
  {
    name: 'iDevicePositionUniform',
    type: 'v3',
    auto: true,
  },
  {
    name: 'iDeviceRotationUniform',
    type: 'm3',
    auto: true,
  },
  {
    name: 'speed',
    type: 'f',
    defaultValue: 1.0,
    range: [0., 10.],
    step: 0.1
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

    this.uniforms = {};

    this.beatData = {
      beatStartTime: 0,
      bps: 1,
      bpm: 60,
      beat: 0,
    };

    this.frameData = (typeof window !== 'undefined' && 'VRFrameData' in window) ? new window.VRFrameData() : null;

  }

  static getUniformDefaultValue(type, defaultValue) {
    switch(type) {
      case 'f': {
        return defaultValue || 0.;
      }
      case 'v2': {
        const uniform = new THREE.Vector2();
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 2)) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        defaultValue && uniform.fromArray(defaultValue);
        return uniform;
      }
      case 'v3': {
        const uniform = new THREE.Vector3();
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 3)) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        defaultValue && uniform.fromArray(defaultValue);
        return uniform;
      }
      case 'm3': {
        const uniform = new THREE.Matrix3();
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 3*3)) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        defaultValue && uniform.fromArray(defaultValue);
        return uniform;
      }
      case 'm4': {
        const uniform = new THREE.Matrix4();
        if(defaultValue && (!Array.isArray(defaultValue) || defaultValue.length !== 4*4)) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        defaultValue && uniform.fromArray(defaultValue);
        return uniform;
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

    // Time uniform
    const time = this.shaderEngine.currentTime / 1000.;
    this.setUniformValue('time', time);

    // Phase uniform
    const phase = (Date.now() - this.beatData.beatStartTime) / 1000 * this.beatData.bps;
    this.setUniformValue('phase', phase);

    // Resolution uniform
    // Maybe not needed at each frames
    const vrDevice = this.shaderEngine.renderer.vr.getDevice();
    if(vrDevice) {

      const eyeParameters = vrDevice.getEyeParameters( 'left' );
      const renderWidth = eyeParameters.renderWidth;
      const renderHeight = eyeParameters.renderHeight;
      const resolution = new THREE.Vector2(2*renderWidth, renderHeight);
      this.setUniformValue('resolution', resolution);

      vrDevice.getFrameData( this.frameData );
      const curFramePose = this.frameData.pose;

      const iDevicePositionUniform = new THREE.Vector3();
      iDevicePositionUniform.fromArray(curFramePose.position || [0.,0.,0.]);

      const deviceOrientation = curFramePose.orientation;
      const euler = new THREE.Euler(deviceOrientation[0], deviceOrientation[1], deviceOrientation[2]);
      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.makeRotationFromEuler(euler);
      const iDeviceRotationUniform = new THREE.Matrix3();
      iDeviceRotationUniform.setFromMatrix4(rotationMatrix);

      //console.log(deviceOrientation, iDeviceRotationUniform);

      this.setUniformValue('iDevicePositionUniform', iDevicePositionUniform);
      this.setUniformValue('iDeviceRotationUniform', iDeviceRotationUniform);

    } else {

      const width = this.shaderEngine.width * this.shaderEngine.quality;
      const height = this.shaderEngine.height * this.shaderEngine.quality;
      const resolution = new THREE.Vector2(width, height);
      this.setUniformValue('resolution', resolution);

    }

    // TODO mouse

  }

  getUniformValue(name) {

    return this.uniforms[name].value;

  }

  setUniformValue(name, value) {

    const initialParam = this.initialParams[name];
    const uniform = this.uniforms[name];

    // TODO use VectorX functions to set and clamp https://threejs.org/docs/index.html#api/en/math/Vector2
    switch(initialParam.type) {
      case 'i':
      case 'f': {
        uniform.value = value;

        break;
      }
      case 'v2': {
        uniform.value.copy(value);
        if(initialParam.range) {
          uniform.clamp(initialParam.range[0], initialParam.range[1])
        }
        break;
      }
      case 'v3': {
        uniform.value.copy(value);
        if(initialParam.range) {
          uniform.clamp(initialParam.range[0], initialParam.range[1])
        }
        break;
      }
      case 'm3': {
        uniform.value.copy(value);
        break;
      }
      default: {
        throw new Error(`Setting unknown uniform type ${initialParam.type}`);
      }
    }

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
