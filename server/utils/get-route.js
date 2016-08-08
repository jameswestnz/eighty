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
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    path: '/{p*}',
    vhost: options.host
  };
  var type = 'internal';
  if(options.static) type = 'static';
  if(options.proxy) type = 'proxy';

  // mutate the route based on type
  switch(type) {
    case 'static':
      route = _.defaultsDeep(staticRoute(options), route)
    break;

    case 'proxy':
      route = _.defaultsDeep(proxyRoute(options), route);
    break;

    case 'internal':
      route = _.defaultsDeep(internalRoute(server), route);
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

function internalRoute(server) {
  return {
    handler: {
      proxy: {
        passThrough: true,
        host: server.info.host,
        port: server.info.port,
        protocol: 'http'
      }
    }
  }
}
