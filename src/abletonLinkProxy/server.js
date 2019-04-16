const http = require('http');
const express = require('express');
const io = require('socket.io');
const Abletonlink = require('abletonlink');
//https://github.com/justinlatimer/node-midi
//https://help.ableton.com/hc/en-us/articles/209071169-Sending-and-receiving-MIDI-messages-using-a-virtual-MIDI-network

const Server = {
  http: null,
  io: null,
  link: null,
  lastBeat: 0,
  numPeers: 0,
  port: null,
  async start({ port = 0 } = {}){

    const app = express();

    Server.http = http.createServer(app);
    Server.io = io(Server.http);

    Server.link = new Abletonlink(0, 4.0, true);

    Server.io.on('connection', (client) => {

      console.log('Client connected', client.conn.remoteAddress);
      client.emit('numPeers', Server.numPeers);

      client.on('disconnect', () => {

        console.log('Client disconnected', client.conn.remoteAddress);

      });

    });

    Server.link.on('numPeers', (numPeers) => {

      Server.numPeers = numPeers;
      console.log('NumPeers', numPeers);
      Server.io.emit('numPeers', Server.numPeers);

    });

    Server.link.startUpdate(100, (beat, phase, bpm) => {
/*
beat 72.005376 phase 0.005376 bpm 98.99993565004183
New beatInt 72 beatStartTime 1555421384238.9968 phaseDecimal 0.005376 bps 1.6499989275006972
beat 72.171387 phase 0.171387 bpm 98.99993565004183
beat 72.342786 phase 0.342786 bpm 98.99993565004183
beat 72.507431 phase 0.507431 bpm 98.99993565004183
beat 72.675642 phase 0.675642 bpm 98.99993565004183
beat 72.849205 phase 0.849205 bpm 98.99993565004183
beat 73.02043 phase 1.02043 bpm 98.99993565004183
New beatInt 73 beatStartTime 1555421384853.9875 phaseDecimal 0.020429999999999948 bps 1.6499989275006972
beat 73.192905 phase 1.192905 bpm 98.99993565004183
beat 73.36796 phase 1.36796 bpm 98.99993565004183
beat 73.541431 phase 1.541431 bpm 98.99993565004183
beat 73.709896 phase 1.709896 bpm 98.99993565004183
beat 73.88331 phase 1.88331 bpm 98.99993565004183
beat 74.057582 phase 2.057582 bpm 98.99993565004183
New beatInt 74 beatStartTime 1555421385481.965 phaseDecimal 0.05758200000000002 bps 1.6499989275006972
beat 74.23095 phase 2.23095 bpm 98.99993565004183

 */
      console.log(`beat ${beat} phase ${phase} bpm ${bpm}`);

      const beatInt = Math.floor(beat);
      if((beatInt - Server.lastBeat) <= 0) return;
      Server.lastBeat = beatInt;

      const bps = bpm / 60;
      const phaseDecimal = phase - Math.floor(phase);
      const phaseMillisecond = phaseDecimal/bps;
      const beatStartTime = Date.now() - phaseMillisecond;

      if(Server.numPeers > 0){

        Server.io.emit('beat', { bpm, bps, beat: beatInt, phase: phaseDecimal, beatStartTime});
        console.log(`New beatInt ${beatInt} beatStartTime ${beatStartTime} phaseDecimal ${phaseDecimal} bps ${bps}`);

      }

    });

    return new Promise((resolve) => {

      Server.http.listen(port, () => {

        Server.port = Server.http.address().port;
        console.log(`AbletonLink proxy listen on localhost:${Server.port}`);
        resolve();

      });

    });


  },
  async stop(){

  }
};

module.exports = Server;
