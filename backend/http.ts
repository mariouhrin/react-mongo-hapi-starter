import Hapi from 'hapi';
import Glob from 'glob';
import config from './config';

import hapiLoggerPlugin from './lib/hapi-logger-plugin';

const port = config.port;

const http = new Hapi.Server({
  port,
  routes: {
    cors: {
      origin: ['http://localhost:8080', 'http://localhost:8081'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language']
    },
    validate: {
      options: {
        abortEarly: false
      },
      failAction: async (request, h, err) => {
        throw err;
      }
    }
  }
});

const getGlobOptions = () => {
  return {
    cwd: process.env.NODE_ENV === 'production' ? 'dist' : ''
  };
};

export async function startHttpServer() {
  await http.register([hapiLoggerPlugin]);

  const globOptions = getGlobOptions();

  // Register Hapi routes automatically
  Glob.sync('routes/**/*.routes.@(ts|js)', globOptions).forEach((filename) => {
    http.route(require('./' + filename).default);
  });

  // Start http
  await http.start();
  return http;
}
