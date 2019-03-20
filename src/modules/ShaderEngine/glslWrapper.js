import DefaultVertex from './defaultVertex.glsl';
import MainImage from './mainImage.glsl';
import MainVR from './mainVR.glsl';
import Defines from './defines.glsl';
import Uniforms from './uniforms.glsl';

class GlslWrapper {

  constructor(shaderEngine) {
    this.shaderEngine = shaderEngine;
  }

  getWrapper(type) {

    switch(type) {
      case 'image': {
        return `
      
// main image function

${MainImage}
      
`;
      }
      case 'vr': {
        return `
      
// main VR function

#define VR_SETTINGS_CARDBOARD
#define VR_SETTINGS_FIXED_ROTATION
//#define VR_SETTINGS_DEVICE_ORIENTATION

${MainVR}
      
`;
      }
      default:
        return '';
    }

  }

  getFragmentShader(renderType = 'image') {

    let fragmentShader = '';

    fragmentShader += Defines;
    fragmentShader += '\n';
    fragmentShader += Uniforms;

    fragmentShader += `
      
// fragment code

${this.shaderEngine.shader.fragmentShader}

`;
    fragmentShader += this.getWrapper(renderType);

    return fragmentShader;

  }

  getVertexShader() {
    return this.shaderEngine.shader.vertexShader ?
      this.shaderEngine.shader.vertexShader :
      DefaultVertex;
  }

}

export default GlslWrapper;
