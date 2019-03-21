import DefaultVertex from './defaultVertex.glsl';
import ImageWrapper from './mainImage.glsl';
import VRWrapper from './mainVR.glsl';
import Defines from './defines.glsl';
import Uniforms from './uniforms.glsl';

class GlslWrapper {

  constructor(shaderEngine) {
    this.shaderEngine = shaderEngine;
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
    if(!this.shaderEngine.shader.fragmentShader.includes('main(')) {

      if(!this.shaderEngine.shader.fragmentShader.includes('mainVR(')) {

        fragmentShader += `
      
void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{

  mainImage(fragColor, fragCoord);
}

`;
      }

      if(renderType === 'image') {
        fragmentShader += `
      
// main image function

${ImageWrapper}

`;
      }
      if(renderType === 'vr') {
        fragmentShader += `

// main VR function

#define VR_SETTINGS_CARDBOARD
//#define VR_SETTINGS_USE_MOUSE
#define VR_SETTINGS_FIXED_ROTATION
//#define VR_SETTINGS_DEVICE_ORIENTATION

${VRWrapper}

`;
      }

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
