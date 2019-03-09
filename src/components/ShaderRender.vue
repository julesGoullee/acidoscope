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

  import { mapActions } from 'vuex';

  export default {
    name: 'ShaderRender',
    mounted: function() {

      const container = document.getElementById( 'shader-container' );
      this.createShaderEngine({ container });

    },
    beforeDestroy: function() {

      this.stopShaderEngine();

    },
    methods: {
      ...mapActions([
        'createShaderEngine',
        'stopShaderEngine',
      ]),
    }
  }
</script>
