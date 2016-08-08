module.exports = cli

var
  // modules
  Hapi            = require('hapi'),
  rc              = require('rc'),

  // local
  eighty          = require('../server')
;

function cli(callback) {
  var options = rc('eighty', {
    port: 8080
  });

  var server = new Hapi.Server();
  server.connection({
    port: options.port
  });

  server.register({
    register: eighty,
    options: options
  }, function (error) {
    if (error) {
      return callback(error)
    }

    var eighty = server.plugins['eighty']['api'];

    eighty.on('app:connect', function(name, options){
      console.log('App added: ' + name);
    });

    server.start(function (error) {
      callback(error, server);
    });
  })
}
