const balance_accountModel = require("../models/balance_accountModel");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");
const daily_assigned_fund = require("../models/daily_assigned_fund");
const expensesModel = require("../models/expensesModel");

// Get All balance_account 
exports.getAllbalance_accounts = (req, res) => {
    balance_accountModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('daily_assigned_fund_id')
    .populate('shop_id')
    .populate('manager_id')
    .populate('expenses_id')


}
// Get balance_account 
exports.getSpecificbalance_account = (req, res) => {
    const balance_accountId = req.params.balance_accountsId;
    balance_accountModel.find({ _id: balance_accountId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('daily_assigned_fund_id')
    .populate('shop_id')
    .populate('manager_id')
    .populate('expenses_id')
}
// Get balance_account 
exports.getbalance_accountByMangerId= (req, res) => {
    const balance_accountId = req.params.manager_id;
    balance_accountModel.find({ manager_id: balance_accountId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('daily_assigned_fund_id')
    .populate('shop_id')
    .populate('manager_id')
    .populate('expenses_id')
}
// Delete All
exports.deleteAll = (req, res) => {
    balance_accountModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Get balance_account by shop Id
exports.getAllBalanceAccountByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    balance_accountModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).sort({ date: 'desc' })
    .populate('daily_assigned_fund_id')
    .populate('shop_id')
    .populate('manager_id')
    .populate('expenses_id')
}
// Get balance_account by shop Id
exports.getAllBalanceAccountByDate = (req, res) => {
    const DateData = req.params.date;
    balance_accountModel.find({ date: moment(DateData).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('daily_assigned_fund_id')
    .populate('shop_id')
    .populate('manager_id')
    .populate('expenses_id')
}

// Delete 
exports.deletebalance_account = (req, res) => {
    const balance_accountId = req.params.balance_accountsId;
    balance_accountModel.findByIdAndDelete(balance_accountId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createbalance_account = async (req, res) => {
    const Createddate = req.body.date;
    const ShopId = req.body.shop_id;
    balance_accountModel.find({ shop_id: ShopId, date: moment(Createddate).format("DD/MM/YYYY") }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                console.log("empty")
                daily_assigned_fund.find({ shop_id: ShopId, date: moment(Createddate).format("DD/MM/YYYY") }, (error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        if (result === undefined || result.length == 0) {
                            res.json({ message: "No Daily Assigned Fund Found for this ShopId And Date" })
                        } else {
                            const DailyAssignedFundId = result[0]._id
                            const AmountDailyAssignedFund = result[0].amount

                            shopsModel.find({ _id: ShopId }, (error, result) => {
                                if (error) {
                                    res.send(error)
                                } else {
                                    if (result[0].manager_id === undefined || result[0].manager_id == '') {
                                        res.json({ message: "No Manger Assigned for this ShopId" })
                                    } else {
                                        // res.send(result)
                                        const ManagerId = result[0].manager_id
                                        expensesModel.find({ shop_id: ShopId, created_at: moment(Createddate).format("DD/MM/YYYY") }, (error, result) => {
                                            if (error) {
                                                res.send(error)
                                            } else {
                                                const ArrExpense = result
                                                // res.send(result)
                                                // Calculate Sum of all Expenses 
                                                var sum = 0;
                                                for (var i = 0; i < result.length; i++) {
                                                    sum += parseInt(result[i].amount)
                                                }
                                                // Calculate Sum of all Expenses  + Cash Balance  + Admin Balance
                                                // const Total_amount_included = sum + parseInt(req.body.cash_balance) + parseInt(req.body.admin_balance)
                                                // Check Shortage 
                                                // var shortage_status = req.body.shortage_status;
                                                // const shortage_status=req.body.shortage_status
                                                let shortage_amount = 0;
                                                if (req.body.shortage_status === true) {
                                                    // shortage_status = false
                                                    shortage_amount = req.body.shortage_amount;
                                                    console.log("shortage_amountdfdf")

                                                } else {
                                                    // shortage_status = true
                                                    shortage_amount = 0;
                                                    console.log("shortage_amount")


                                                }

                                                console.log(shortage_amount)

                                                // Creating Balance Amount 

                                                const balance_account = new balance_accountModel({
                                                    _id: mongoose.Types.ObjectId(),
                                                    daily_assigned_fund_id: DailyAssignedFundId,
                                                    daily_assigned_fund: AmountDailyAssignedFund,
                                                    shop_id: req.body.shop_id,
                                                    manager_id: ManagerId,
                                                    cash_balance: req.body.cash_balance,
                                                    admin_balance: req.body.admin_balance,
                                                    expenses_amount: sum,
                                                    shortage_status: req.body.shortage_status,
                                                    shortage_amount: shortage_amount,
                                                    date: moment(Createddate).format("DD/MM/YYYY")

                                                });
                                                balance_account.save((error, result) => {
                                                    if (error) {
                                                        res.send(error)
                                                    } else {
                                                        const updateData1 = {
                                                            $push: {
                                                                expenses_id: ArrExpense,
                                                            }
                                                        }
                                                        const options1 = {
                                                            new: true
                                                        }
                                                        balance_accountModel.findByIdAndUpdate(result._id, updateData1, options1, (error, result) => {
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


                                }
                            })
                        }


                    }
                })
            } else {
                res.json({ data: result, message: "Balance Account Already Exists for this date and Shop Id" })

            }
        }
    })



}
// Update Shortage Status
exports.updatebalance_account = async (req, res) => {
    const updateData = {
        shortage_status: req.body.shortage_status,
        shortage_amount: req.body.shortage_amount,
    }
    const options = {
        new: true
    }
    balance_accountModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



