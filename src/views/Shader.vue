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
        <v-flex xs4>
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
        <v-flex xs4>
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
        <v-flex xs4>
          <v-select
            :items="items"
            v-model="quality"
            label="Quality"
            solo
          ></v-select>
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

  const qualities = [
    {
      name: 'Normal quality',
      value: 1,
    },
    {
      name: 'Low quality',
      value: 0.6,
    },
    {
      name: 'Very low quality',
      value: 0.4,
    },
    {
      name: 'Very high quality',
      value: 2,
    },
    {
      name: 'Dope',
      value: 4,
    },
  ];
  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
    },
    computed: {
      ...mapGetters([
        'shaderRunning',
      ]),
      quality: {
        get () {
          return this.$store.state.shader.shaderEngine ?
            qualities.find(q => q.value === this.$store.state.shader.shaderEngine.value)
            : 1;
        },
        set (value) {
          const quality = qualities.find(q => q.name === value);
          this.$store.commit('setQuality', quality.value)
        }
      },
    },
    methods: {
      ...mapActions([
        'switchFullscreen',
        'pauseShader',
      ]),
    },
    data: () => ({
      items: qualities.map(q => q.name),
    }),
  }
</script>
