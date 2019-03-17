const http = require('http');
const express = require('express');
const io = require('socket.io');
const Abletonlink = require('abletonlink');

const Server = {
  http: null,
  io: null,
  link: null,
  lastBeat: 0,
  async start(){

    const app = express();

    Server.http = http.createServer(app);
    Server.io = io(Server.http);
    Server.link = new Abletonlink();

    Server.io.on('connection', (client) => {

      // client.on('event', (data) => {});
      client.on('disconnect', () => {

      });

    });

    Server.link.startUpdate(100, (beat, phase, bpm) => {

      //console.log(`beat ${beat} phase ${phase} bpm ${bpm}`);

      const beatInt = Math.floor(beat);
      if((beatInt - Server.lastBeat) <= 0) return;
      Server.lastBeat = beatInt;

      const bps = bpm / 60;
      const phaseDecimal = phase - Math.floor(phase);
      const phaseMillisecond = phaseDecimal/bps;
      const beatStartTime = Date.now() - phaseMillisecond;

      Server.io.emit('beat', { bpm, bps, beat: beatInt, phase: phaseDecimal, beatStartTime});
      console.log(`new beatInt ${beatInt} beatStartTime ${beatStartTime} phaseDecimal ${phaseDecimal} bps ${bps}`);

    });

    Server.http.listen(3000, () => {

      console.log('AbletonLink proxy listen on localhost:3000');

    });

  },
  async stop(){

  }
};

module.exports = Server;
