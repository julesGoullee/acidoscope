// let SERVER_PORT = process.env.SERVER_PORT || process.env.VUE_APP_SERVER_PORT || '3000';
//
// if(process && process.type === 'renderer'){
//
//   const electron = require('electron');
//   SERVER_PORT = electron.remote.getCurrentWindow().SERVER_PORT;
//
// }

const Config = {
  SERVER_HOST: process.env.VUE_APP_SERVER_HOST || 'http://localhost',
  SERVER_PORT: 3000,
};

module.exports = Config;
