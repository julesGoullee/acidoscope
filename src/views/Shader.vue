<template>
  <v-layout
    class="shader-view"
    align-center
    justify-start
    column
  >
    <div
      id="fullscreen-renderer"
      class="shader-container"
    >
      <ShaderRender />
    </div>
    <v-layout
      row
      wrap
    >
      <v-flex>
        <v-btn
          raised
          block
          color="info"
          @click="fullscreen"
        >
          Fullscreen
          <v-icon
            right
            dark
          >
            fullscreen
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn
          raised
          block
          color="success"
          @click="fullscreen"
        >
          VR
          <v-icon
            right
            dark
          >
            headset
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <ShaderParams />
  </v-layout>
</template>

<style scoped>
  .shader-view {
    padding: 50px;
  }
  .shader-container {
    width: 80%;
    height: 400px;
    z-index: 0;
    position: relative;
  }
</style>

<script>

  import ShaderRender from '@/components/ShaderRender.vue'
  import ShaderParams from '@/components/ShaderParams.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
    },
    data: () => ({
      isFullscreen: false,
    }),
    mounted: async function () {

      // console.log(NoSleep);
      // const noSleep = new NoSleep();

      document.addEventListener('fullscreenchange', function onFullScreenChange(){

        //document.removeEventListener('click', onFullScreenChange, false);
        // noSleep.enable();
        this.isFullscreen = !!document.fullscreenElement;

      }, false);

    },
    methods: {
      ...mapActions(['loadVisualisations']),
      fullscreen: function () {

        const el = document.getElementById('fullscreen-renderer');
        if(el.requestFullscreen) {
          el.requestFullscreen();
        }

      },
    }
  }
</script>
