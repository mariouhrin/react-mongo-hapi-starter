import knexConnector from 'knex';
import config from '../config';

export default knexConnector(config.db);
