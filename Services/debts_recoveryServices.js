const debts_recoveryModel = require("../models/debts_recoveryModel");
const mongoose = require("mongoose");
const moment = require('moment');
const debtsModel = require("../models/debtsModel");

// Get All debt 
exports.getAlldebts_recovery = (req, res) => {
    debts_recoveryModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('shop_id')
    .populate('debt_id')
}
// Get debt 
exports.getSpecificdebt_recovery = (req, res) => {
    const debtId = req.params.debtRecoveryId;
    debts_recoveryModel.find({ _id: debtId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('debt_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    debts_recoveryModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Get DebtsRecovery By debt 
exports.getShopdebt_recovery = (req, res) => {
    const debtId = req.params.debtId;
    debts_recoveryModel.find({ debt_id: debtId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('debt_id')
}
// Get debt recovery by shopId 
exports.getDebtRecoveryByShopId = (req, res) => {
    const ShopId = req.params.shopId;
    debts_recoveryModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('debt_id')
}
// Get debt recovery by recoveryDate 
exports.getDebtRecoveryByRecoveryDate = (req, res) => {
    const RecoverDate = req.body.recovery_date;
    debts_recoveryModel.find({ recovery_date: moment(RecoverDate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }).populate('shop_id')
    .populate('debt_id')
}

// Delete 
exports.deletedebt_recovery = (req, res) => {
    const debtId = req.params.debtId;
    debts_recoveryModel.findByIdAndDelete(debtId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createdebt_recovery = async (req, res) => {
    const Createddate= req.body.recovery_date;
    debtsModel.find({ _id:req.body.debt_id}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].shop_id)
            const ShopId= result[0].shop_id
            const debt = new debts_recoveryModel({
                    _id: mongoose.Types.ObjectId(),
                    debt_id: req.body.debt_id,
                    shop_id:ShopId,
                    amount_recovered: req.body.amount_recovered,
                    recovery_date:moment(Createddate).format("DD/MM/YYYY"),
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
                


}
// Update 
exports.updatedebt_recovery = async (req, res) => {
    const Createddate= req.body.recovery_date;

    const updateData = {
        amount_recovered: req.body.amount_recovered,
        recovery_date:moment(Createddate).format("DD/MM/YYYY"),
    }
    const options = {
        new: true
    }
    debts_recoveryModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



