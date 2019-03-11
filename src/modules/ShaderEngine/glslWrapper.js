import DefaultVertex from './defaultVertex.glsl';
import MainImage from './mainImage.glsl';
import MainVR from './mainVR.glsl';

class GlslWrapper {

  constructor(shaderEngine) {
    this.shaderEngine = shaderEngine;
  }

  getPrecisionDefinitions() {
    return `
#ifdef GL_ES
precision mediump float;
#endif
`;
  }

  getUniformsDefinitions() {
    // TODO
    return `
      
// Uniforms definitions

`;

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

    fragmentShader += this.getPrecisionDefinitions();
    fragmentShader += this.getUniformsDefinitions();

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
