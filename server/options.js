module.exports = getOptions

var
  // modules
  _                 = require('lodash')
;

function getOptions(options) {
  return _.defaultsDeep(options, {
    // app options
    servers: {}
  })
}
