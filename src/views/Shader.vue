<template>
  <v-container
    class="shader-view"
  >
    <v-flex
      class="shader-container"
      xs12
    >
      <ShaderRender />
    </v-flex>

    <ShaderControl />
    <ShaderParams />

  </v-container>
</template>

<style scoped>
  .shader-view{
  }
  .shader-container {
    height: 400px;
    z-index: 0;
    position: relative;
  }
</style>

<script>

  import ShaderControl from '@/components/ShaderControl.vue'
  import ShaderRender from '@/components/ShaderRender.vue'
  import ShaderParams from '@/components/ShaderParams.vue';

  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
      ShaderControl,
    },
  }
</script>
