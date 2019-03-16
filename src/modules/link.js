import io from "socket.io-client";
import { EventEmitter } from 'events';

class Link extends EventEmitter {

  constructor(){

    super();
    this.socket = null;

  }

  init(){

    if(this.socket) return;

    try {

      this.socket = io.connect('http://localhost:3000');

      this.socket.on('connect', () => {

        this.emit('statusChanged', true);

      });

      this.socket.on('disconnect', () => {

        this.emit('statusChanged', false);

      });

      this.socket.on('beat', (beatData) => {

        this.emit('beat', beatData);

      });

    }

    catch(error) {

      // If not connected, wait connection then start listening
      // const unlistenStatus = Midi.listenStatus(hardwareStatus => {
      //   if(hardwareStatus.connected) {
      //     startListening();
      //     unlistenStatus();
      //   }
      // });
      // Midi.unlisteners.push(unlistenStatus); // Maybe have been unlistened previously

    }

  }


}

export default Link;
