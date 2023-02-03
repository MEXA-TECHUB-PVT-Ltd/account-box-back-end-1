const managersModel = require("../models/managersModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')
const moment = require('moment');

// Get All Manager 
exports.getAllManagers = (req, res) => {
    managersModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Manager 
exports.getSpecificManager = (req, res) => {
    const ManagerId = req.params.ManagerId;
    managersModel.find({ _id: ManagerId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Get Manager 
exports.getManagerByTycoonId = (req, res) => {
    const Tycoonid = req.body.tycoon_id;
    managersModel.find({ tycoon_id: Tycoonid }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete All
exports.deleteAll = (req, res) => {
    managersModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Login 
exports.loginManager = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    managersModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    res.json({data:result,message:"Found Successfully"})
                } else {
                    res.json({message:"Invalid Password"})
                }
            } else {
                res.json({message:"Email Not Found"})
            }
        }
    })
}
// Forget Password Otp 
exports.forgetPasswordManager = async (req, res) => {
    let data = await managersModel.findOne({
        email: req.body.email
    });
    const responseType = {};
    responseType.data = data
    console.log(data)
    if (data) {
        let otpcode = Math.floor((Math.random() * 10000) + 1);
        let otpData = new forgetPasswordModel({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            code: otpcode,
            expiresIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = 'Success'
        mailer(req.body.email, otpcode)
        console.log(otpcode)
        responseType.message = 'Please check Your Email Id';
        responseType.otp = otpcode;
    } else {
        responseType.statusText = 'error'
        responseType.message = 'Email Id not Exist';
    }
    res.status(200).json(responseType)
}
// OTP TWILIO 
const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'rimshanimo22@gmail.com',
            pass: 'oespmdfxhmbhrxgd'
        }
    });
    transporter.verify().then(console.log).catch(console.error);

    // send mail with defined transport object
    var mailOptions = {
        from: 'rimshanimo22@gmail.com',
        to: email,
        subject: `OTP code is ` + otp,
        text: `Email Verification :OTP code is ` + otp,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent ' + info.response)
        }
    });
}
// Delete 
exports.deleteManager = (req, res) => {
    const ManagerId = req.params.ManagerId;
    managersModel.findByIdAndDelete(ManagerId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createManager = async (req, res) => {
    const Createddate= req.body.created_at;

    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    managersModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Manager = new managersModel({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    photo: req.body.photo,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                Manager.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({data:result,message:"Created Successfully"})
                    }
                })

            } else {
                res.json({data:result,message:"Email Already Exist"})

            }
        }
    })

}
// Update 
exports.updateManager = async (req, res) => {
    const updateData = {
        name: req.body.name,
        photo: req.body.photo,
    }
    const options = {
        new: true
    }
    managersModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}
// Update Password
exports.updateManagerPassword = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const updateData = {
        email: req.body.email,
        password: hashedPassword,
    }
    const options = {
        new: true
    }
    managersModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Password Successfully"})
        }
    })
}



