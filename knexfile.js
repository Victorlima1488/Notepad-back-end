// Knex configuration file.

const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database',  'database.db')  // Database Connection for all SO.
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations') // Migratins settings.
    },
    useNullAsDefault: true
  }
}