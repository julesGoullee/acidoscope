const midi = require('midi');
const http = require('http');
const express = require('express');
const io = require('socket.io');
//https://github.com/justinlatimer/node-midi
// https://help.ableton.com/hc/en-us/articles/209071169-Sending-and-receiving-MIDI-messages-using-a-virtual-MIDI-network

const Server = {
  http: null,
  io: null,
  input: null,
  numPeers: 0,
  bpm: 0,
  port: null,
  async start({ port = 0 } = {}){

    const app = express();

    Server.http = http.createServer(app);
    Server.io = io(Server.http);

    Server.input = new midi.input();
    Server.input.getPortCount();

    Server.input.getPortName(0);
    Server.numPeers = 1;

    Server.io.on('connection', (client) => {

      console.log('Client connected', client.conn.remoteAddress);
      client.emit('numPeers', Server.numPeers);

      client.on('disconnect', () => {

        console.log('Client disconnected', client.conn.remoteAddress);

      });
/*
20 -> 120bpm =
40 -> 60bpm =
8-> 20bpm (0.33bps) =
1 -> 20 / 120 = 0,1666666667
 */
    });
    let count = 0;
    setInterval(( ) => {
      console.log('beat', count);
      count = 0;
    }, 1000);

    Server.input.on('message', (deltaTime, message) => {

      if(!Server.startDate && Server.lastTime){

        Server.startDate = Date.now();

      }

      count++;
      const now = Date.now();
      console.log(now - Server.lastTime, deltaTime, deltaTime / 4);

      if(Server.lastTime){

        Server.bpm = 4 / deltaTime * 60 / 100;
        const bps = Server.bpm / 60;
        const phaseMillisecond = deltaTime / bps;
        const beatStartTime = Date.now() - phaseMillisecond;

        // Server.io.emit('beat', { bpm: Server.bpm, bps, beatStartTime: beatStartTime });
        // console.log(` beatStartTime ${beatStartTime} phaseDecimal ${phaseMillisecond} bps ${bps} bpm ${Server.bpm}`);


      }

      Server.lastTime = now;

    });

    Server.input.openPort(0);
    Server.input.ignoreTypes(false, false, false);

    return new Promise((resolve) => {

      Server.http.listen(port, () => {

        Server.port = Server.http.address().port;
        console.log(`Midi proxy listen on localhost:${Server.port}`);
        resolve();

      });

    });


  },
  async stop(){

    Server.input.closePort();

  }
};

module.exports = Server;
