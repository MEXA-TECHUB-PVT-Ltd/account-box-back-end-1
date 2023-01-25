const Privacy_PolicyModel = require("../models/Privacy_PolicyModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All Privacy_Policy 
exports.getAllPrivacy_Policys = (req, res) => {
    Privacy_PolicyModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Privacy_Policy 
exports.getSpecificPrivacy_Policy = (req, res) => {
    const Privacy_PolicyId = req.params.Privacy_PolicyId;
    Privacy_PolicyModel.find({ _id: Privacy_PolicyId }, function (err, foundResult) {
        try {
            res.json({data:foundResult[0]})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    Privacy_PolicyModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Delete 
exports.deletePrivacy_Policy = (req, res) => {
    const Privacy_PolicyId = req.params.Privacy_PolicyId;
    Privacy_PolicyModel.findByIdAndDelete(Privacy_PolicyId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createPrivacy_Policy = async (req, res) => {

    const Privacy_PolicyMessage = new Privacy_PolicyModel({
        _id: mongoose.Types.ObjectId(),
        privacy_policy: req.body.privacy_policy,
    })
    Privacy_PolicyMessage.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })

}
// Update 
exports.updatePrivacy_Policy = async (req, res) => {
    const updateData = {
        privacy_policy:req.body.privacy_policy
    }
    const options = {
        new: true
    }
    Privacy_PolicyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



