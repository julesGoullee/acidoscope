<template>
  <v-container
    grid-list-md
  >
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex
        v-for="param in paramsList"
        :key="param.name"
        xs2
      >
        <v-layout column text-xs-center>
            <CircularSlider
              :paramName="param.name"
              :paramValue="getParamValue(param.name)"
              :paramRangeStart="param.range[0]"
              :paramRangeEnd="param.range[1]"
              :onChange="onControlChange"
            />
            {{ param.name }}
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CircularSlider from '@/components/CircularSlider.vue'

  export default {
    name: 'ShaderParams',
    components: {
      CircularSlider
    },
    computed: {
      ...mapGetters([
        'paramsList',
        'getParamValue',
      ]),
    },
    methods: {
      ...mapActions([
        'loadVisualisations',
        'changeParamValue'
      ]),
      fullscreen: function () {

        const el = document.getElementById('fullscreen-renderer');
        if(el.requestFullscreen) {
          el.requestFullscreen();
        }
      },
      onControlChange: function(paramName, value){

        this.changeParamValue({
          paramName,
          action: 'value',
          value
        });

      }
    }
  };

</script>
