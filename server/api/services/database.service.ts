import { Knex } from 'knex';
import 'dotenv/config';
import L from '../../common/logger';
import knexlib from 'knex';

export const knex = knexlib({
  client: 'pg',
  connection: {
    //connectString: process.env.POSTGRES_CONNECTIONSTRING,
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    port: 5432,
    database: 'olympia'
  },
  debug: process.env.KNEX_DEBUG == '1',
  pool: {
    min: 2,
    max: 10,
  },
  log: {
    warn: L.warn.bind(L),
    error: L.error.bind(L),
    deprecate: L.warn.bind(L),
    debug: L.debug.bind(L),
  },
}) as Knex;

export const transaction = <T>(
  transactionScope: (trx: Knex.Transaction) => Promise<T> | void
): Promise<T> => {
  return knex.transaction(transactionScope);
};
