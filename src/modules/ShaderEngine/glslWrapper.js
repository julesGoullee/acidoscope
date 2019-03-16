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

# define VR_SETTINGS_CARDBOARD

${MainVR}
      
`;
      }
      default:
        return '';
    }

  }

  getFragmentShader() {

    let fragmentShader = '';

    fragmentShader += Defines;
    fragmentShader += '\n';
    fragmentShader += Uniforms;

    fragmentShader += `
      
// fragment code

${this.shaderEngine.shader.fragmentShader}

`;
    fragmentShader += this.getWrapper(this.shaderEngine.shader.wrapper);

    return fragmentShader;

  }

  getVertexShader() {
    return this.shaderEngine.shader.vertexShader ?
      this.shaderEngine.shader.vertexShader :
      DefaultVertex;
  }

}

export default GlslWrapper;
