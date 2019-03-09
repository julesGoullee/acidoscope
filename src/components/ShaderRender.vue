<template>
  <div
    id="shader-container"
  />
</template>

<style scoped>
  #shader-container {
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>

<script>
  import ShaderEngine from '@/modules/ShaderEngine'
  import shader1 from '@/shaders/shader1'

  export default {
    name: 'ShaderRender',
    data: () => ({
      shaderEngine: null,
    }),
    mounted: function() {

      const container = document.getElementById( 'shader-container' );

      this.shaderEngine = new ShaderEngine(shader1, container);
      this.shaderEngine.init();
      this.shaderEngine.start();

    },
    beforeDestroy: function() {

      this.shaderEngine.stop();

    }
  }
</script>
