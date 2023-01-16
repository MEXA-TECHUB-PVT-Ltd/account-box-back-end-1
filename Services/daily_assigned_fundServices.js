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
// Get daily_assigned_fund by Tycoon Id and date 
exports.getFundsByTycoonIdAndDate = (req, res) => {
    const TycoonId = req.body.tycoon_id;
    const dateFund = req.body.date
    // const Result=shopsModel.aggregate([
    //     { $match: { tycoon_id: TycoonId}},
    //     { $unwind: '$assigned_funds'},
    //     // { $match: {'assigned_funds.date':dateFund}}
    // ])
    //     res.json(Result)
    shopsModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            let arrayData = foundResult
            let arrayTemp = [];
            let assignfund =[];

            // res.json(arrayData)
            for (let i = 0; i < arrayData.length; i++) {
                  assignfund=arrayData[i].assigned_funds
                // arrayTemp.push(arrayData[i])
                var aquaticCreatures =  assignfund.filter(function(creature) {
                    return creature.date == dateFund;
                  });
                 arrayData[i].assigned_funds=aquaticCreatures
                // for(let j=0;j<arrayData[i].assigned_funds.length;j++){
                // console.log("j", j)
                // // var newArray = arrayData[i].assigned_funds;
                // // const result = newArray.filter(word => word.amount ===20);
               
                // // console.log(newArray);
                // // arrayTemp=arrayTemp[i]
                // // arrayTemp[i].assigned_funds.findIndex(x => x.date === dateFund);



                // }
                res.json(arrayData)
            }
            // res.json(arrayTemp)

            // res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
        .populate('manager_id')
        .populate('assigned_funds')

    // { "$lookup": {
    //     "from": "test",
    //     "localField": "id",
    //     "foreignField": "contain",
    //     "as": "childs"
    // }}

    // array1 = shopsModel.aggregate([
    //     {
    //         $lookup: {
    //             from:"daily_assigned_fund",
    //             localField:"_id",
    //             foreignField:"shop_id",
    //             as:"shop_details"
    //         }
    //     }
    // ]);
    // res.json(array1)



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
                                date: moment(Createddate).format("DD/MM/YYYY")

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



