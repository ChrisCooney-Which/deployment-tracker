require('dotenv').config({ path: require('find-config')('.env') })

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
