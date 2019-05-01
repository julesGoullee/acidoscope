import Output from './index';

class ShaderOutput extends Output {
  constructor(shaderEngine) {
    super();

    this.shaderEngine = shaderEngine;

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
        case 'setUniformValue': {
          this._setUniformValue(outputEvent);
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

  static incrementUniform(uniformIndex) {
    return {
      actionName: 'setUniformValue',
      valueType: 'increment',
      uniformIndex,
    }
  }

  static decrementUniform(uniformIndex) {
    return {
      actionName: 'setUniformValue',
      valueType: 'decrement',
      uniformIndex,
    }
  }

  _setUniformValue({ uniformIndex, valueType }) {

    const paramName = this.shaderEngine.shaderParams.controllableParams[uniformIndex];
    const initialParam = this.shaderEngine.shaderParams.initialParams[paramName];
    if(!initialParam) throw new Error('Unknown shader parameter to change');

    let newValue = this.shaderEngine.shaderParams.getUniformValue(paramName);

    switch(valueType) {
      case 'increment': {
        newValue += initialParam.step;
        break;
      }
      case 'decrement': {
        newValue -= initialParam.step;
        break;
      }
      default: {
        console.warn('Unknown shader change value type', valueType, paramName);
      }
    }

    this.shaderEngine.shaderParams.setUniformValue(paramName, newValue);

  }
}

export default ShaderOutput;
