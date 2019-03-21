import { throttle } from 'lodash';
import * as THREE from 'three'
import WebVR from '../../modules/WebVR';

import ShaderParams from './shaderParams';
import GlslWrapper from './glslWrapper';

class ShaderEngineWorker {

  constructor(shader, canvas, windowRatio, width, height, quality) {

    this.shader = {
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      controllableParams: shader.params || [],
      name: shader.name
    };

    this.windowRatio = windowRatio;
    this.width = width;
    this.height = height;
    this.shaderParams = new ShaderParams(this);
    this.glslWrapper = new GlslWrapper(this);

    this.canvas = canvas;
    this.renderer = null;

    this.running = false;
    this.currentTime = null;

    this.quality = quality;

    this.onWindowResize = throttle(this.onWindowResize.bind(this), 200);
  }

  init() {

    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true,
      canvas: this.canvas
    });
    //this.renderer.setPixelRatio( window.devicePixelRatio );

    this.camera = new THREE.PerspectiveCamera( 30, this.windowRatio, 0, 10 );
    this.scene = new THREE.Scene();

    this.shaderParams.createUniforms();

    const planeGeometry = new THREE.PlaneBufferGeometry( 2, 2 );
    const shaderMaterial = this.getShaderMaterial();

    this.shaderMesh = new THREE.Mesh( planeGeometry, shaderMaterial );
    this.shaderMesh.position.z = -2;
    this.scene.add( this.shaderMesh );

    /*
    // 3D testing mesh
    const basicMaterial = new THREE.MeshBasicMaterial( { color: 0xfc1100 } );
    const cubeGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.cubeMesh = new THREE.Mesh( cubeGeometry, basicMaterial );
    this.cubeMesh.position.z = -1;
    this.cubeMesh.rotation.y = 0.3;
    this.cubeMesh.rotation.z = 0.4;
    this.scene.add( this.cubeMesh );
    */

    this.shaderParams.uniforms.resolution.value.x = this.width;
    this.shaderParams.uniforms.resolution.value.y = this.height;

    this.handleVR();

  }

  start() {

    // TODO use https://threejs.org/docs/index.html#api/en/core/Clock
    this.lastTime = Date.now();
    if(this.currentTime === null) this.currentTime = 0;
    this.running = true;
    this.animate();

  }

  stop() {

    this.running = false;

  }

  animate() {

    const speed = this.shaderParams.getUniformValue('speed');
    const elapsed = Date.now() - this.lastTime;
    this.currentTime += speed * elapsed;
    this.lastTime = Date.now();

    this.render();

    if(this.running){

      self.requestAnimationFrame(this.animate.bind(this) );

    }

  }

  render() {

    this.shaderParams.updateSpecialUniforms();
    this.renderer.render( this.scene, this.camera );

  }

  onWindowResize(){

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width * this.quality, this.height * this.quality, false);

  }

  setQuality(quality) {
    this.quality = quality;
    this.onWindowResize();
  }

  getShaderMaterial() {

    const vrDevice = this.renderer.vr.getDevice();
    const shaderWrapper = (vrDevice && vrDevice.isPresenting) ? 'vr' : 'image';

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.shaderParams.uniforms,
      vertexShader: this.glslWrapper.getVertexShader(),
      fragmentShader: this.glslWrapper.getFragmentShader(shaderWrapper),
    });
    shaderMaterial.extensions.derivatives = true;

    return shaderMaterial;

  }

  enableVR(device){

    this.renderer.vr.setDevice(device);
    device.requestPresent( [ { source: this.canvas } ] );

  }

  vrPresentChange(isPresent){

    if(!isPresent){

      this.renderer.vr.setDevice(null);

    }

    this.shaderMesh.material = this.getShaderMaterial();

  }

  handleVR() {

    WebVR.isVRCompatible().then(devices => {

      if(devices){

        this.renderer.vr.enabled = true;
        this.renderer.vr.setFrameOfReferenceType( 'eye-level' ); // 'eye-level' , 'head-model' ???

      }

    }).catch(console.error);

    // TODO handle device connection event

  }

}

export default ShaderEngineWorker;