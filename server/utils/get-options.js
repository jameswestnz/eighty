module.exports = getOptions

var
  // modules
  _                 = require('lodash'),
  path              = require('path')
;

function getOptions(options) {
  return _.defaultsDeep(options, {
    // eighty options
    port: 8080,

    // logging options
    log: {
      path: path.join(__dirname, '../')
    },

    // app options
    apps: {}
  })
}
