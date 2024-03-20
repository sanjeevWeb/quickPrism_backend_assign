const { DataTypes } = require('sequelize')
const sequelize = require('../database/db.js')


const BillItem = sequelize.define('BillItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { timestamp: true})

module.exports = BillItem