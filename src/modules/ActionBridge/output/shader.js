import Output from './index';

class ShaderOutput extends Output {
  constructor(shaderEngine) {
    super();

    this.on('event', outputEvent => {
      switch(outputEvent.actionName) {
        case 'takeScreenShot': {
          shaderEngine.downloadScreenShot();
          break;
        }
        case 'pause': {
          shaderEngine.pause();
          break;
        }
        case 'switchFullscreen': {
          shaderEngine.switchFullscreen();
          break;
        }
      }
    })
  }

  static action(actionName) {
    return {
      actionName,
    }
  }
}

export default ShaderOutput;
