<template>
  <div>
    Coucou midi
    <div v-if="event !== null">
      <ul>
        <li>channel: {{ event.channel }} </li>
        <li>type: {{ event.type }} </li>
        <li>value: {{ event.value }} </li>
        <li>
          <ul>
            <li>controller:</li>
            <li>id: {{ event.controller.id }} </li>
            <li>name: {{ event.controller.name }} </li>
          </ul>
          <ul>
            <li>input:</li>
            <li>id: {{ event.input.id }}</li>
            <li>name: { {event.input.name }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import Midi from '../modules/helpers/midi'

  export default {

    name: 'MidiLoader',
    data: function () {
      return {
        event: null
      };
    },
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
      ]),
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

        if(event.value === 1){

          this.setMidiValue({ entry: 'caca1', value: 'down' });

        } else if(event.value === 127){

          this.setMidiValue({ entry: 'caca1', value: 'up' });

        }

      });

    },
    methods: {
      ...mapActions(['setMidiValue']),
    }
  }

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
