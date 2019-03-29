<template>
  <v-container
    tag="section"
    style="padding-top: 0!important;"
    :style="[$vuetify.breakpoint.xsOnly ? { 'padding': '0!important' } : '']"
  >
    <v-card>
      <v-container>
        <v-layout justify-center>
          <img
            alt="logo"
            src="@/assets/logo-192.png"
          >
        </v-layout>
        <h2 class="headline">
          Description
        </h2>

        <v-card-text>
          <b>Acidoscope</b> is a web app that allows to display interactive visualisations.
        </v-card-text>

        <h2 class="headline">
          Keyboard shortcuts
        </h2>
        <v-card-text>
          <p>Some actions can be triggered by pressing the keyboard:</p>

          <v-layout row wrap>
            <v-flex xs12 sm6><code>Space</code> Play/Pause animation</v-flex>
            <v-flex xs12 sm6><code>C</code> Show/Hide controls in fullscreen</v-flex>
            <v-flex xs12 sm6><code>S</code> Save screenshot</v-flex>
            <v-flex xs12 sm6><code>F</code> Switch fullscreen</v-flex>
            <v-flex xs12 sm6><code>G</code> Go back to gallery</v-flex>
            <v-flex xs12 sm6><code>F</code> Go to next animation</v-flex>
          </v-layout>

        </v-card-text>

        <h2 class="headline">
          Virtual reality
        </h2>
        <v-card-text>
          You can watch the visualisation in virtual reality. Just plug your headset and a VR button will appear. We suggest using Firefox browser on desktop or Firefox Reality on autonomous devices.
        </v-card-text>

        <h2 class="headline">
          MIDI
        </h2>
        <v-card-text>
          Animation parameters can be controlled via a MIDI controller. <br>
          Just plug your device and play with the encoders. Only Ableton Push controls have been mapped yet.<br>
          Browser may request your permissions to access the hardware.
        </v-card-text>

        <h2 class="headline">
          Link
        </h2>
        <v-card-text>
          The animations can be synchronized to a tempo set by Link, available in Ableton Live and Traktor. <br>
          Please refer to the documentation on the repository for further informations.
        </v-card-text>

        <h2 class="headline">
          Download
        </h2>
        <v-card-text>
          <v-btn
            :href="link.osx"
            color="info"
          >
            OSX
              <span style="margin-left: 15px">
                <v-icon>cloud_download</v-icon>
              </span>
          </v-btn>
        </v-card-text>

        <h2 class="headline">
          Code
        </h2>
        <v-card-text>
          Made with 💜 by
          <a
            href="https://github.com/julesgoullee"
            target="_blank"
          >@julesgoullee
          </a>
          &amp;
          <a
            href="https://github.com/pakokrew"
            target="_blank"
          >
            @pakokrew
          </a>

          <br>
          We're Open Source ;)
          <a
            href="https://github.com/julesgoullee/shaders-midi"
            target="_blank"
          >https://github.com/julesgoullee/shaders-midi</a>
        </v-card-text>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>

<script>

  import Config from '@/../config';

  export default {
    name: 'AboutView',
    data: function(){
      return {
        link: {
          osx: Config.ELECTRON_APP_LINK.OSX
        }
      }
    }
  }
</script>
