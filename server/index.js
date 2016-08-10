module.exports.register = register
module.exports.register.attributes = {
  name: 'eighty'
}

var
  // modules

  // local
  getState          = require('./state'),
  getApi            = require('./api')
;

function register(server, options, next) {
  var state = getState(server, options);
  var api = getApi(state);

  Object.keys(options.hosts).map(function(id) {
    var host = options.hosts[id]
    api.hosts.create(id, host.host, host.locations, host);
  });

  // only apply routes as we start the server so we can wait for events to be bound
  /*server.ext('onPreStart', function(server, next) {
    // connect apps
    Object.keys(api.options.apps).map(function(key) {
      var app = api.options.apps[key]
      var route = getRoute.call(state, key, app, server)
      server.route(route);
      state.emitter.emit.call(this, 'app:connect', key, app);
      return route
    })

    next();
  });*/

  // expose the api for events and access to options
  server.expose('api', api)

  next();
}
