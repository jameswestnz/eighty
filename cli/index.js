module.exports = cli

var
  // modules
  Hapi            = require('hapi'),
  h2o2            = require('h2o2'),
  inert           = require('inert'),
  Promise         = require('promise'),
  rc              = require('rc'),

  // local
  eighty          = require('../server')
;

function cli() {
  var options = rc('eighty', {
    port: 9292
  });

  var server = new Hapi.Server();

  server.connection({port: options.port})

  // register dependencies
  return server.register([h2o2, inert])
    .then(server.register.bind(server, {
      register: eighty,
      options: options
    }))

    .then(function () {
      var eighty = server.plugins.eighty.api;

      eighty.on('app:connect', function(name, options){
        console.log('App added: ' + name);
      });

      return server.start()
        .then(function(){
          return server;
        })
      ;
    })

    .catch(function(err){
      console.log(err);
      return Promise.reject(err)
    })
}
