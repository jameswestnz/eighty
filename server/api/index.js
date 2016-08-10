module.exports = getApi

var
  // modules

  // local
  hostsApi          = require('./hosts')
;

function getApi(state) {
  var api = this
  return {
    options: state.options,

    // hosts
    hosts: hostsApi(state),

    // events
    on: state.emitter.on.bind(api),
    once: state.emitter.once.bind(api),
    off: state.emitter.removeListener.bind(api),
  }
}
