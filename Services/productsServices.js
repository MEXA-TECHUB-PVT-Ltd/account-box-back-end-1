const productModel = require("../models/productModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All Product 
exports.getAllProducts = (req, res) => {
    productModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Product 
exports.getSpecificProduct = (req, res) => {
    const ProductId = req.params.ProductId;
    productModel.find({ _id: ProductId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get Cashier 
exports.getSpecificProductByTycoon = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    productModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}

// Delete 
exports.deleteProduct = (req, res) => {
    const ProductId = req.params.ProductId;
    productModel.findByIdAndDelete(ProductId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createProduct = async (req, res) => {
    const Createddate= req.body.created_at;
    productModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Product = new productModel({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    price: req.body.price,
                    tycoon_id:req.body.tycoon_id,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                Product.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Product Already Exists for this name" })

            }
        }
    })

}
// Update 
exports.updateProduct = async (req, res) => {
    const updateData = {
        name: req.body.name,
        price: req.body.price,
    }
    const options = {
        new: true
    }
    productModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    productModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}



