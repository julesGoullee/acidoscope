<template>
  <v-app
    id="app"
    dark
  >
    <v-container
      grid-list-md
      justify-space-between
    >
      <Header />
      <v-container class="view-container">
        <router-view />
      </v-container>
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

      await this.initMidi();
      await this.initLink();

    },
    methods: {
      ...mapActions([
        'initMidi',
        'initLink',
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
    background-color: #011600;
  }
  .v-sheet {
    background-color: #171A00 !important;
  }
  .view-container{
    padding-top: 50px;
  }
</style>
