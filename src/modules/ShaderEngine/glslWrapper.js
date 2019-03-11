import DefaultVertex from './defaultVertex.glsl';
import MainImage from './mainImage.glsl';

class GlslWrapper {

  constructor(shaderEngine) {
    this.shaderEngine = shaderEngine;
  }

  getUniformsDefinitions() {
    // TODO
    return '';
  }
  getFragmentShader() {

    let fragmentShader = '';

    fragmentShader += `
#ifdef GL_ES
precision mediump float;
#endif
`;

    fragmentShader += `
      
// Uniforms definitions

${this.getUniformsDefinitions()}

`;

    fragmentShader += `
      
// fragment code

${this.shaderEngine.shader.fragmentShader}

`;

    if(this.shaderEngine.shader.wrapped) {
      fragmentShader += `
      
// main function

${MainImage}
      
`;
    }

    return fragmentShader;
  }

  getVertexShader() {
    return this.shaderEngine.shader.vertexShader ?
      this.shaderEngine.shader.vertexShader :
      DefaultVertex;
  }

}

export default GlslWrapper;
