module.exports = createRoute

var
  // modules
  _                 = require('lodash'),
  url               = require('url'),
  path              = require('path'),
  Promise           = require('promise')

  // local
;

function createRoute(name, options) {
  var route = {
    path: options.path,
    method: options.method || '*',
    vhost: options.vhost,
    config: {
      //id: name,
      ext: {
        onPostHandler: {
          method: function(request, reply) {
            return handleError(request, reply, options);
          }
        }
      }
    }
  };
  var type;
  if(options.directory) type = 'directory';
  if(options.file) type = 'file';
  if(options.proxy) type = 'proxy';

  if(!type) return Promise.reject('Could not determine type for route: ' + name);

  // mutate the route based on type
  switch(type) {
    case 'directory':
      route = _.defaultsDeep(directoryRoute(options), route)
    break;

    case 'file':
      route = _.defaultsDeep(fileRoute(options), route)
    break;

    case 'proxy':
      route = _.defaultsDeep(proxyRoute(options), route);
    break;
  }

  return Promise.resolve(route)
}

function directoryRoute(options) {
  return {
    handler: {
      directory: options.directory
    }
  }
}

function fileRoute(options) {
  return {
    handler: {
      file: options.file
    }
  }
}

function proxyRoute(options) {
  return {
    handler: {
      proxy: {
        passThrough: true,
        host: options.proxy.host || '127.0.0.1',
        port: options.proxy.port,
        protocol: options.proxy.protocol || 'http'
      }
    }
  }
}

function handleError(request, reply, options) {
  var response = request.response;
  var statusCode = response.statusCode || response.output.statusCode || null;

  if(options.error && (String(statusCode).charAt(0) === '4' || String(statusCode).charAt(0) === '5')) {
    var errorRoute = options.error[statusCode] || options.error['default'] || null;
    if(errorRoute) {
      // determine error route type
      var type;
      if(errorRoute.file) type = 'file';
      if(errorRoute.proxy) type = 'proxy';

      var ret;

      switch(type) {
        case 'file':
          ret = reply.file(errorRoute.file.path, _.defaultsDeep(errorRoute.file, {
            confine: false
          }));
        break;

        case 'proxy':
          ret = reply.proxy(errorRoute.proxy);
        break;
      }

      return ret;
    }
  }
  return reply.continue();
}
