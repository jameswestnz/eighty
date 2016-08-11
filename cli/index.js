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
    servers: {}
  });

  var server = new Hapi.Server();

  // register dependencies
  return server.register([h2o2, inert])
    .then(server.register.bind(server, {
      register: eighty,
      options: options
    }))

    .then(server.start.bind(server))

    .then(function(){
      return server.plugins.eighty.api
    })

    .catch(function(err){
      return Promise.reject(err)
    })
}
