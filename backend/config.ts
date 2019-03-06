import readConfig from './lib/read-config';
import moment from 'moment';
import { types } from 'pg';

const dateTypeOID = 1082;
const parseDateToUTC = (date: string) => {
  return date === null ? null : moment.utc(date).format();
};
types.setTypeParser(dateTypeOID, parseDateToUTC);

readConfig();

export default {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  db: {
    client: 'pg',
    version: '9.6',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST_LOCAL,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    debug: process.env.DB_DEBUG === 'true'
  }
};
