const path = require('path');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

const abletonlink = require('abletonlink');
const link = new abletonlink();

( () => {
  let lastBeat = 0;
  let isWaiting = false;

  link.startUpdate(100, (beat, phase, bpm) => {
    console.log(`beat ${beat} phase ${phase} bpm ${bpm}`);

    const beatInt = 0 ^ beat;
    if(isWaiting ||  (beatInt - lastBeat) <= 0) return;

    const beatDecimals = beat - beatInt;


    console.log(beatDecimals);
    const waitBeat = 1 - beatDecimals;
    const wait = bpm/60/waitBeat;
    lastBeat = beatInt;
    // console.log(`new beat ${beatInt} decimals ${beatDecimals}, ${wait}, ${bpm}, ${beatInt + 1}`);

    // isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
      io.emit('beat', { bpm, beat: beatInt + 1, phase, beatStartTime: Date.now()});
    }, wait * 1000)
  });

})();

server.listen(3000, () => {
  console.log("**** listen on localhost:3000 ****");
  console.log("access to http://localhost:3000/ !!");
});
