module.exports = getRoute

var
  // modules
  _                 = require('lodash'),
  url               = require('url')

  // local
;

function getRoute(name, options, server) {
  var state = this
  var route = {
    method: '*',
    path: '/{p*}',
    vhost: options.host,
    config: {
      payload: {
        output: 'stream',
        parse: false
      }
    }
  };
  var type = (options.static) ? 'static' : 'proxy';

  // if we're proxy (default), but we don't have any settings, assume we're routing to the local app (currently untested)
  if(type === 'proxy' && !options.proxy) {
    options.proxy = {
      port: server.info.port
    }
  }

  // mutate the route based on type
  switch(type) {
    case 'static':
      route = _.defaultsDeep(staticRoute(options), route)
    break;

    case 'proxy':
      route = _.defaultsDeep(proxyRoute(options), route);
    break;
  }

  return route
}

function staticRoute(options) {
  var opts = (typeof options.static === 'object') ? options.static : {
    path: options.static
  };

  return {
    handler: {
      directory: opts
    }
  }
}

function proxyRoute(options) {
  var opts = (typeof options.proxy === 'object') ? options.proxy : {
    port: options.proxy
  };

  var proxy = {
    host: opts.host || '127.0.0.1',
    port: opts.port,
    protocol: 'http'
  }

  return {
    /*config: {
      ext: {
        // allows us to watch for errors
        onPostHandler: {
          method: function(request, reply) {
            var response = request.response;
            // do we have an unexpected result?
            var status = response.statusCode || ((response.output && response.output.statusCode) ? response.output.statusCode : null);
            // only want errors
            if(status[0] === 4 || status[0] === 5) {
              var sendTo = options.errors[status] || options.errors['default'] || undefined;
              if(sendTo) {
                reply.proxy({
                  passThrough: true,
                  host: proxy.host,
                  port: proxy.port,
                  protocol: proxy.protocol,
                  pathname: sendTo
                });
              }
            }
            return reply.continue();
          }
        }
      }
    },*/
    handler: {
      proxy: {
        passThrough: true,
        host: proxy.host,
        port: proxy.port,
        protocol: proxy.protocol
      }
    }
  }
}
