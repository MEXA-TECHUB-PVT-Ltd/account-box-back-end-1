const shopProductsModel = require("../models/shopProductsModel");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All ShopProduct 
exports.getAllShopProducts = (req, res) => {
    shopProductsModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('shop_id')
    .populate('product_id')
}
// Get ShopProduct 
exports.getSpecificShopProduct = (req, res) => {
    const ShopProductId = req.params.ShopProductId;
    shopProductsModel.find({ _id: ShopProductId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('product_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    shopProductsModel.deleteMany({}, (error, result) => {
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
    shopProductsModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('product_id')
}

// Delete 
exports.deleteShopProduct = (req, res) => {
    const ShopProductId = req.params.ShopProductId;
    shopProductsModel.findByIdAndDelete(ShopProductId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            const updateData = {
            $pull: {
                shop_products: result.product_id
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
exports.createShopProduct = async (req, res) => {
    const Createddate= req.body.created_at;
    shopProductsModel.find({ shop_id: req.body.shop_id,product_id:req.body.product_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const ShopProduct = new shopProductsModel({
                    _id: mongoose.Types.ObjectId(),
                    shop_id: req.body.shop_id,
                    product_id: req.body.product_id,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                ShopProduct.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                        const updateData = {
                            $push: {
                                shop_products: result.product_id
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
                    }
                })

            } else {
                res.json({ data: result, message: "Shop Product Already Exists for this Product and Shop" })

            }
        }
    })

}




