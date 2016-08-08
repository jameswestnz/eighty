var
  // local
  cli     = require('../cli')
;

cli(function (error, server) {
  if (error) {
    throw error
  }

  console.log('Eighty has started on:', server.info.uri)
  console.log('Stop eighty with control + c')
})
