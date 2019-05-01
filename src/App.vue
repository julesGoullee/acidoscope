<template>
  <v-app
    id="app"
    dark
  >
    <v-container
      grid-list-md
      justify-space-between
      :style="[$vuetify.breakpoint.xsOnly ? { 'padding': '10px 0px!important' } : '']"
    >
      <Header />
      <v-flex
        :style="[$vuetify.breakpoint.xsOnly ? { 'padding': '10px 0px!important' } : '']"
      >
        <router-view />
      </v-flex>
    </v-container>
  </v-app>
</template>
<script>

  import Header from '@/components/Header'

  import {
    VApp,
  } from 'vuetify/lib'
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    components: {
      VApp,
      Header,
    },
    mounted: async function () {

      this.initMidi().catch(console.error);
      this.initLink().catch(console.error);
      this.initActionBridge();

    },
    methods: {
      ...mapActions([
        'initMidi',
        'initLink',
        'initActionBridge',
      ])
    }
  };

</script>
<style>
  body {
    margin: 0;
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    color: #E8F0E8;
    background-color: #101510;
  }
  .v-sheet {
    background-color: #171A00 !important;
  }
  a {
    color: #b393f9;
    text-decoration: none;
  }
</style>
