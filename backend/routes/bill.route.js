const { createNewBill, getAllBills, getSpecificBill } = require('../controllers/bill.controller')

// making router from express to handle endpoints
const router = require('express').Router()

router.post('/create', createNewBill) // route to create a new bill out of existing goods in inventory

router.get('/getdata', getAllBills) // route to  get all bills

router.get('/getdata/:id', getSpecificBill) // route to  get a specific bills

module.exports = router