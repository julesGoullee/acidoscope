<template>
  <div
    id="svr"
    class="shader-view"
  >
    <ShaderRender />
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

  // const NoSleep = require('nosleep');
  import ShaderRender from '@/components/ShaderRender.vue'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ShaderView',
    components: {
      ShaderRender,
    },
    data: () => ({
      isFullscreen: false,
    }),
    computed: {
      ...mapGetters([
        'visualizations'
      ]),
    },
    mounted: async function () {

      // console.log(NoSleep);
      // const noSleep = new NoSleep();
      await this.loadVisualisations();

      document.addEventListener('fullscreenchange', function enableNoSleep(){

        document.removeEventListener('click', enableNoSleep, false);
        // noSleep.enable();
        console.log(!!document.fullscreenElement);
        this.isFullscreen = !!document.fullscreenElement;

      }, false);

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
