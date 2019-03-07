import Hapi from 'hapi';
import Glob from 'glob';

import { config } from './config';
import { LoggerPlugin, DatabasePlugin } from './hapi-plugins';
import logger from './hapi-plugins/logger/logger';

const { port } = config;

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

async function startHttpServer() {
  await http.register([LoggerPlugin, DatabasePlugin]);

  const globOptions = getGlobOptions();

  // Register Hapi routes automatically
  Glob.sync('routes/**/*.routes.@(ts|js)', globOptions).forEach((filename) => {
    http.route(require('./' + filename).default);
  });

  // Start http
  await http.start();

  return http;
}

startHttpServer()
  .then((server) => logger.info(`Server running at: ${server.info.uri}`))
  .catch(logger.error);
