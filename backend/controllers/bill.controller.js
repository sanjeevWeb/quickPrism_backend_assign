const Bill = require("../models/bill.model.js");
const BillItem = require("../models/billItem.model.js");
const Inventory = require("../models/inventory.model.js");


// const createBill = async (req, res, next) => {

//     try {
//         const { goods, quantity } = req.body

//         // checking if that item exist in database
//         const item = await Inventory.findOne({ where: { goodsName: goods } })
//         if (item) {

//             // the quantity user wants to purchase must be less than available quantity
//             if (item.quantity > quantity) {
//                 let totalAmount = item.price * quantity;

//                 // creating the bill
//                 const bill = await Bill.create({ goods, quantity, totalAmount })
//                 if (!bill) {
//                     return res.json({ error: 'something broke , please retry' })
//                 }

//                 // if everything so far is good finally update the net quantity in inventory and send res to user
//                 const updatedQuantity = item.quantity - quantity;
//                 await item.update({ quantity: updatedQuantity })

//                 return res.json({ bill })

//             }
//             else {
//                 return res.json({ message: 'stock is limited, please use lesser value' })
//             }
//         }
//         else {
//             return res.json({ error: 'please enter a correct value' })
//         }

//     }
//     catch (error) {
//         throw new Error('Error creating bill: ' + error.message);
//     }
// }

// const createNewBill = async (req, res, next) => {
//     // assuming req.body.items is an array containing objects with itemId and quantity
//     const itemsData = req.body.itemsData;

//     // retrieving the inventory items and their quantities based on their Ids
//     try {
//         let totalAmount = 0;
//         itemsData.forEach(async (item) => {
//             const goods = await Inventory.findOne({ where: { id: item.id } })
//             console.log('goods',goods)
//             if (!goods) {
//                 return res.json("selected item does not exist")
//             }
//             if (goods.dataValues.quantity > item.quantity) {
//                 totalAmount += (goods.dataValues.price * item.quantity);

//                 // now updating quantity in inventory table
//                 const updatedQuantity = goods.quantity - item.quantity;
//                 await goods.update({ quantity: updatedQuantity })
//             }
//             else {
//                 return res.json({ message: 'stock is limited, please use lesser value' })
//             }
//         })

//         const bill = await Bill.create({ totalAmount })

//         // creating records in the BillItem table to associate items with the bill
//         const billItems = itemsData.map(item => ({
//             billId: bill.id,
//             inventoryId: item.id,
//             quantity: item.quantity || 1 // default quantity to 1 if not provided
//         }));

//         await BillItem.bulkCreate(billItems);
//         return res.status(201).json({ message: 'Bill created successfully' });

//     }
//     catch (error) {
//         console.log(error)
//     }
// }

const createNewBill = async (req, res, next) => {
    // assuming req.body.items is an array containing objects with itemId and quantity
    const itemsData = req.body.itemsData;

    try {
        let totalAmount = 0;

        // using for...of loop to ensure asynchronous operations complete before moving to the next iteration
        for (const item of itemsData) {
            const goods = await Inventory.findOne({ where: { id: item.id } });
            console.log('goods',goods);

            if (!goods) {
                return res.json("selected item does not exist");
            }

            if (goods.dataValues.quantity > item.quantity) {
                totalAmount += (goods.dataValues.price * item.quantity);

                // now updating quantity in inventory table
                const updatedQuantity = goods.quantity - item.quantity;
                await goods.update({ quantity: updatedQuantity });
            } 
            else {
                return res.json({ message: 'stock is limited, please use lesser value' });
            }
        }

        const bill = await Bill.create({ totalAmount });

        // creating records in the BillItem table to associate items with the bill
        const billItems = itemsData.map(item => ({
            billId: bill.id,
            inventoryId: item.id,
            quantity: item.quantity || 1 // default quantity to 1 if not provided
        }));

        await BillItem.bulkCreate(billItems);
        return res.status(201).json({ message: 'Bill created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllBills = async (req, res, next) => {
    try {
        const bills = await Bill.findAll()
        if (bills.length == 0) {
            return res.json({ message: 'you did not created any bill' })
        }
        return res.json({ bills })
    }
    catch (error) {
        console.log(error)
    }
}

const getSpecificBill = async (req, res, next) => {
    const { id } = req.params
    const bill = await Bill.findOne({ where: { id } })
    if (!bill) {
        return res.json({ error: 'request cannot be fullfilled' })
    }
    return res.json({ bill })
}

module.exports = {
    createNewBill,
    getAllBills,
    getSpecificBill
}