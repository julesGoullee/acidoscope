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
    <v-container>
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex xs6>
          <v-btn
            raised
            block
            color="info"
            @click="switchFullscreen"
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
        <v-flex xs6>
          <v-btn
            raised
            block
            :color="shaderRunning ? 'success' : 'error'"
            @click="pauseShader"
          >
            {{ shaderRunning ? 'Play' : 'Pause' }}
            <v-icon
              right
              dark
            >
              {{ shaderRunning ? 'play_arrow' : 'pause' }}
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
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

  import ShaderRender from '@/components/ShaderRender.vue'
  import ShaderParams from '@/components/ShaderParams.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
    },
    computed: {
      ...mapGetters([
        'shaderRunning',
      ])
    },
    methods: {
      ...mapActions([
        'switchFullscreen',
        'pauseShader',
      ]),
    }
  }
</script>
