import logger from './lib/logger';
import { startHttpServer } from './http';

// http routes
startHttpServer()
  .then((server) => logger.info(`Server running at: ${server.info.uri}`))
  .catch(logger.error);
