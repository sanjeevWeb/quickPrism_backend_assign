const { DataTypes } = require('sequelize')
const sequelize = require('../database/db.js') // getting sequelize instance from database created

// making an inventory model with sequelize instance and define method
const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    goodsName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    }

})

module.exports = Inventory