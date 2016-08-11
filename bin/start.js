var
  // local
  cli     = require('../cli')
;

cli()
  .then(function(eighty) {
    console.log('Eighty has started the following servers:');
    Object.keys(eighty.servers.get()).map(function(name) {
      var server = eighty.servers.get(name)
      console.log('- ' + server.name + ':' + server.listen);
    });
    console.log('Stop eighty with control + c');
  })
  .catch(function(err){
    console.log('Eighty server failed to start: ' + err);
  })
