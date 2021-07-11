module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST || "localhost",
  "port": process.env.DATABASE_PORT || 1900,
  "username": process.env.DATABASE_USERNAME || "postgres",
  "password": process.env.DATABASE_PASSWORD || "zxcasd",
  "database": process.env.DATABASE_NAME || "blueberry",
  "entities": ["dist/entities/*.js"],
  "migrations": ["dist/migrations/*.js"],
  "seeds": ['dist/seeds/**/*.js'],
  "factories": ['dist/factories/**/*.js'],
}