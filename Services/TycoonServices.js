const tycoonModel = require("../models/tycoonModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')
const moment = require('moment');

// Get All Tycoon 
exports.getAllTycoons = (req, res) => {
    tycoonModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Tycoon 
exports.getSpecificTycoon = (req, res) => {
    const TycoonId = req.params.TycoonId;
    tycoonModel.find({ _id: TycoonId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Get Tycoon 
exports.getSpecificTycoonMonthly = async(req, res) => {
    // const data=await tycoonModel.aggregate().sortByCount("created_at")
    const data=await tycoonModel.aggregate(
        [ 
        { $unwind: "$created_at" },  
        { $sortByCount: "$created_at" },
        // { $sort: { created_at: -1 } }
     ] 
    )
      res.json(data)

}
// Login 
exports.loginTycoon = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    tycoonModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    // res.json({data:result,message:"Found Successfully"})
                    const updateData = {
                        isLogin:true
                    }
                    const options = {
                        new: true
                    }
                    tycoonModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                        if (error) {
                            res.json(error.message)
                        } else {
                            res.json({data:result,message:"Login Successfully"})
                        }
                    })
                } else {
                    res.json({message:"Invalid Password"})
                }
            } else {
                res.json({message:"Email Not Found"})
            }
        }
    })
}
// Logout 
exports.logoutTycoon = async (req, res) => {
    const updateData = {
        isLogin:false
    }
    const options = {
        new: true
    }
    tycoonModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Logout Successfully"})
        }
    })
}
// Forget Password Otp 
exports.forgetPasswordTycoon = async (req, res) => {
    let data = await tycoonModel.findOne({
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
exports.deleteTycoon = (req, res) => {
    const TycoonId = req.params.TycoonId;
    tycoonModel.findByIdAndDelete(TycoonId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createTycoon = async (req, res) => {
    const Createddate= req.body.created_at;

    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    tycoonModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Tycoon = new tycoonModel({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    profile_image: req.body.profile_image,
                    status: req.body.status,
                    no_of_shops_created: req.body.no_of_shops_created,
                    created_at:moment(Createddate).format("DD/MM/YYYY"),
                    isLogin:false

                });
                Tycoon.save((error, result) => {
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
exports.updateTycoon = async (req, res) => {
    const updateData = {
        username: req.body.username,
        profile_image: req.body.profile_image,
        status: req.body.status,
        no_of_shops_created: req.body.no_of_shops_created,
    }
    const options = {
        new: true
    }
    tycoonModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}
// Update Password
exports.updateTycoonPassword = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const updateData = {
        email: req.body.email,
        password: hashedPassword,
    }
    const options = {
        new: true
    }
    tycoonModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Password Successfully"})
        }
    })
}



