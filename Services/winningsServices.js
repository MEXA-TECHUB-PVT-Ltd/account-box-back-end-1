const winningModel = require("../models/winnings");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All winning 
exports.getAllwinnings = (req, res) => {
    winningModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('manager_id')
    .populate('shop_id')
    .populate('tycoon_id')

}
// Get winning 
exports.getSpecificwinning = (req, res) => {
    const winningId = req.params.winningsId;
    winningModel.find({ _id: winningId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })  .populate('manager_id')
    .populate('shop_id')
    .populate('tycoon_id')

}
// Get expense by manager id
exports.getWinningsByManagerId = (req, res) => {
    const manager_id = req.params.manager_id;
    winningModel.find({ manager_id: manager_id }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })  .populate('manager_id')
    .populate('shop_id')
    .populate('tycoon_id')

}
// Get expense by tyccon id
exports.getWinningsByTycoonId = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    winningModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })  .populate('manager_id')
    .populate('shop_id')
    .populate('tycoon_id')

}
// Delete All
exports.deleteAll = (req, res) => {
    winningModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Get winning by shop Id
exports.getWinningsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    winningModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })  .populate('manager_id')
    .populate('shop_id')
    .populate('tycoon_id')
}
// Get turnover by date
exports.getWinningsByDate = (req, res) => {
    const Createddate = req.params.created_at;
    winningModel.find({ created_at: moment(Createddate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })  .populate('manager_id')
    .populate('shop_id')
}
// Delete 
exports.deletewinning = (req, res) => {
    const winningId = req.params.winningsId;
    winningModel.findByIdAndDelete(winningId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createwinning = async (req, res) => {
    const Createddate= req.body.created_at;
    shopsModel.find({ _id: req.body.shop_id}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].manager_id)
            const ManagerId=result[0].manager_id
            const tycoon_id=result[0].tycoon_id
            if (result[0].manager_id === undefined || result[0].manager_id == '') {
                res.json({ data: result, message: "ManagerId not exist for this shop" })
            } else {
                const winning = new winningModel({
                    _id: mongoose.Types.ObjectId(),
                    manager_id: ManagerId,
                    tycoon_id:tycoon_id,
                    shop_id: req.body.shop_id,
                    name:req.body.name,
                    amount: req.body.amount,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                winning.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            }
        }
    })

}
// Update 
exports.updatewinning = async (req, res) => {
    const updateData = {
        name:req.body.name,
     amount: req.body.amount,
    }
    const options = {
        new: true
    }
    winningModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



