import io from "socket.io-client";

const Link = {
  isConnected: false,
  unlisteners: [],
  socket: null,
  init: () => {

    try {

      Link.socket = io.connect('http://192.168.1.3:3000');

    } catch (error) {

      debugger;

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

    Link.socket.on('beat', (data) => {

      handler({
        paramName: 'beat',
        value: event.beat,
      });

      handler({
        paramName: 'beatStartTime',
        value: data.beatStartTime,
      });

      handler({
        paramName: 'speed',
        value: data.bps,
      });

    });

    return function(){

      Link.socket.removeListener('beat');

    };

  },

};

export default Link;
