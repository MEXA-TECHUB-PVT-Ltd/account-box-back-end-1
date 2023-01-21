const terms_and_conditionsModel = require("../models/terms_and_conditionsModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All terms_and_conditions 
exports.getAllterms_and_conditionss = (req, res) => {
    terms_and_conditionsModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get terms_and_conditions 
exports.getSpecificterms_and_conditions = (req, res) => {
    const terms_and_conditionsId = req.params.terms_and_conditionsId;
    terms_and_conditionsModel.find({ _id: terms_and_conditionsId }, function (err, foundResult) {
        try {
            res.json({data:foundResult[0]})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deleteterms_and_conditions = (req, res) => {
    const terms_and_conditionsId = req.params.terms_and_conditionsId;
    terms_and_conditionsModel.findByIdAndDelete(terms_and_conditionsId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createterms_and_conditions = async (req, res) => {

    const terms_and_conditionsMessage = new terms_and_conditionsModel({
        _id: mongoose.Types.ObjectId(),
        terms_and_conditions: req.body.terms_and_conditions,
    })
    terms_and_conditionsMessage.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })

}
// Update 
exports.updateterms_and_conditions = async (req, res) => {
    const updateData = {
        terms_and_conditions:req.body.terms_and_conditions
    }
    const options = {
        new: true
    }
    terms_and_conditionsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



