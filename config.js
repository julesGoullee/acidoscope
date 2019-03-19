let SERVER_PORT = process.env.SERVER_PORT || process.env.VUE_APP_SERVER_PORT || '3000';

if(process && process.type === 'renderer'){

  const electron = require('electron');
  SERVER_PORT = electron.remote.getCurrentWindow().SERVER_PORT;

}

const Config = {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  SERVER_HOST: process.env.VUE_APP_SERVER_HOST || 'http://localhost',
  SERVER_PORT: SERVER_PORT || process.env.VUE_APP_SERVER_PORT || '3000',
  GA_ID: process.env.GA_ID || process.env.VUE_APP_GA_ID || null,
};

module.exports = Config;
