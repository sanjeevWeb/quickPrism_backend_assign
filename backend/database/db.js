const Sequelize = require('sequelize')

// method to communicate to database with sequelize
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
})

// connecting to database with already (manully) created database 
sequelize.authenticate()
.then(() => {
    console.log('shop database connected')
})
.catch((error) => console.log(error))

module.exports = sequelize

