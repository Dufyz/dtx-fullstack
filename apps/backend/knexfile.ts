require('dotenv').config();

const host = process.env.DATABASE_HOST || 'db';
const port = process.env.DATABASE_PORT || 5432;
const user = process.env.DATABASE_USER || 'postgres';
const password = process.env.DATABASE_PASSWORD || 'postgres';
const database = process.env.DATABASE_NAME || 'postgres';

const connection =
  process.env.DB_CONNECTION ||
  `postgresql://${user}:${password}@${host}:${port}/${database}`;

module.exports = {
  client: 'pg',
  connection: connection,
  migrations: {
    directory: './src/infra/database/migrations',
  },
  seeds: {
    directory: './src/infra/database/seeds',
  },
};
