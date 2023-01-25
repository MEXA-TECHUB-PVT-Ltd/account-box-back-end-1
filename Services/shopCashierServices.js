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
    }) .populate('shop_id')
    .populate('cashier_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    shopCashiersModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Get SingleShopProduct 
exports.getSingleShopProduct = (req, res) => {
    const ShopId = req.params.shop_id;
    shopCashiersModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }) .populate('shop_id')
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
    const Createddate= req.body.created_at;
    shopCashiersModel.find({ shop_id: req.body.shop_id,cashier_id:req.body.cashier_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const ShopCashier = new shopCashiersModel({
                    _id: mongoose.Types.ObjectId(),
                    shop_id: req.body.shop_id,
                    cashier_id: req.body.cashier_id,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                ShopCashier.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        const updateData = {
                            $push: {
                                shop_cashiers: result.cashier_id
                            }
                        }
                        const options = {
                            new: true
                        }
                        shopsModel.findByIdAndUpdate(req.body.shop_id, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                                // res.send({ data: result, message: "Updated Successfully" })
                            }
                        })
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Shop Cashier Already Exists for this Cashier and Shop" })

            }
        }
    })

}




