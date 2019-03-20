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
      wrapper: shader.wrapper,
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

    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.uniforms = this.shaderParams.createUniforms();

    const material = new THREE.ShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader: this.glslWrapper.getVertexShader(),
      fragmentShader: this.glslWrapper.getFragmentShader(),
    });

    material.extensions.derivatives = true;

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), material );
    this.scene.add( mesh );

    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true
    });
    this.renderer.antialias = true;
    // this.renderer.setPixelRatio( window.devicePixelRatio );

    const width = this.container.innerWidth;
    const height = this.container.innerHeight;
    this.uniforms.resolution.value.x = width;
    this.uniforms.resolution.value.y = height;

    this.container.appendChild( this.renderer.domElement );

    this.onWindowResize();
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener("fullscreenchange", () => this.onWindowResize());

    WebVR.isVRCompatible().then(compatible => {
      if(compatible) {
        WebVR.setupRenderer(this.renderer);
        const VRButton = WebVR.createButton( this.renderer );
        this.container.appendChild( VRButton );
      }
    }).catch(console.error);

  }

  start() {

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

}

export default ShaderEngine;
