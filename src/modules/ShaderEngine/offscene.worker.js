import ShaderEngineWorker from './engineWorker.js';

let shaderEngineWorker = null;

self.addEventListener('message', ({ data }) => {

  const { type, params } = data;

  switch(type){

    case 'init': {

      const { shader, canvas, windowRatio, width, height, quality, mouse } = params;
      shaderEngineWorker = new ShaderEngineWorker(shader, canvas, windowRatio, width, height, quality, mouse);
      shaderEngineWorker.init();
      break;

    }
    case 'start': {

      shaderEngineWorker.start();
      break;

    }
    case 'stop': {

      shaderEngineWorker.stop();
      break;

    }

    case 'onWindowResize': {

      const { width, height } = params;
      shaderEngineWorker.setWindowSize(width, height);
      shaderEngineWorker.onWindowResize();
      break;
    }

    case 'setQuality': {

      const { quality } = params;
      shaderEngineWorker.setQuality(quality);
      break;

    }

    case 'onMouseMove': {

      const { mouse } = params;
      shaderEngineWorker.onMouseMove(mouse);
      break;

    }

    case 'setBeat': {

      const { beatData } = params;
      shaderEngineWorker.shaderParams.setBeat(beatData);
      break;

    }

    case 'setParamValue': {

      const { paramName, paramValue } = params;
      shaderEngineWorker.shaderParams.setUniformValue(paramName, paramValue);
      break;

    }

    case 'enableVR': {

      // const { device } = params;
      shaderEngineWorker.enableVR();
      break;

    }

    case 'vrPresentChange': {

      const { isPresent } = params;
      shaderEngineWorker.vrPresentChange(isPresent);
      break;

    }

  }

});
