module.exports = getServers

var
  // modules
  Promise           = require('promise')

  // local
;

function getServers(api, state) {
  var serversApi = this;
  return {
    add: function(name, serverName, listen, locations) {
      var connection = state.server.connection({
        host: serverName,
        port: listen,
        labels: [name]
      });

      // create routes
      var routes = Object.keys(locations).map(function(locationName){
        var location = locations[locationName];
        return api.locations.add(locationName, connection, location);
      })

      return Promise.all(routes)
        .then(state.emitter.emit.bind(null, 'servers:add', name, serverName, listen, locations))
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
