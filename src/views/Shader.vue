<template>
  <div class="home" id="shader-container" />
</template>

<script>
  import ShaderEngine from '@/modules/ShaderEngine'
  import shader1 from '@/shaders/shader1'


  export default {
    name: 'Home',
    data: () => ({
      shaderEngine: null,
    }),
    mounted: async function() {

      const container = document.getElementById( 'shader-container' );

      this.shaderEngine = new ShaderEngine(shader1, container);
      this.shaderEngine.init();
      this.shaderEngine.start();

    },
    beforeDestroy: async function() {

      this.shaderEngine.stop();

    },
  }
</script>
