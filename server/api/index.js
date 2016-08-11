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
    on: state.emitter.on.bind(this),
    once: state.emitter.once.bind(this),
    off: state.emitter.removeListener.bind(this),
  }

  // sub apis
  api.servers = getServers(api, state);
  api.locations = getLocations(api, state);

  return api
}
