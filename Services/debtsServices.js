const debtsModel = require("../models/debtsModel");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All debt 
exports.getAlldebts = (req, res) => {
    debtsModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('shop_id')
}
// Get debt 
exports.getSpecificdebt = (req, res) => {
    const debtId = req.params.debtId;
    debtsModel.find({ _id: debtId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}
// Get Shop debt 
exports.getShopdebt = (req, res) => {
    const ShopId = req.params.shop_id;
    debtsModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    debtsModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Get Shop and date debt 
exports.getShopdebtAndDate = (req, res) => {
    const Createddate = req.body.created_at;
    debtsModel.find({ shop_id: req.body.shop_id, created_at: moment(Createddate).format("DD/MM/YYYY"), }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}
// Get Status debt 
exports.getShopdebtStatus = (req, res) => {
    const StatusData = req.body.debt_status;
    debtsModel.find({ debt_status: StatusData }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}
// Get  debt by manager id
exports.getdebtbyManagerId = (req, res) => {
    const manager_id = req.params.manager_id;
    debtsModel.find({ manager_id: manager_id }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}
// Get  debt by manager id
exports.getdebtbyTycoonId = (req, res) => {
    const tycoon_id = req.params.tycoon_id;
    debtsModel.find({ tycoon_id: tycoon_id }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
}



// Delete 
exports.deletedebt = (req, res) => {
    const debtId = req.params.debtId;
    debtsModel.findByIdAndDelete(debtId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createdebt = async (req, res) => {
    shopsModel.find({ _id: req.body.shop_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            const ManagerId = result[0].manager_id
            const tycoon_id = result[0].tycoon_id
            const Createddate = req.body.created_at;
            const Thresholddate = req.body.threshold_date;
            const debt = new debtsModel({
                _id: mongoose.Types.ObjectId(),
                shop_id: req.body.shop_id,
                manager_id: ManagerId,
                tycoon_id: tycoon_id,
                name: req.body.name,
                amount: req.body.amount,
                threshold_date: moment(Thresholddate).format("DD/MM/YYYY"),
                created_at: moment(Createddate).format("DD/MM/YYYY"),
                is_created_by_manager: req.body.is_created_by_manager,
                debt_status: req.body.debt_status,
            });
            debt.save((error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    res.json({ data: result, message: "Created Successfully" })
                }
            })

        }
    })
    // res.send(result[0].manager_id)



}
// Update 
exports.updatedebt = async (req, res) => {
    const updateData = {
        name: req.body.name,
        amount: req.body.amount,
        // threshold_date:moment(req.body.threshold_date).format("DD/MM/YYYY"),
        is_created_by_manager: req.body.is_created_by_manager,
        debt_status: req.body.debt_status,
    }
    const options = {
        new: true
    }
    debtsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



