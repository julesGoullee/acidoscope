import ShaderEngineWorker from './engineWorker.js';

let shaderEngineWorker = null;

function workerHandler({ data }){

  const { type, params } = data;

  switch(type){

    case 'init': {

      const { shader, canvas, windowRatio, width, height, quality, mouse } = params;
      shaderEngineWorker = new ShaderEngineWorker(shader, canvas, windowRatio, width, height, quality, mouse);
      shaderEngineWorker.init();
      break;
    }

    case 'start': {

      if(!shaderEngineWorker){ return; }

      shaderEngineWorker.start();
      break;
    }

    case 'stop': {

      if(!shaderEngineWorker){ return; }

      shaderEngineWorker.stop();
      break;
    }

    case 'onWindowResize': {

      if(!shaderEngineWorker){ return; }

      const { width, height } = params;
      shaderEngineWorker.setWindowSize(width, height);
      shaderEngineWorker.onWindowResize();
      break;
    }

    case 'setQuality': {

      if(!shaderEngineWorker){ return; }

      const { quality } = params;
      shaderEngineWorker.setQuality(quality);
      break;
    }

    case 'onMouseMove': {

      if(!shaderEngineWorker){ return; }

      const { mouse } = params;
      shaderEngineWorker.onMouseMove(mouse);
      break;
    }

    case 'setBeat': {

      if(!shaderEngineWorker){ return; }

      const { beatData } = params;
      shaderEngineWorker.shaderParams.setBeat(beatData);
      break;
    }

    case 'setParamValue': {

      if(!shaderEngineWorker){ return; }

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

      if(!shaderEngineWorker){ return; }

      const { isPresent } = params;
      shaderEngineWorker.vrPresentChange(isPresent);
      break;
    }

  }

}

export default workerHandler;
