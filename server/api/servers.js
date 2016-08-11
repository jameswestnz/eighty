module.exports = getServers

var
  // modules
  Promise           = require('promise'),
  http              = require('http')

  // local
;

function getServers(api, state) {
  var serversApi = this;
  var connections = {}
  return {
    add: function(name, serverName, listen, locations) {
      var connection = connections[listen] = connections[listen] || state.server.connection({
        //host: serverName,
        port: listen,
        labels: ['eighty', 'port:' + listen, name]
      });

      // create routes
      // check if we have a default...
      if(locations.default === true) {
        locations.path = '/{p*}';
        locations.vhost = serverName;
        var routes = api.locations.add('default', connection, locations);
      } else
      // or we have multiple locations to create
      {
        var routes = Object.keys(locations).map(function(locationName){
          var location = locations[locationName];
          location.vhost = serverName;
          return api.locations.add(locationName, connection, location);
        })
      }

      return Promise.all(routes)
        .then(state.emitter.emit.bind(null, 'servers:add', name, serverName, listen, locations))
    },

    get: function(name) {
      if(name) return api.options.servers[name]
      return api.options.servers
    },

    // events
    on: function(name, listener) {
      return state.emitter.on.call(this, 'servers:' + name, listener)
    },
    once: function(name, listener) {
      return state.emitter.once.call(this, 'servers:' + name, listener)
    },
    off: function(name, listener) {
      return state.emitter.off.call(this, 'servers:' + name, listener)
    }
  }
}
