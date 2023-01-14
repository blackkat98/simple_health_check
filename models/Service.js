const db = require('../utils/database')
const Sequelize = require('sequelize')

const Service = db.define('Service', {
    uri: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    header: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    query: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    body: {
        type: Sequelize.JSON,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'services',
})

module.exports = Service
