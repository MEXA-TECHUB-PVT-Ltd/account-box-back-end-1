const cashierModel = require("../models/cashierModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All Cashier 
exports.getAllCashiers = (req, res) => {
    cashierModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Cashier 
exports.getSpecificCashier = (req, res) => {
    const CashierId = req.params.CashierId;
    cashierModel.find({ _id: CashierId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    cashierModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Delete 
exports.deleteCashier = (req, res) => {
    const CashierId = req.params.CashierId;
    cashierModel.findByIdAndDelete(CashierId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createCashier = async (req, res) => {
    const Createddate= req.body.created_at;
    cashierModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Cashier = new cashierModel({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    phone_no: req.body.phone_no,
                    gender: req.body.gender,
                    age:req.body.age,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                Cashier.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Cashier Already Exists for this name" })

            }
        }
    })

}
// Update 
exports.updateCashier = async (req, res) => {
    const updateData = {
        name: req.body.name,
        phone_no: req.body.phone_no,
        gender: req.body.gender,
        age:req.body.age,
    }
    const options = {
        new: true
    }
    cashierModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



