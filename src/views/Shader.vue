<template>
  <div
    id="svr"
    class="shader-view"
  >
    <ShaderRender v-if="selectedVisualization" />
    <div
      v-if="!isFullscreen"
      id="fsbtn"
      @click="fullscreen"
    >
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
  #fsbtn{
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Shader',
    components: {
      ShaderRender,
    },
    data: () => ({
      isFullscreen: false,
    }),
    computed: {
      ...mapGetters([
        'selectedVisualization',
        'visualizations'
      ]),
    },
    mounted: async function () {

      if(this.visualizations.length === 0){
        await this.loadVisualisations();
      }

      document.addEventListener('fullscreenchange', () => {
        console.log(!!document.fullscreenElement);
        this.isFullscreen = !!document.fullscreenElement;
      });

    },
    methods: {
      ...mapActions(['loadVisualisations']),
      fullscreen: function () {

        this.isFullscreen = true;
        const el = document.getElementById('svr');

        if(el.requestFullscreen) {
          el.requestFullscreen();
        }

      },
    }
  }
</script>
