import Worker from 'worker-loader!./offscene.worker.js';
import { download, mobileCheck } from "../utils";
import WebVR from "../WebVR";

class ShaderEngineMaster {

  constructor(shader, container) {

    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.worker = new Worker();
    this.shader = shader;

    this.params = []
      .concat(this.shader.params || [])
      .reduce((acc, param) => ({
          ...acc,
          [param.name]: param,
        }),
        {}
      );

    this.beatData = {
      beatStartTime: 0,
      bps: 1,
      bpm: 60,
      beat: 0,
    };

    this.quality = mobileCheck() ? 0.6: 1;
    this.mouse = { x: 0. , y: 0. };
  }

  init() {

    this.container.appendChild(this.canvas);

    if('transferControlToOffscreen' in this.canvas){

      const offscreen = this.canvas.transferControlToOffscreen();
      this.worker.postMessage({
        type: 'init',
        params: {
          canvas: offscreen,
          shader: this.shader,
          width: this.container.clientWidth,
          height: this.container.clientHeight,
          windowRatio: window.innerWidth / window.innerHeight,
          quality: this.quality,
          mouse: this.mouse
          // pixelRatio: window.devicePixelRatio,
        }
      }, [ offscreen ] );

    } else {

      console.error('transferControlToOffscreen not supported');

    }

    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener("fullscreenchange", () => this.onWindowResize());
    document.addEventListener('mousemove', this.onMouseMove.bind(this) );
    this.handleVR();

  }

  start() {

    this.worker.postMessage({
      type: 'start'
    });

  }

  stop() {

    this.worker.postMessage({
      type: 'stop'
    });

  }

  onWindowResize() {

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.worker.postMessage({
      type: 'onWindowResize',
      params: {
        width,
        height
      }
    });

  }

  onMouseMove(event) {

    if(event.target === this.canvas){

      this.mouse.x = event.pageX - this.container.offsetLeft;
      this.mouse.y = event.pageY - this.container.offsetTop;

      this.worker.postMessage({
        type: 'onMouseMove',
        params: {
          mouse: this.mouse
        }
      });
    }

  }

  setQuality(quality) {

    this.quality = quality;
    this.worker.postMessage({
      type: 'setQuality',
      params: { quality }
    });

  }

  downloadScreenShot(){

    const dataUrl = this.canvas.toDataURL();

    download(`${this.shader.name.replace(' ', '_')}_${new Date().toISOString()}.png`, dataUrl);

  }

  setBeat(beatData) {

    this.beatData = {
      beatStartTime: beatData.beatStartTime,
      bps: beatData.bps,
      bpm: beatData.bpm,
      beat: beatData.beat,
    };
    this.worker.postMessage({
      type: 'setBeat',
      params: {
        beatData: this.beatData
      }
    });
  }

  setParamValue(paramName, paramValue){

    const param = this.params[paramName];

    if(param.range) {

      if(paramValue < param.range[0]){

        param.value = param.range[0];

      } else if(paramValue > param.range[1]){

        param.value = param.range[1];

      } else {

        param.value = paramValue;

      }

    }

    this.worker.postMessage({
      type: 'setParamValue',
      params: {
        paramName,
        paramValue: param.value
      }
    });

  }

  getParamValue(name){

    return this.params[name].value;

  }

  forParams(fn) {

    const paramNames = Object.keys(this.params);

    paramNames.forEach(paramName => fn(this.params[paramName]));

  }

  handleVR() {

    WebVR.isVRCompatible().then(devices => {

      if(devices){

        // const device = devices[0];

        const enableVR = () => {
          // this.renderer.vr.setDevice(device);
          // device.requestPresent( [ { source: this.canvas } ] );
          this.worker.postMessage({
            type: 'enableVR',
            params: {
              // device
            }
          });
        };

        const VRButton = WebVR.createButton(enableVR);
        this.container.appendChild(VRButton);

        window.addEventListener('vrdisplaypresentchange', (event) => {

          const isPresent = event.display.isPresenting;

          this.worker.postMessage({
            type: 'vrPresentChange',
            params: { isPresent }
          });

        }, false);

      }

    }).catch(console.error);

    // TODO handle device connection event

  }

}

export default ShaderEngineMaster;
