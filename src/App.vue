<template>
  <v-app id="app">
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
  import Loaders from '@/components/Loaders.vue';
  
  import {
    VApp,
  } from 'vuetify/lib'
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    components: {
      VApp,
      Header,
      Loaders,
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
    color: #2c3e50;
    height: 100%;
  }
  .view-container{
    padding-top: 50px;
  }
</style>
