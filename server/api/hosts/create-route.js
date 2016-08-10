module.exports = getRoute

var
  // modules
  _                 = require('lodash'),
  url               = require('url'),
  path              = require('path')

  // local
;

function getRoute(path, options) {
  var state = this
  var route = {
    path: path,
    method: options.method || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  };
  var type = null;
  if(options.static) type = 'static';
  if(options.proxy) type = 'proxy';

  // mutate the route based on type
  switch(type) {
    case 'static':
      route = _.defaultsDeep(staticRoute(options.static), route)
    break;

    case 'proxy':
      route = _.defaultsDeep(proxyRoute(options.proxy), route);
    break;
  }

  return route
}

function staticRoute(options) {
  var opts = (typeof options === 'object') ? options : {
    directory: {
      path: options
    }
  };

  return {
    handler: {
      directory: opts.directory
    },
    config: {
      ext: {
        onPostHandler: {
          method: function(request, reply) {
            var response = request.response;
            var statusCode = response.statusCode || response.output.statusCode || null;

            if(opts.errors && (String(statusCode).charAt(0) === '4' || String(statusCode).charAt(0) === '5')) {
              var errorRoute = opts.errors[statusCode] || opts.errors['default'] || null;
              if(errorRoute) {
                return reply.file(path.format({ dir: opts.directory.path, base: errorRoute }), {
                  confine: false
                });
              }
            }

            return reply.continue();
          }
        }
      }
    }
  }
}

function proxyRoute(options) {
  var opts = (typeof options === 'object') ? options : {
    port: options
  };

  var proxy = {
    host: opts.host || '127.0.0.1',
    port: opts.port,
    protocol: 'http'
  }

  return {
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
