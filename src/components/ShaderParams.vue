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
        xs6 sm4 md2
      >
        <v-layout
          column
          text-xs-center
        >
          <CircularSlider
            :param-name="param.name"
            :param-value="getParamValue(param.name)"
            :param-range-start="param.range[0]"
            :param-range-end="param.range[1]"
            :on-change="onControlChange"
          />
          <span
            class="text-capitalize"
          >{{ param.name }}</span>
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
