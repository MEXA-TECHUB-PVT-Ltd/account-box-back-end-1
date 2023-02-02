const daily_assigned_fundModel = require("../models/daily_assigned_fund");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All daily_assigned_fund 
exports.getAlldaily_assigned_funds = (req, res) => {
    daily_assigned_fundModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('tycoon_id')
        .populate('shop_id')

}
// Get daily_assigned_fund 
exports.getSpecificdaily_assigned_fund = (req, res) => {
    const daily_assigned_fundId = req.params.daily_assigned_fundsId;
    daily_assigned_fundModel.find({ _id: daily_assigned_fundId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('tycoon_id')
        .populate('shop_id')
}
// Get daily_assigned_fund by Tycoon Id
exports.getFundsByTycoonId = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    daily_assigned_fundModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('tycoon_id')
        .populate('shop_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    daily_assigned_fundModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Get daily_assigned_fund by Tycoon Id and date 
exports.getFundsByTycoonIdAndDate = (req, res) => {
    const TycoonId = req.body.tycoon_id;
    const dateFund = req.body.date
    shopsModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        // if(err){
        //     res.json(err);
        // }else{
 try {
    let arrayData = foundResult
    let arrayTemp = [];
    let assignfund =[];
    for (let i = 0; i < arrayData.length; i++) {
          assignfund=arrayData[i].assigned_funds
          if(assignfund.length===0){
            // console.log('hello')
            arrayData[i].assigned_funds=assignfund

          }else{
            // console.log('hello1')

            var aquaticCreatures =  assignfund.filter(function(creature) {
                return creature.date == dateFund;
              });
             arrayData[i].assigned_funds=aquaticCreatures
          }
       
    // }
        }
        res.json(arrayData)

       
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
        .populate('manager_id')
        .populate('assigned_funds')

}
// Get daily_assigned_fund by shop Id
exports.getFundsByShopIdAndDate = (req, res) => {
    const ShopId = req.body.shop_id;
    const dateFund = req.body.date

    daily_assigned_fundModel.find({ shop_id: ShopId, date: dateFund }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('tycoon_id')
        .populate('shop_id')
}
// Get daily_assigned_fund by shop Id
exports.getFundsByShopIdAndCurrentYear = (req, res) => {
    const ShopId = req.body.shop_id;
    // var date = new Date();
    // var firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 1);
    // var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    // console.log(firstDay.toISOString())
    // console.log(lastDay.toISOString())
    const currentYear = new Date().getFullYear();
console.log(currentYear); // 👉️ 2023

const firstDay = new Date(currentYear, 0, 1);
console.log(firstDay.toISOString()); // 👉️ Sun Jan 01 2023

const lastDay = new Date(currentYear, 11, 31);
console.log(lastDay.toISOString());
    // const dateFund = req.body.date
    daily_assigned_fundModel.find({
        shop_id: req.body.shop_id,
        $or: [
            { "dateTime": { "$gte": firstDay.toISOString(), "$lte": lastDay.toISOString() } }
        ]
    }, (error, foundResult) => {
        if (error) {
            res.json(error)

        } else {
            res.json(foundResult)

        }
    })
    // daily_assigned_fundModel.find({ shop_id: ShopId, date: dateFund }, function (err, foundResult) {
    //     try {
    //         res.json({ data: foundResult, count: foundResult.length })
    //     } catch (err) {
    //         res.json(err)
    //     }
    // }).populate('tycoon_id')
    //     .populate('shop_id')
}
// Get daily_assigned_fund by shop Id
exports.getFundsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    daily_assigned_fundModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('tycoon_id')
        .populate('shop_id')
}

// Delete 
exports.deletedaily_assigned_fund = (req, res) => {
    const daily_assigned_fundId = req.params.daily_assigned_fundsId;
    daily_assigned_fundModel.findByIdAndDelete(daily_assigned_fundId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createdaily_assigned_fund = async (req, res) => {
    const Createddate = req.body.date;
    daily_assigned_fundModel.find({ tycoon_id: req.body.tycoon_id, shop_id: req.body.shop_id, date: moment(Createddate).format("DD/MM/YYYY") }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                shopsModel.find({ tycoon_id: req.body.tycoon_id, _id: req.body.shop_id }, (error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        // res.send(result)
                        if (result === undefined || result.length == 0) {
                            res.json({ data: result, message: "No Tycoon Exist for this Shop Id" })

                        } else {
                            const daily_assigned_fund = new daily_assigned_fundModel({
                                _id: mongoose.Types.ObjectId(),
                                tycoon_id: req.body.tycoon_id,
                                shop_id: req.body.shop_id,
                                amount: req.body.amount,
                                date: moment(Createddate).format("DD/MM/YYYY"),
                                dateTime:Createddate

                            });
                            daily_assigned_fund.save((error, result) => {
                                if (error) {
                                    res.send(error)
                                } else {
                                    // res.json({ data: result, message: "Created Successfully" })
                                    const updateData = {
                                        $push: {
                                            assigned_funds: result
                                        }
                                    }
                                    const options = {
                                        new: true
                                    }
                                    shopsModel.findByIdAndUpdate(req.body.shop_id, updateData, options, (error, result) => {
                                        if (error) {
                                            res.json(error.message)
                                        } else {
                                            res.send({ data: result, message: "Updated Successfully" })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })


            } else {
                res.json({ data: result, message: "daily_assigned_fund Already Exists for this Tycoon Id and Shop Id" })

            }
        }
    })

}
// Update 
exports.updatedaily_assigned_fund = async (req, res) => {
    const updateData = {
        amount: req.body.amount,
    }
    const options = {
        new: true
    }
    daily_assigned_fundModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



