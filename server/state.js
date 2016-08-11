module.exports = getState

var
  // modules
  EventEmitter      = require('events').EventEmitter
;

function getState(server) {
  // throw errors here if required, un-defaultable options aren't found

  var state = {
    server: server,
    emitter: new EventEmitter()
  }

  return state
}
