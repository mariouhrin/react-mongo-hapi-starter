import { MongoClient } from 'mongodb';

import { IExtendedServer } from '../../types/interfaces/server.interface';
import { config } from '../../config';
import logger from '../logger/logger';

export const DatabasePlugin = {
  name: 'mongodb-plugin',
  version: '0.0.1',
  register: async function(server: IExtendedServer) {
    try {
      const { mongoUrl, mongoDbName } = config;
      const client: MongoClient = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
      const db = client.db(mongoDbName);
      logger.info(`Connected to Mongodb: ${mongoDbName}`);
      server.app.db = db;
      server.app.dbClient = client;
    } catch (err) {
      logger.error(`Cannot connect to mongodb in hapi mongodb-plugin: ${err}`);
    }
  }
};
