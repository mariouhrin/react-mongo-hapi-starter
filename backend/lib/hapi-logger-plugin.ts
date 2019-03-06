import { Server, Request, ResponseObject, ResponseToolkit } from 'hapi';
import Boom from 'boom';
import logger from './logger';

export default {
  name: 'hapi-logger-plugin',
  version: '1.0.0',
  register: async (server: Server, options: any) => {
    let start: number;

    server.ext('onRequest', (request, h) => {
      start = new Date().getTime();
      return h.continue;
    });

    /**
     * Logs request status code before sending response
     */
    server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
      const requestInfo = `${request.method.toUpperCase()} ${request.url.path}`;
      const duration = new Date().getTime() - start;

      if (request.response instanceof Boom) {
        logger.error(
          `${requestInfo} -> ${request.response.output.statusCode} ${request.response.stack} in ${duration}ms`
        );
      } else {
        logger.debug(`${requestInfo} -> ${(request.response as ResponseObject).statusCode} in ${duration}ms`);
      }

      return h.continue;
    });
  }
};
