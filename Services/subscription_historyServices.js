const subscription_historyModel = require("../models/subscription_historyModel");
const mongoose = require("mongoose");
const moment = require('moment');
const subscriptionPlansModel = require("../models/subscriptionPlanModel");
// Get All subscription_history 
exports.getAllsubscription_historys = (req, res) => {
    subscription_historyModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('subscription_plans_id').populate('tycoon_id')
}
// Get subscription_history 
exports.getSpecificsubscription_history = (req, res) => {
    const subscription_historyId = req.params.subscription_historyId;
    subscription_historyModel.find({ _id: subscription_historyId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('subscription_plans_id').populate('tycoon_id')
}
// Get subscription_history by tycoon Id
exports.getSpecificsubscription_historyByTycoon = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    subscription_historyModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('subscription_plans_id')
}
// Delete 
exports.deletesubscription_history = (req, res) => {
    const subscription_historyId = req.params.subscription_historyId;
    subscription_historyModel.findByIdAndDelete(subscription_historyId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createsubscription_history = async (req, res) => {
    const Createddate = req.body.start_date;
    const EndDate = req.body.end_date;
    subscription_historyModel.find({ tycoon_id: req.body.tycoon_id }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                subscriptionPlansModel.find({ _id: req.body.subscription_plans_id }, function (err, foundResult) {
                    if (error) {
                        res.send(error)
                    } else {
                        // res.send(result)
                        if (foundResult[0].is_free_trail = true) {
                            console.log("free")
                            const subscription_history = new subscription_historyModel({
                                _id: mongoose.Types.ObjectId(),
                                tycoon_id: req.body.tycoon_id,
                                subscription_plans_id: req.body.subscription_plans_id,
                                start_date: moment(Createddate).format("DD/MM/YYYY"),
                                end_date: moment(EndDate).format("DD/MM/YYYY"),
                                status: req.body.status


                            });
                            subscription_history.save((error, result) => {
                                if (error) {
                                    res.send(error)
                                } else {
                                    res.json({ data: result, message: "Created Successfully" })
                                }
                            })
                        } else {
                            console.log("Not free")
                            const subscription_history = new subscription_historyModel({
                                _id: mongoose.Types.ObjectId(),
                                tycoon_id: req.body.tycoon_id,
                                subscription_plans_id: req.body.subscription_plans_id,
                                transiction_id: req.body.transiction_id,
                                start_date: moment(Createddate).format("DD/MM/YYYY"),
                                end_date: moment(EndDate).format("DD/MM/YYYY"),
                                status: req.body.status
                            });
                            subscription_history.save((error, result) => {
                                if (error) {
                                    res.send(error)
                                } else {
                                    res.json({ data: result, message: "Created Successfully" })
                                }
                            })
                        }
                    }
                })
            } else {
                res.json({ data: result, message: "Subscription Plan Already Exists for this Tycoon" })

            }
        }
    })

}
// Update 
exports.updatesubscription_history = async (req, res) => {
    const Createddate = req.body.start_date;
    const EndDate = req.body.end_date;
                subscriptionPlansModel.find({ _id: req.body.subscription_plans_id }, function (err, foundResult) {
                    if (err) {
                        res.send(err)
                    } else {
                        // res.send(result)
                        if (foundResult[0].is_free_trail===true) {
                            console.log("free")
                            console.log(foundResult[0].is_free_trail)

                            const updateData = {
                                subscription_plans_id: req.body.subscription_plans_id,
                                start_date: moment(Createddate).format("DD/MM/YYYY"),
                                end_date: moment(EndDate).format("DD/MM/YYYY"),
                                transiction_id: null,
                                status: req.body.status
                            }
                            const options = {
                                new: true
                            }
                            subscription_historyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
                                if (error) {
                                    res.json(error.message)
                                } else {
                                    res.send({ data: result, message: "Updated Successfully" })
                                }
                            })
                        } else {
                            console.log("Not free")
                            console.log(foundResult[0].is_free_trail)
                            const updateData = {
                                subscription_plans_id: req.body.subscription_plans_id,
                                start_date: moment(Createddate).format("DD/MM/YYYY"),
                                end_date: moment(EndDate).format("DD/MM/YYYY"),
                                transiction_id: req.body.transiction_id,
                                status: req.body.status
                            }
                            const options = {
                                new: true
                            }
                            subscription_historyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
                                if (error) {
                                    res.json(error.message)
                                } else {
                                    res.send({ data: result, message: "Updated Successfully" })
                                }
                            })
                        }
                    }
                })
}



