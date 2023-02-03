const shopCashiersModel = require("../models/shopCashiersModel");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All ShopCashier 
exports.getAllShopCashiers = (req, res) => {
    shopCashiersModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('shop_id')
        .populate('cashier_id')
}
// Get ShopCashier 
exports.getSpecificShopCashier = (req, res) => {
    const ShopCashierId = req.params.ShopCashierId;
    shopCashiersModel.find({ _id: ShopCashierId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
        .populate('cashier_id')
}
// Get ShopCashier 
exports.getSpecificShopCashierByTycoonId = (req, res) => {
    const ShopCashierId = req.body.tycoon_id;
    let ResultArray=[]
    shopCashiersModel.find({ tycoon_id: ShopCashierId }, function (err, foundResult) {
        try {
            // res.json({ data: foundResult })
            for(let i=0;i<foundResult.length;i++){
                ResultArray.push(foundResult[i].cashier_id)
            }
            res.json(ResultArray)

        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
        .populate('cashier_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    shopCashiersModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Get SingleShopProduct 
exports.getSingleShopProduct = (req, res) => {
    const ShopId = req.params.shop_id;
    shopCashiersModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
        .populate('cashier_id')
}

// Delete 
exports.deleteShopCashier = (req, res) => {
    const ShopCashierId = req.params.ShopCashierId;
    shopCashiersModel.findByIdAndDelete(ShopCashierId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            // res.json({ message: "Deleted Successfully" })
            const updateData = {
                $pull: {
                    shop_cashiers: result.cashier_id
                }
            }
            const options = {
                new: true
            }
            shopsModel.findByIdAndUpdate(result.shop_id, updateData, options, (error, result) => {
                if (error) {
                    res.json(error.message)
                } else {
                    // res.send({ data: result, message: "Updated Successfully" })
                }
            })
            res.json({ message: "Deleted Successfully" })

        }

    })
}
// Create 
exports.createShopCashier = async (req, res) => {
    const Createddate = req.body.created_at;
    const ArrayTemp = req.body.cashier_id
    console.log(ArrayTemp)
    let nameArr = ArrayTemp.split(',');
    shopsModel.find({ _id: req.body.shop_id }, function (err, foundResult) {
        try {
            const tycoon_id = foundResult[0].tycoon_id
            for (let i = 0; i < nameArr.length; i++) {

                const ShopCashier = new shopCashiersModel({
                    _id: mongoose.Types.ObjectId(),
                    shop_id: req.body.shop_id,
                    tycoon_id: tycoon_id,
                    cashier_id: nameArr[i],
                    created_at: moment(Createddate).format("DD/MM/YYYY")

                });

                ShopCashier.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        const updateData = {
                            $push: {
                                shop_cashiers: nameArr
                            }
                        }
                        const options = {
                            new: true
                        }
                        shopsModel.findByIdAndUpdate(req.body.shop_id, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                            }
                        })

                    }
                })
            }
            res.json({ data: nameArr, message: "Created Successfully" })

        } catch (err) {
            res.json(err)
        }
    })

}




