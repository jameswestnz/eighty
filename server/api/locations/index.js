module.exports = getLocations

var
  // modules
  _                    = require('lodash'),
  Promise              = require('promise'),

  // local
  createRoute          = require('./create-route')
;

function getLocations(api, state) {
  var locationsApi = this;
  return {
    add: function(name, connection, options) {
      return createRoute(name, options)
        .then(function(route){
          try {
            connection.route(route)
            return route
          } catch(e) {
            console.log(e)
            return Promise.reject(e)
          }
        })
        .then(state.emitter.emit.bind(this, 'locations:add', name, options))
    },

    // events
    on: function(name, listener) {
      return state.emitter.on('locations:' + name, listener)
    },
    once: function(name, listener) {
      return state.emitter.once('locations:' + name, listener)
    },
    off: function(name, listener) {
      return state.emitter.removeListener('locations:' + name, listener)
    }
  }
}
