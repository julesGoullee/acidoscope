<template>
  <v-app id="app">
    <v-container
      grid-list-md
      justify-space-between
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs3>
          <v-container
            justify-start
            fill-height
            align-center
          >
            <v-btn
              color="#d6a8f3"
              to="/"
            >
              <v-icon
                left
                dark
              >
                apps
              </v-icon>
              Gallery
            </v-btn>
          </v-container>
        </v-flex>
        <v-flex xs6>
          <v-container
            justify-center
            fill-height
            align-center
            to="/about"
          >
            <v-btn
              to="/about"
              class="app-name"
              flat
            >
              LittleShaderDimension
            </v-btn>
          </v-container>
        </v-flex>
        <v-flex xs3>
          <Loaders />
        </v-flex>
      </v-layout>
      <v-container class="view-container">
        <router-view />
      </v-container>
    </v-container>
  </v-app>
</template>
<script>

  import Loaders from '@/components/Loaders.vue';
  import {
    VApp,
  } from 'vuetify/lib'

  export default {
    name: 'App',
    components: {
      VApp,
      Loaders: Loaders
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
  .app-name {
    font-size: 1.8rem;
    font-weight: 500;
    color: #706a73;
    margin-top: 15px;
    cursor: default;
    text-transform: none;
  }
  .view-container{
    padding-top: 50px;
  }
</style>
