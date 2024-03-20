const Inventory = require("../models/inventory.model");

const saveInventory = async (req, res, next) => {
    const { goodsName, price, description, quantity } = req.body;

    if (!goodsName || !price || !description || !quantity) {
        return res.json({ error: "All fields are mandatory" })
    }

    try {
        // assuming goodsName is unique
        const preExist = await Inventory.findOne({ where: { goodsName } })
        if (preExist) {
            return res.json({ message: 'goods already exist, you can update it' })
        }
        const isCreated = await Inventory.create({ goodsName, price, description, quantity })
        if (!isCreated) {
            return res.json({ error: 'something broke, please retry' })
        }
        return res.json({ message: 'inventory added successfully' })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllInventory = async (req, res, next) => {
    try {
        const allItems = await Inventory.findAll()
        if (allItems.length == 0) {
            return res.json({ message: 'you do not have any data saved' })
        }
        return res.json({ allItems })
    }
    catch (error) {
        console.log(error)
    }
}

const updateInventoryData = async (req, res, next) => {
    try {
        const { id } = req.params
        const { quantity, price } = req.body

        // make sure if that item is present already before updating
        const isExist = await Inventory.findOne({ where: { id } })
        if (!isExist) {
            return res.json({ error: 'cannot be changed' })
        }

        // may be user only want to update price or quantity
        let isUpdated;
        if (!price) {
            isUpdated = await isExist.update({ quantity })

        }
        else if (!quantity) {
            isUpdated = await isExist.update({ price })

        }
        else {
            isUpdated = await isExist.update({ quantity, price })

        }

        if (!isUpdated) {
            return res.json({ error: 'something broke, please retry' })
        }
        return res.json({ message: 'data changed successfully' })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveInventory,
    getAllInventory,
    updateInventoryData
}