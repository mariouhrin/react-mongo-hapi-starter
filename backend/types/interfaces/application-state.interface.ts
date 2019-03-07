import { ApplicationState } from 'hapi';
import { Db, MongoClient } from 'mongodb';

export interface IExtendedApplicationState extends ApplicationState {
  db: Db;
  dbClient: MongoClient;
}
