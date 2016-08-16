module.exports = getApi

var
  // modules

  // local
  getServers          = require('./servers'),
  getLocations        = require('./locations')
;

function getApi(state, options) {
  var api = {
    options: options,

    // events
    on: function(name, listener) {
      return state.emitter.on(name, listener)
    },
    once: function(name, listener) {
      return state.emitter.once(name, listener)
    },
    off: function(name, listener) {
      return state.emitter.removeListener(name, listener)
    }
  }

  // sub apis
  api.servers = getServers(api, state);
  api.locations = getLocations(api, state);

  return api
}
