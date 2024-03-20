// consuming env file and allow access through the whole application
require('dotenv').config()

const express = require('express')
const cors = require('cors')

// app-wide or local modules including models and routes
const Bill = require('./models/bill.model.js')
const Inventory = require('./models/inventory.model.js')
const BillItem = require('./models/billItem.model.js')
const router = require('./routes/inventory.route.js')
const billRouter = require('./routes/bill.route.js')

// sequelize database instance
const sequelize = require('./database/db')

const app = express()

// middlewares to handle form data and parsing req objects to json
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const PORT = process.env.PORT || 5000

// table relationship in database
Inventory.belongsToMany(Bill, { through: BillItem})
Bill.belongsToMany(Inventory, { through: BillItem})

// creating table in database and syncing our application
sequelize.sync({ force: false })
    .then(() => {
        console.log('tables created successfullly')
    })
    .catch((error) => console.log(error))

// defining router as middlewares
app.use('/api/bill', billRouter)
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`app listening at ${PORT}`)
})    