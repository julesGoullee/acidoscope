const Server = require('./server');

Server.start().then( () => {

  console.log('Server ready');

}).catch(error => console.error(error) );
