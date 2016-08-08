module.exports = getApi

function getApi(state) {
  var api = this
  return {
    options: state.options,

    // events
    on: state.emitter.on.bind(api),
    one: state.emitter.once.bind(api),
    off: state.emitter.removeListener.bind(api),
  }
}
