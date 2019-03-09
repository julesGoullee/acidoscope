import * as THREE from 'three'

class ShaderParams {

  constructor(shaderEngine) {

    this.shaderEngine = shaderEngine;
    this.uniforms = null;

  }

  static getUniformDefaultValue(type, defaultValue) {
    switch(type) {
      case 'f': {
        return defaultValue || 0.;
      }
      case 'v2': {
        if(!Array.isArray(defaultValue) || defaultValue.length !== 2) {
          throw new Error(`Invalid v2 uniform default values ${defaultValue}`);
        }
        const x = defaultValue[0] || 0.;
        const y = defaultValue[1] || 0.;
        return new THREE.Vector2(x, y);
      }
      case 'v3': {
        if(!Array.isArray(defaultValue) || defaultValue.length !== 3) {
          throw new Error(`Invalid v3 uniform default values ${defaultValue}`);
        }
        const x = defaultValue[0] || 0.;
        const y = defaultValue[1] || 0.;
        const z = defaultValue[2] || 0.;
        return new THREE.Vector3(x, y, z);
      }
      default: {
        throw new Error(`Unknown uniform type ${type}`);
      }
    }
  }

  forUniforms(fn) {

    const params = this.shaderEngine.shader.params;
    const props = Object.keys(params);

    for(let prop in props) {

      const param = params[prop];

      fn(param);

    }

  }

  createUniforms() {

    this.uniforms = {};

    this.forUniforms(param => {

      const value = ShaderParams.getUniformDefaultValue(param.type, param.defaultValue);

      this.uniforms[param.name] = {
        type: param.type,
        value,
      };

    });

    return this.uniforms;

  }

  updateUniforms() {

    this.forUniforms(param => {

      switch(param.special) {
        case 'time': {
          const startTime = this.shaderEngine.startTime;
          const elapsedMilliseconds = Date.now() - startTime;
          this.uniforms.time.value = elapsedMilliseconds / 1000.;
        }
      }
    });

  }

}

export default ShaderParams;
