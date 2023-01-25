const SubscriptionPlansModel = require("../models/subscriptionPlanModel");
const mongoose = require("mongoose");
// Get All SubscriptionPlan 
exports.getAllSubscriptionPlans = (req, res) => {
    SubscriptionPlansModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get SubscriptionPlan 
exports.getSpecificSubscriptionPlan = (req, res) => {
    const SubscriptionPlanId = req.params.SubscriptionPlanId;
    SubscriptionPlansModel.find({ _id: SubscriptionPlanId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deleteSubscriptionPlan = (req, res) => {
    const SubscriptionPlanId = req.params.SubscriptionPlanId;
    SubscriptionPlansModel.findByIdAndDelete(SubscriptionPlanId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    SubscriptionPlansModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createSubscriptionPlan = async (req, res) => {
    SubscriptionPlansModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const SubscriptionPlan = new SubscriptionPlansModel({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    no_of_shops: req.body.no_of_shops,
                    price_per_month: req.body.price_per_month,
                    is_free_trail: req.body.is_free_trail,

                });
                SubscriptionPlan.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Subscription Plan Already Exists for this name" })

            }
        }
    })

}
// Update 
exports.updateSubscriptionPlan = async (req, res) => {
    const updateData = {
        name: req.body.name,
        no_of_shops: req.body.no_of_shops,
        price_per_month: req.body.price_per_month,
        is_free_trail: req.body.is_free_trail,
    }
    const options = {
        new: true
    }
    SubscriptionPlansModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



