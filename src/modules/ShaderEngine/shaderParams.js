import * as THREE from 'three'

class ShaderParams {

  constructor(shaderEngine) {

    this.shaderEngine = shaderEngine;
    this.initialParams = this.shaderEngine.shader.initialParams.reduce((acc, initialParam) => ({
      ...acc,
      [initialParam.name]: initialParam,
    }), {});
    this.uniforms = null;

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

    const initialParams = this.shaderEngine.shader.initialParams;
    const paramNames = Object.keys(initialParams);

    for(let index in paramNames) {

      const initialParam = initialParams[index];

      fn(initialParam);

    }

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

    this.forInitialParams(param => {

      switch(param.special) {

        case 'time': {
          const startTime = this.shaderEngine.startTime;
          const elapsedMilliseconds = Date.now() - startTime - this.shaderEngine.subTime;
          this.setUniformValue(param.name, elapsedMilliseconds / 1000.);
          break;
        }

        case 'resolution': {
          const container = this.shaderEngine.container;
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          this.setUniformValue(param.name, {x: width, y: height});
          break;
        }

      }
    });

  }

  getUniformValue(name) {

    return this.uniforms[name].value;

  }

  setUniformValue(name, value) {

    const initialParam = this.initialParams[name];

    switch(initialParam.type) {
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


}

export default ShaderParams;
