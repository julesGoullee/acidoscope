<template>
  <div class="shader-view" id="svr">
    <ShaderRender />
    <div v-if="!isFullscreen" class="fsbtn" v-on:click="fullscreen">
      FS
    </div>
  </div>
</template>

<style scoped>
  .shader-view {
    width: 500px;
    height: 500px;
    z-index: 0;
    position: relative;
  }
  .fsbtn{
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: white;
    border: 1px solid black;
    border-radius: 15px;
    width: 30px;
    height: 30px;
    z-index: 255;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
</style>

<script>

  import ShaderRender from '@/components/ShaderRender.vue'

  export default {
    name: 'Shader',
    components: {
      ShaderRender
    },
    data: () => ({
      isFullscreen: false,
    }),
    methods: {
      fullscreen: function () {

        this.isFullscreen = true;
        const el = document.getElementById('svr');

        if(el.requestFullscreen) {
          el.requestFullscreen();
        }

      },
    },
    mounted: async function() {

      document.addEventListener("fullscreenchange", () => {
        console.log(!!document.fullscreenElement);
        this.isFullscreen = !!document.fullscreenElement;
      });
      
    },
  }

</script>
