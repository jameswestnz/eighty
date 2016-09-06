module.exports = cli

var
  // modules
  Hapi            = require('hapi'),
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
  return server.register({
    register: eighty,
    options: options
  })
    .then(function(){
      return server.start()
        .then(function() {
          return server.plugins.eighty.api
        })
    })
    .catch(function(err){
      return Promise.reject(err)
    })
}
