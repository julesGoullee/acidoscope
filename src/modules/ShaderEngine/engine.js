import * as THREE from 'three'

import ShaderParams from './shaderParams';
import DefaultVertex from './defaultVertex.glsl';

class ShaderEngine {

  constructor(shader, container) {

    this.shader = {
      vertexShader: shader.vertexShader || DefaultVertex,
      fragmentShader: shader.fragmentShader,
      initialParams: shader.params || {},
    };

    this.shaderParams = new ShaderParams(this);

    this.container = container;
    this.renderer = null;
    this.uniforms = {};
    this.three = {};

    this.currentTime = null;
    this.running = false;

  }

  init() {

    const { vertexShader, fragmentShader } = this.shader;

    this.three.camera = new THREE.PerspectiveCamera();
    this.three.camera.position.z = 1;

    this.three.scene = new THREE.Scene();

    this.uniforms = this.shaderParams.createUniforms();

    const material = new THREE.ShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), material );
    this.three.scene.add( mesh );

    this.renderer = new THREE.WebGLRenderer();
    this.container.appendChild( this.renderer.domElement );

    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.uniforms.resolution.value.x = width;
    this.uniforms.resolution.value.y = height;
    this.renderer.setSize( width, height );

  }

  start() {
    this.running = true;

    this.lastTime = Date.now();
    if(this.currentTime === null) this.currentTime = 0;

    this.animate();
  }

  stop() {
    this.running = false;
  }

  animate() {
    this.running && requestAnimationFrame( this.animate.bind(this) );
    const speed = this.shaderParams.initialParams['speed'] ? this.shaderParams.getUniformValue('speed') : 1.;
    this.currentTime += speed * (Date.now() - this.lastTime);
    this.lastTime = Date.now();
    this.render();
  }

  updateCanvas() {
    const canvas = this.renderer.domElement;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      this.renderer.setSize(width, height, true);
      //this.three.camera.aspect = width / height;
      //this.three.camera.updateProjectionMatrix();
    }
  }

  render() {

    this.updateCanvas();
    this.shaderParams.updateSpecialUniforms();
    this.renderer.render( this.three.scene, this.three.camera );

  }

}

function reduceArrayToObject(obj) {
  return obj.reduce((acc, it) => ({...acc, [it]: it}), {});
}
ShaderEngine.TYPES = reduceArrayToObject(['f', 'v2', 'v3']);
ShaderEngine.SPECIALS = reduceArrayToObject(['time', 'mouse', 'resolution', 'controllable']);

export default ShaderEngine;
