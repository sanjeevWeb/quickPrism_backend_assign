const { DataTypes } = require('sequelize')
const sequelize = require('../database/db.js') //getting sequelize instance from database created

// making an inventory model with sequelize instance and define method
const Bill = sequelize.define('Bill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // goods: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // quantity: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    totalAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, { timestamps: true})

module.exports = Bill