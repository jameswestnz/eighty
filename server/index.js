module.exports.register = register
module.exports.register.attributes = {
  name: 'eighty',
  connections: false
}

var
  // modules
  h2o2              = require('h2o2'),
  inert             = require('inert'),

  // local
  getOptions        = require('./options'),
  getState          = require('./state'),
  getApi            = require('./api')
;

function register(server, options, next) {
  var options = getOptions(options);
  var state = getState(server);
  var api = getApi(state, options);

  // expose the api for events and access to options
  server.expose('api', api)

  server.register([h2o2, inert])
    .then(function(){
      var servers = Object.keys(api.options.servers).map(function(name) {
        var server = api.options.servers[name]
        return api.servers.add(name, server.name, server.listen, server.locations);
      });

      return Promise.all(servers)
    })
    .then(next)
    .catch(function(err){
      console.log('eighty-server error: ' + err)
    })
}
