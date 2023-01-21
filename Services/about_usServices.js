const about_usModel = require("../models/about_usModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All about_us 
exports.getAllabout_uss = (req, res) => {
    about_usModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get about_us 
exports.getSpecificabout_us = (req, res) => {
    const about_usId = req.params.about_usId;
    about_usModel.find({ _id: about_usId }, function (err, foundResult) {
        try {
            res.json({data:foundResult[0]})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deleteabout_us = (req, res) => {
    const about_usId = req.params.about_usId;
    about_usModel.findByIdAndDelete(about_usId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createabout_us = async (req, res) => {

    const about_usMessage = new about_usModel({
        _id: mongoose.Types.ObjectId(),
        about_us: req.body.about_us,
    })
    about_usMessage.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })

}
// Update 
exports.updateabout_us = async (req, res) => {
    const updateData = {
        about_us:req.body.about_us
    }
    const options = {
        new: true
    }
    about_usModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



