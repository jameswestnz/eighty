module.exports = cli

var
  // modules
  Hapi            = require('hapi'),
  h2o2            = require('h2o2'),
  inert           = require('inert'),
  rc              = require('rc'),

  // local
  eighty          = require('../server')
;

function cli(callback) {
  var options = rc('eighty', {
    port: 8080
  });

  var server = new Hapi.Server();

  server.register([
    {
      register: h2o2
    },
    {
      register: inert
    },
    {
      register: eighty,
      options: options
    }
  ], function (error) {
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
