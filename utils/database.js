const Sequelize = require('sequelize').Sequelize

const dbConnection = process.env.DB_CONNECTION || 'mysql'
const dbHost = process.env.DB_HOST || '127.0.0.1'
const dbPort = process.env.DB_PORT || '3306'
const dbName = process.env.DB_DATABASE || 'simple_health_check'
const dbUsername = process.env.DB_USERNAME || ''
const dbPassword = process.env.DB_PASSWORD || ''
const dbCredential = dbUsername ? `${dbUsername}:${dbPassword}@` : ''
const dbUri = `${dbConnection}://${dbCredential}${dbHost}:${dbPort}/${dbName}`

const sequelize = new Sequelize(dbUri)

module.exports = sequelize
