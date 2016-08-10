var
  // local
  cli     = require('../cli')
;

cli()
  .then(function(server) {
    console.log('Eighty has started on:', server.info.uri)
    console.log('Stop eighty with control + c')
  })
  .catch(function(err){
    console.log('Eighty server failed to start: ' + err)
  })
