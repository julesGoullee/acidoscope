<template>
  <v-layout
    class="gallery-container"
    justify-center
  >
    <v-flex
      xs12
    >
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="visualization in visualizationsArray"
              :key="visualization.id"
              xs6 sm4 md3
            >
              <v-card
                :to="`/shader/${visualization.id}`"
                hover
              >
                <v-img
                  :src="getShaderScreenshots(visualization.id)"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex
                        xs12
                        align-end
                        flexbox
                      >
                        <span
                          class="headline white--text"
                          :style="[$vuetify.breakpoint.xsOnly ? { 'font-size': '16px!important' } : '']"
                          v-text="visualization.name || ''"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .gallery-container {
    margin-top: 50px;
  }
</style>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Gallery',
    computed: {
      ...mapGetters([
        'visualizationsArray',
      ])
    },
    mounted: async function () {

      this.loadVisualisations();

    },
    methods: {
      ...mapActions([
        'loadVisualisations'
      ]),
      getShaderScreenshots(id) {

        try {
          return require(`@/assets/shaderScreenshots/${id}.jpg`);
        } catch(e) {
          return require(`@/assets/shaderScreenshots/default.jpg`);
        }

      }
    }
  }
</script>
