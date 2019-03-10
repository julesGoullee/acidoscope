<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="param in paramsList"
        :key="param.name"
        xs1
      >
        <v-card
          dark
          color="secondary"
        >
          <v-layout column>
            <v-flex>
              <v-card-text
                class="px-0"
              >
                {{ param.name }}
              </v-card-text>
            </v-flex>
            <v-flex>
              <v-card-text
                class="px-0"
              >
                {{ getParamValue(param.name) }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ShaderParams',
    computed: {
      ...mapGetters([
        'paramsList',
        'getParamValue',
      ]),
    },

  };

</script>
