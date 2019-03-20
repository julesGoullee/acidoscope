<template>
  <v-container style="padding:5px 16px">
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex xs12 sm6 md3>
        <v-btn
          raised
          block
          color="accent"
          @click="switchFullscreen"
          :small="$vuetify.breakpoint.xsOnly"
          :class="{'btn-small': $vuetify.breakpoint.smAndDown}"
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
      <v-flex xs12 sm6 md3>
        <v-btn
          raised
          block
          :color="shaderRunning ? 'success' : 'error'"
          @click="pauseShader"
          :small="$vuetify.breakpoint.xsOnly"
          :class="{'btn-small': $vuetify.breakpoint.smAndDown}"
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
      <v-flex xs12 sm6 md3>
        <v-btn
          raised
          block
          @click="takeScreenShot"
          :small="$vuetify.breakpoint.xsOnly"
          :class="{'btn-small': $vuetify.breakpoint.smAndDown}"
        >
          Save
          <v-icon
            right
            dark
          >
            camera_alt
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              block
              dark
              v-on="on"
              :small="$vuetify.breakpoint.xsOnly"
              :class="{'btn-small': $vuetify.breakpoint.smAndDown}"
            >
              {{
              (qualities.find(q => q.value === quality) || {name: 'Custom quality'}).name
              }}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in qualities"
              :key="index"
              @click="() => setQuality(item.value)"
            >
              <v-list-tile-title>
                <v-layout align-content-space-between>
                  <v-flex>
                    {{ item.name }}
                  </v-flex>
                  <v-flex shrink>
                    <v-icon
                      v-if="quality === item.value"
                      color="success"
                    >
                      check_circle
                    </v-icon>
                  </v-flex>
                </v-layout>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .btn-small {
    margin-bottom: 0!important;
    font-size: 10px;
  }
</style>

<script>

  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ShaderControl',
    data: () => ({
      qualities: [
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
      ],
    }),
    computed: {
      ...mapGetters([
        'shaderRunning',
        'quality',
      ]),
    },
    methods: {
      ...mapActions([
        'switchFullscreen',
        'pauseShader',
        'takeScreenShot',
        'setQuality',
      ]),
    },
  }
</script>
