const Config = require('../../config');
// const Server = require('./server');
const Server = require('./a');

Server.start({ port: Config.SERVER_PORT }).then( () => {

  console.log('Server ready');

}).catch(error => console.error(error) );
