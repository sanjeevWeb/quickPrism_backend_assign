const { saveInventory, getAllInventory, updateInventoryData } = require('../controllers/inventory.controller.js')

// making router from express to handle endpoints
const router = require('express').Router()

router.post('/create', saveInventory) // route to create new inventory/goods

router.get('/getdata', getAllInventory) // route to get all inventory/goods

router.put('/change/:id', updateInventoryData) // route to update an existing inventory/goods

module.exports = router