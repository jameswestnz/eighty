module.exports = getLocations

var
  // modules
  _                    = require('lodash'),

  // local
  createRoute          = require('./create-route')
;

function getLocations(api, state) {
  var locationsApi = this;
  return {
    add: function(name, connection, options) {
      return createRoute(name, options)
        .then(function(route){
          return connection.route(route)
        })
        .then(state.emitter.emit.bind(null, 'locations:add', name, options))
    },

    // events
    on: function(name, listener) {
      return state.emitter.on.call(this, 'locations:' + name, listener)
    },
    once: function(name, listener) {
      return state.emitter.once.call(this, 'locations:' + name, listener)
    },
    off: function(name, listener) {
      return state.emitter.off.call(this, 'locations:' + name, listener)
    }
  }
}
