<template>
  <div>
    Coucou midi
    <div v-if="event !== null">

      <ul>

        <li>channel: {{event.channel}}</li>
        <li>type: {{event.type}}</li>
        <li>value: {{event.value}}</li>
        <li>controller:</li>
        <ul>
          <li>id: {{event.controller.id}}</li>
          <li>name: {{event.controller.name}}</li>
        </ul>
        <li>input:</li>
        <ul>
          <li>id: {{event.input.id}}</li>
          <li>name: {{event.input.name}}</li>
        </ul>

      </ul>
    </div>


  </div>
</template>

<script>

  import Midi from '../modules/helpers/midi'

  export default {

    name: 'MidiLoader',
    data: function () {
      return {
        event: null
      };
    },
    mounted: async function () {

      if(!Midi.isSupported() ){

        throw new Error('WebMIDI is not supported in this browser.')

      }

      const access = await Midi.requestAccess();

      if(!Midi.isConnected(access) ){

        throw new Error('No input detected')

      }

      Midi.onEvent( (event) => {

        this.event = event;

      });

    }

  }

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
