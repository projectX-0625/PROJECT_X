import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  direction: 'up',
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  databaseUrl: process.env.DATABASE_URL
};
