import io from "socket.io-client";

const Link = {
  socket: null,
  init: () => {

    if(Link.socket) return;

    try {

      Link.socket = io.connect('http://localhost:3000');

    } catch (error) {

      // If not connected, wait connection then start listening
      // const unlistenStatus = Midi.listenStatus(hardwareStatus => {
      //   if(hardwareStatus.connected) {
      //     startListening();
      //     unlistenStatus();
      //   }
      // });
      // Midi.unlisteners.push(unlistenStatus); // Maybe have been unlistened previously

    }

  },
  listenStatus: (handler) => {

    if(!Link.socket){

      return;

    }

    Link.socket.on('connect', () => {

      handler(true);

    });

    Link.socket.on('disconnect', () => {

      handler(false);

    });

  },
  addListener: (handler) => {

    if(!Link.socket){

      return;

    }

    Link.socket.on('beat', handler);

    return function(){

      Link.socket.removeListener('beat');

    };

  },

};

export default Link;
