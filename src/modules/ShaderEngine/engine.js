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
    this.startTime = Date.now();
    this.animate();

    setTimeout(() => this.test(), 2000)
  }

  stop() {
    this.running = false;
  }

  animate() {
    this.running && requestAnimationFrame( this.animate.bind(this) );
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

  /*
  testSendColor() {
   import WebMidi from 'webmidi';
   const canvas = this.renderer.domElement;
    const gl = canvas.getContext('webgl');
    const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0,0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    console.log(pixels);
    console.log(WebMidi.outputs)

    const padNumber = 36;
    const padColor = 127;
    const output = WebMidi.getOutputByName('Ableton Push 2 User Port');
    output.sendSysex([0, 33, 29], [1, 1, 10, 1]);
    output.send(144, [padNumber, padColor], 0);
  }
  */
}

function reduceArrayToObject(obj) {
  return obj.reduce((acc, it) => ({...acc, [it]: it}), {});
}
ShaderEngine.TYPES = reduceArrayToObject(['f', 'v2', 'v3']);
ShaderEngine.SPECIALS = reduceArrayToObject(['time', 'mouse', 'resolution', 'controllable']);

export default ShaderEngine;
