const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(client){
  // client.on('event', function(data){});
  client.on('disconnect', function(){});
});

const abletonlink = require('abletonlink');
const link = new abletonlink();

( () => {
  let lastBeat = 0;

  link.startUpdate(100, (beat, phase, bpm) => {

    //console.log(`beat ${beat} phase ${phase} bpm ${bpm}`);

    const beatInt = Math.floor(beat);
    if((beatInt - lastBeat) <= 0) return;
    lastBeat = beatInt;

    const bps = bpm/60;
    const phaseDecimal = phase - Math.floor(phase);
    const phaseMillisecond = phaseDecimal/bps;
    const beatStartTime = Date.now() - phaseMillisecond;

    io.emit('beat', { bps, beat: beatInt, phase: phaseDecimal, beatStartTime});
    console.log(`new beatInt ${beatInt} beatStartTime ${beatStartTime} phaseDecimal ${phaseDecimal} bps ${bps}`);

  });

})();

server.listen(3000, () => {
  console.log("**** listen on localhost:3000 ****");
  console.log("access to http://localhost:3000/ !!");
});
