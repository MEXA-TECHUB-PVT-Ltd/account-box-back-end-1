const commissionModel = require("../models/commissionModel");
const mongoose = require("mongoose");
const moment = require('moment');

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
// Delete All
exports.deleteAll = (req, res) => {
    commissionModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

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
    var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first - 6; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)).toString();
var lastday = new Date(curr.setDate(last)).toString();
console.log(`${firstday} and ${lastday}`)
    // const Createddate= req.body.created_at;
    // commissionModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         // res.send(result)
    //         if (result === undefined || result.length == 0) {
    //             const comission = new commissionModel({
    //                 _id: mongoose.Types.ObjectId(),
    //                 name: req.body.name,
    //                 phone_no: req.body.phone_no,
    //                 gender: req.body.gender,
    //                 age:req.body.age,
    //                 created_at:moment(Createddate).format("DD/MM/YYYY")

    //             });
    //             comission.save((error, result) => {
    //                 if (error) {
    //                     res.send(error)
    //                 } else {
    //                     res.json({ data: result, message: "Created Successfully" })
    //                 }
    //             })

    //         } else {
    //             res.json({ data: result, message: "comission Already Exists for this name" })

    //         }
    //     }
    // })

}
// Update 
exports.updatecomission = async (req, res) => {
    const updateData = {
        name: req.body.name,
        phone_no: req.body.phone_no,
        gender: req.body.gender,
        age:req.body.age,
    }
    const options = {
        new: true
    }
    commissionModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



