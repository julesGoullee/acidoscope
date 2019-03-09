import * as THREE from 'three'

class ShaderEngine {

  constructor(shader, container) {

    this.shader = {
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    };

    this.container = container;
    this.renderer = null;
    this.uniforms = {};
    this.three = {};

    this.running = false;

  }

  init() {

    const { vertexShader, fragmentShader } = this.shader;

    this.three.camera = new THREE.Camera();
    this.three.camera.position.z = 1;

    this.three.scene = new THREE.Scene();

    this.uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), material );
    this.three.scene.add( mesh );

    this.renderer = new THREE.WebGLRenderer();
    this.container.appendChild( this.renderer.domElement );

    this.uniforms.resolution.value.x = window.innerWidth * 2;
    this.uniforms.resolution.value.y = window.innerHeight * 2;
    this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.animate();
  }

  stop() {
    this.running = false;
  }

  animate() {
    this.running && requestAnimationFrame( this.animate.bind(this) );
    this.render();
  }

  render() {

    const elapsedMilliseconds = Date.now() - this.startTime;
    const elapsedSeconds = elapsedMilliseconds / 1000.;

    this.uniforms.time.value = elapsedSeconds;
    this.renderer.render( this.three.scene, this.three.camera );

  }

}

export default ShaderEngine;
