const commissionModel = require("../models/commissionModel");
const mongoose = require("mongoose");
const moment = require('moment');
const balance_accountModel = require("../models/balance_accountModel");
const debtsModel = require("../models/debtsModel");

// Get All comission 
exports.getAllcomissions = (req, res) => {
    commissionModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get comission 
exports.getSpecificcomission = (req, res) => {
    const comissionId = req.params.comissionId;
    commissionModel.find({ _id: comissionId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get comission by shop Id 
exports.getSpecificcomissionByShopId = (req, res) => {
    const comissionId = req.body.shop_id;
    commissionModel.find({ shop_id: comissionId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    commissionModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Delete 
exports.deletecomission = (req, res) => {
    const comissionId = req.params.comissionId;
    commissionModel.findByIdAndDelete(comissionId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createcomission = async (req, res) => {
    
    const sdate = req.body.startDate
    const edate = req.body.endDate
    const gross_commission = req.body.gross_commission
    const dateMonthly = req.body.commision_created_at
    console.log(dateMonthly.slice(0, 7))
    const YearData = dateMonthly.slice(0, 4)
    const MonthData = dateMonthly.slice(0, 7)

    let Cash_Balance = 0
    let Expense = 0
    let Debts = 0
    let NetCommission = 0
    let YearlyComm = 0
    let MonthlyComm = 0

    balance_accountModel.find({
        shop_id: req.body.shop_id,
        $or: [
            { "dateTime": { "$gte": sdate, "$lte": edate } }
        ]
    }, (error, foundResult) => {
        if (error) {
            res.json(error)

        } else {
            let balance_account = foundResult;
            if (balance_account.length === 0) {
                Cash_Balance = 0
                Expense = 0
                debtsModel.find({
                    shop_id: req.body.shop_id,
                    $or: [
                        { "dateTime": { "$gte": sdate, "$lte": edate } }
                    ]
                }, (error, foundResult) => {
                    if (error) {
                        res.json(error)

                    } else {
                        // res.json(foundResult)
                        let debts = foundResult;
                        if (debts.length === 0) {
                            Debts = 0

                        } else {
                            for (var i = 0; i < debts.length; i++) {
                                Debts = parseInt(Debts) + parseInt(debts[i].amount)
                            }
                        }
                        NetCommission = parseInt(Cash_Balance) - (parseInt(Expense) + parseInt(Debts)) / parseInt(100) * parseInt(gross_commission)
                        console.log(`NetCommission: ${NetCommission} `)
                        commissionModel.find({
                            shop_id: req.body.shop_id,
                            "date_created": { $regex: YearData, $options: 'i' }

                        }, (error, result) => {
                            if (error) {
                                res.send(error)
                            } else {
                                if (result.length === 0) {
                                    YearlyComm = 0
                                } else {
                                    for (var i = 0; i < result.length; i++) {
                                        YearlyComm = parseInt(YearlyComm) + parseInt(result[i].net_comission)
                                    }
                                }

                                console.log(YearlyComm)
                                commissionModel.find({
                                    shop_id: req.body.shop_id,
                                    "date_created": { $regex: MonthData, $options: 'i' }
                                }, (error, result) => {
                                    if (error) {
                                        res.send(error)
                                    } else {
                                        // res.send(result)
                                        if (result.length === 0) {
                                            MonthlyComm = 0
                                        } else {
                                            for (var i = 0; i < result.length; i++) {
                                                MonthlyComm = parseInt(MonthlyComm) + parseInt(result[i].net_comission)
                                            }
                                        }
                                        console.log(MonthlyComm)
                                        const commAdd = new commissionModel({
                                            _id: mongoose.Types.ObjectId(),
                                            shop_id: req.body.shop_id,
                                            gross_commission: req.body.gross_commission,
                                            manager_id: req.body.manager_id,
                                            net_comission: NetCommission,
                                            monthly_commision: MonthlyComm,
                                            yearly_commision: YearlyComm,
                                            date_created: req.body.commision_created_at
                                        });
                                        commAdd.save((error, result) => {
                                            if (error) {
                                                res.send(error)
                                            } else {
                                                res.json({ data: result, message: "Created Successfully" })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                for (var i = 0; i < balance_account.length; i++) {
                    Cash_Balance = parseInt(Cash_Balance) + parseInt(balance_account[i].cash_balance)
                    Expense = parseInt(Expense) + parseInt(balance_account[i].expenses_amount)
                }
                console.log(`cash Balance :${Cash_Balance} and Expense :${Expense}`)
                debtsModel.find({
                    shop_id: req.body.shop_id,
                    $or: [
                        { "dateTime": { "$gte": sdate, "$lte": edate } }
                    ]
                }, (error, foundResult) => {
                    if (error) {
                        res.json(error)

                    } else {
                        // res.json(foundResult)
                        let debts = foundResult;
                        if (debts.length === 0) {
                            Debts = 0
                        } else {
                            for (var i = 0; i < debts.length; i++) {
                                Debts = parseInt(Debts) + parseInt(debts[i].amount)
                            }
                        }
                        NetCommission = parseInt(Cash_Balance) - (parseInt(Expense) + parseInt(Debts)) / parseInt(100) * parseInt(gross_commission)
                        console.log(`NetCommission: ${NetCommission} `)
                        commissionModel.find({
                            shop_id: req.body.shop_id,
                            "date_created": { $regex: YearData, $options: 'i' }
                        }, (error, result) => {
                            if (error) {
                                res.send(error)
                            } else {
                                if (result.length === 0) {
                                    YearlyComm = 0
                                } else {
                                    for (var i = 0; i < result.length; i++) {
                                        YearlyComm = parseInt(YearlyComm) + parseInt(result[i].net_comission)
                                    }
                                }

                                console.log(YearlyComm)
                                // yearly
                                commissionModel.find({
                                    shop_id: req.body.shop_id,
                                    "date_created": { $regex: MonthData, $options: 'i' }

                                }, (error, result) => {
                                    if (error) {
                                        res.send(error)
                                    } else {
                                        // res.send(result)
                                        if (result.length === 0) {
                                            MonthlyComm = 0
                                        } else {
                                            for (var i = 0; i < result.length; i++) {
                                                MonthlyComm = parseInt(MonthlyComm) + parseInt(result[i].net_comission)
                                            }
                                        }

                                        console.log(MonthlyComm)
                                        // Add Data 
                                        const commAdd = new commissionModel({
                                            _id: mongoose.Types.ObjectId(),
                                            gross_commission: req.body.gross_commission,
                                            shop_id: req.body.shop_id,
                                            manager_id: req.body.manager_id,
                                            net_comission: NetCommission,
                                            monthly_commision: MonthlyComm,
                                            yearly_commision: YearlyComm,
                                            date_created: req.body.commision_created_at
                                        });
                                        commAdd.save((error, result) => {
                                            if (error) {
                                                res.send(error)
                                            } else {
                                                res.json({ data: result, message: "Created Successfully" })
                                            }
                                        })
                                    }
                                })
                            }
                        })



                    }
                })
            }



        }
    })


}




