const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

console.log('process', process.env)

export const config = {
  PORT: process.env.PORT || 8000,
  DATABASE_CONFIG: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    },
  },
}
