module.exports = getState

var
  // modules
  _                 = require('lodash'),
  EventEmitter      = require('events').EventEmitter,

  // local
  getOptions        = require('./get-options')
;

function getState(options) {
  options = getOptions(options)

  // throw errors here if required, un-defaultable options aren't found

  var state = {
    options: options,
    emitter: options.emitter || new EventEmitter()
  }

  return state
}
