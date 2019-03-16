<template>
  <v-app id="app" dark>
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
              v-if="$route.name === 'shader'"
              to="/"
              color="info"
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
          >
            <span class="app-name">
              LittleShaderDimension
            </span>
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
    height: 100%;
    color: #E8F0E8;
    background-color: #011600;
  }
  .v-sheet {
    background-color: #171A00 !important;
  }
  .app-name {
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 15px;
    cursor: default;
  }
  .view-container{
    padding-top: 50px;
  }
</style>
