const Sequelize = require('sequelize')
const dbConfig = require('../Utils/DbConfig')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    logging: false,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./UsersModel').default(sequelize, Sequelize)

module.exports = db
