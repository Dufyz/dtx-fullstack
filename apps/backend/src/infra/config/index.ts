require('dotenv').config();

export const environment = {
  node_env: (process.env.NODE_ENV as string) || 'development',
  server: {
    port: Number(process.env.PORT || 3000),
  },
  database: {
    connection:
      (process.env.DATABASE_CONNECTION as string) ||
      'postgresql://postgres:postgres@localhost:5432/postgres',
    host: process.env.DATABASE_HOST || 'db',
    port: Number(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    name: process.env.DATABASE_NAME || 'postgres',
  },
};
