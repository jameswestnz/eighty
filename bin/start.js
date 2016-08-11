var
  // local
  cli     = require('../cli')
;

cli()
  .then(function(server) {
    console.log('Eighty has started the following connections:');
    server.connections.map(function(connection) {
      console.log('- ' + connection.info.uri);
    });
    console.log('Stop eighty with control + c');
  })
  .catch(function(err){
    console.log('Eighty server failed to start: ' + err);
  })
