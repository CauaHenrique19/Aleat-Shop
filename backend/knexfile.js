// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'loja',
      user: 'postgres',
      password: process.env.PASSWORD_DB
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
