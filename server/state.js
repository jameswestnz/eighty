module.exports = getState

var
  // modules
  _                 = require('lodash'),
  EventEmitter      = require('events').EventEmitter,

  // local
  getOptions        = require('./utils/get-options')
;

function getState(server, options) {
  options = getOptions(options)

  // throw errors here if required, un-defaultable options aren't found

  var state = {
    server: server,
    options: options,
    emitter: options.emitter || new EventEmitter()
  }

  return state
}
