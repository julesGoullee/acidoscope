import { throttle } from 'lodash';
import * as THREE from 'three'
import WebVR from '../../modules/WebVR';

import ShaderParams from './shaderParams';
import GlslWrapper from './glslWrapper';
import { download } from '../utils';

class ShaderEngine {

  constructor(shader, container) {

    this.shader = {
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      controllableParams: shader.params || [],
      name: shader.name
    };

    this.shaderParams = new ShaderParams(this);
    this.glslWrapper = new GlslWrapper(this);

    this.container = container;
    this.renderer = null;
    this.uniforms = {};

    this.currentTime = null;

    this.quality = 1;

    this.onWindowResize = throttle(this.onWindowResize.bind(this), 200);
  }

  init() {

    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true
    });
    this.renderer.antialias = true;
    //this.renderer.setPixelRatio( window.devicePixelRatio );

    this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0, 10 );
    this.scene = new THREE.Scene();

    this.uniforms = this.shaderParams.createUniforms();

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

    this.uniforms.resolution.value.x = this.container.innerWidth;
    this.uniforms.resolution.value.y = this.container.innerHeight;

    this.container.appendChild( this.renderer.domElement );

    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener("fullscreenchange", () => this.onWindowResize());

    this.handleVR();

  }

  start() {

    // TODO use https://threejs.org/docs/index.html#api/en/core/Clock
    this.lastTime = Date.now();
    if(this.currentTime === null) this.currentTime = 0;

    this.renderer.setAnimationLoop(this.animate.bind(this));

  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  animate() {

    const speed = this.shaderParams.getUniformValue('speed');
    const elapsed = Date.now() - this.lastTime;
    this.currentTime += speed * elapsed;
    this.lastTime = Date.now();

    this.render();

  }

  render() {

    this.shaderParams.updateSpecialUniforms();
    this.renderer.render( this.scene, this.camera );

  }

  onWindowResize() {

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width * this.quality, height * this.quality);
    this.renderer.domElement.style.width = width + 'px';
    this.renderer.domElement.style.height = height + 'px';

  }

  setQuality(quality) {
    this.quality = quality;
    this.onWindowResize();
  }

  downloadScreenShot(){

    const dataUrl = this.renderer.domElement.toDataURL();

    download(`${this.shader.name.replace(' ', '_')}_${new Date().toISOString()}.png`, dataUrl);

  }

  getShaderMaterial() {

    const vrDevice = this.renderer.vr.getDevice();
    const shaderWrapper = (vrDevice && vrDevice.isPresenting) ? 'vr' : 'image';

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.glslWrapper.getVertexShader(),
      fragmentShader: this.glslWrapper.getFragmentShader(shaderWrapper),
    });
    shaderMaterial.extensions.derivatives = true;

    return shaderMaterial;

  }

  handleVR() {

    WebVR.isVRCompatible().then(devices => {

      if(devices) {

        this.renderer.vr.enabled = true;
        this.renderer.vr.setFrameOfReferenceType( 'eye-level' ); // 'eye-level' , 'head-model' ???

        const device = devices[0];

        const enableVR = () => {
          this.renderer.vr.setDevice(device);
          device.requestPresent( [ { source: this.renderer.domElement } ] );
        };

        const VRButton = WebVR.createButton( enableVR );
        this.container.appendChild( VRButton );

        window.addEventListener('vrdisplaypresentchange', event => {

          const isVR = event.display.isPresenting;
          if(!isVR) {
            this.renderer.vr.setDevice(null);
          }
          this.shaderMesh.material = this.getShaderMaterial();

        }, false);

      }

    }).catch(console.error);

    // TODO handle device connection event

  }

}

export default ShaderEngine;
