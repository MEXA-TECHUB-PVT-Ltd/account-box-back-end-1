const turnoversModel = require("../models/turnovers");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All turnover 
exports.getAllturnovers = (req, res) => {
    turnoversModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('manager_id')
    .populate('shop_id')
    .populate('product_id')
    .populate('cashier_id')

}
// Get turnover 
exports.getSpecificturnover = (req, res) => {
    const turnoverId = req.params.turnoversId;
    turnoversModel.find({ _id: turnoverId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('product_id')
    .populate('cashier_id')
}
// Get turnover by shop Id
exports.getTurnoverByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    turnoversModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('product_id')
    .populate('cashier_id')
}
// Get turnover by date
exports.getTurnoverByDate = (req, res) => {
    const Createddate = req.params.created_at;
    turnoversModel.find({ created_at: moment(Createddate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('product_id')
    .populate('cashier_id')
}
// Get turnover by date and product Id
exports.getTurnoverByDateAndProductId = (req, res) => {
    const Createddate = req.body.created_at;
    const productId = req.body.product_id;
    turnoversModel.find({ product_id:productId,created_at: moment(Createddate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('product_id')
    .populate('cashier_id')
}
// Get turnover by date and product Id
exports.getTurnoverByDateRangeAndProductId = (req, res) => {
    const sdate=req.body.startDate
    const edate=req.body.endDate
    console.log(sdate)
    console.log(edate)

    turnoversModel.find(
        {
        product_id:req.body.product_id, 
        $or:[
             { "created_at" : {"$gte": sdate, "$lte":edate}}
             ]}
             , function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
    // turnoversModel.aggregate([
    //     // {$match:{_id: req.body.product_id}},
    //     { $match: {
    //         created_at: {
    //           $filter: {
    //             input: "$created_at", // le tableau à limiter 
    //             as: "index", // un alias
    //             cond: {$and: [
    //               { $gte: req.body.startDate },
    //               { $lte: req.body.endDate }
    //             ]}
    //           }
    //         }
    //     }}
    //   ])
    //   .project({'days.day':1, 'days.data':1})
    //   .then(result => { res.status(200).send({data: { message: result }})})
}

// Delete 
exports.deleteturnover = (req, res) => {
    const turnoverId = req.params.turnoversId;
    turnoversModel.findByIdAndDelete(turnoverId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    turnoversModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createturnover = async (req, res) => {
    const Createddate= req.body.created_at;
    shopsModel.find({ _id: req.body.shop_id}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].manager_id)
            const ManagerId=result[0].manager_id
            if (result[0].manager_id === undefined || result[0].manager_id == '') {
                res.json({ data: result, message: "ManagerId not exist for this shop" })
            } else {
                const turnover = new turnoversModel({
                    _id: mongoose.Types.ObjectId(),
                    manager_id: ManagerId,
                    shop_id: req.body.shop_id,
                    product_id:req.body.product_id,
                    cashier_id:req.body.cashier_id,
                    amount: req.body.amount,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                turnover.save((error, result) => {
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
exports.updateturnover = async (req, res) => {
    const updateData = {
        amount: req.body.amount,
    }
    const options = {
        new: true
    }
    turnoversModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



