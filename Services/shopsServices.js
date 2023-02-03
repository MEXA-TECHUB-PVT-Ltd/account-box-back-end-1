const shopsModel = require("../models/shopsModel");
const mongoose = require("mongoose");
const moment = require('moment');
const managersModel = require("../models/managersModel");
const tycoonModel = require("../models/tycoonModel");

// Get All Shop 
exports.getAllShops = (req, res) => {
    shopsModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('manager_id')
        .populate('tycoon_id')
        .populate('shop_products')
        .populate('shop_cashiers')

}
// Get Shop 
exports.getSpecificShop = (req, res) => {
    const ShopId = req.params.ShopId;
    shopsModel.find({ _id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
        .populate('tycoon_id')
        .populate('shop_products')
        .populate('shop_cashiers')
}
// Get Tycoon Shops 
exports.getTycoonShops = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    shopsModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
        .populate('manager_id')
        .populate('tycoon_id')
        .populate('shop_products')
        .populate('shop_cashiers')
}
// Get Manager Shops 
exports.getManagerShops = (req, res) => {
    const ManagerId = req.params.ManagerId;
    shopsModel.find({ manager_id: ManagerId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
        .populate('manager_id')
        .populate('tycoon_id')
        .populate('shop_products')
        .populate('shop_cashiers')
}
// Delete 
exports.deleteShop = (req, res) => {
    const ShopId = req.params.ShopId;
    shopsModel.findByIdAndDelete(ShopId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    shopsModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createShop = async (req, res) => {
    const Createddate = req.body.created_at;
    tycoonModel.find({ _id: req.body.tycoon_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            const TotalShopsNO = parseInt(result[0].no_of_shops_created)
            shopsModel.find({ tycoon_id: req.body.tycoon_id }, (error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    const TotalShopsCreated = parseInt(result.length)
                    // console.log(TotalShopsCreated)
                    // console.log(TotalShopsNO)
                    if (TotalShopsCreated < TotalShopsNO) {
                        // console.log("truen")
                        shopsModel.find({ manager_id: req.body.manager_id, tycoon_id: req.body.tycoon_id }, (error, result) => {
                            if (error) {
                                res.send(error)
                            } else {
                                // res.send(result) Checking Tycoon SHops total
                                if (result === undefined || result.length == 0) {

                                    const Shop = new shopsModel({
                                        _id: mongoose.Types.ObjectId(),
                                        shop_no: req.body.shop_no,
                                        tycoon_id: req.body.tycoon_id,
                                        manager_id: req.body.manager_id,
                                        name: req.body.name,
                                        img: req.body.img,
                                        created_at: moment(Createddate).format("DD/MM/YYYY")

                                    });
                                    Shop.save((error, result) => {
                                        if (error) {
                                            res.send(error)
                                        } else {

                                            const updateData = {
                                                $push: {
                                                    shop_id: result._id
                                                },
                                                tycoon_id:req.body.tycoon_id
                                            }
                                            const options = {
                                                new: true
                                            }
                                            managersModel.findByIdAndUpdate(req.body.manager_id, updateData, options, (error, result) => {
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
                                    res.json({ data: result, message: "Manager Already Exists for the shop" })

                                }
                            }
                        })
                    } else {
                        res.json({ data: result, message: "Can't Add More Shops,Can't exceed shop limit" })

                    }
                }
            })
        }
    })



}
// Update 
exports.updateShop = async (req, res) => {
    if (req.body.manager_id === undefined) {
        const updateData = {
            shop_no: req.body.shop_no,
            name: req.body.name,
            img: req.body.img,
        }
        const options = {
            new: true
        }
        shopsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.json(error.message)
            } else {
                res.send({ data: result, message: "Updated Successfully" })
            }
        })
    } else {
        const updateData = {
            shop_no: req.body.shop_no,
            name: req.body.name,
            img: req.body.img,
            manager_id: req.body.manager_id,

        }
        const options = {
            new: true
        }
        shopsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.json(error.message)
            } else {
                const updateData = {
                    $push: {
                        shop_id: result._id
                    }
                }
                const options = {
                    new: true
                }
                managersModel.findByIdAndUpdate(req.body.manager_id, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        // res.send({ data: result, message: "Updated Successfully" })
                    }
                })
                res.send({ data: result, message: "Updated Successfully" })
            }
        })
    }
}



