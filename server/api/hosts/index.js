module.exports = hostsApi

var
  // modules

  // local
  createRoute          = require('./create-route')
;

function hostsApi(state) {
  var hostsApi = this
  return {
    options: state.options.hosts || {},

    create: function(id, host, routes, options){
      state.server.log(['hapi', 'info'], 'Creating host (' + id + ') with the following routes:')
      // create connection for the host
      state.server.connection({
        host: host,
        port: options.port || state.options.port,
        labels: [id]
      })

      // routes will be an object, where items are keyed by their path
      Object.keys(routes).map(function(path) {
        state.server.log(['hapi', 'info'], '- ' + path)
        var route = routes[path];
        state.server.route(createRoute(path, route));
      })
    },

    // events
    on: function() {
      var args = arguments;
      if(args.length) args[0] = 'hosts:' + args[0];
      return state.emitter.on.apply(hostsApi, arguments);
    },
    once: function() {
      var args = arguments;
      if(args.length) args[0] = 'hosts:' + args[0]
      return state.emitter.once.apply(hostsApi, arguments);
    },
    off: function() {
      var args = arguments;
      if(args.length) args[0] = 'hosts:' + args[0];
      return state.emitter.removeListener.apply(hostsApi, arguments);
    }
  }
}
