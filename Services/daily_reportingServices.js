const daily_reportingModel = require("../models/daily_reportingModel");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All daily_reporting 
exports.getAlldaily_reportings = (req, res) => {
    daily_reportingModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')

}
// Get daily_reporting 
exports.getSpecificdaily_reporting = (req, res) => {
    const daily_reportingId = req.params.daily_reportingsId;
    daily_reportingModel.find({ _id: daily_reportingId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }) .populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')
}
// Get daily_reporting by shop Id
exports.getFundsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    daily_reportingModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')
}
// Get daily_reporting by shop Id
exports.getFundsByShopIdAndStatus = (req, res) => {
    const ShopId = req.body.shop_id;
    const Status = req.body.status;

    daily_reportingModel.find({ shop_id: ShopId,status:Status }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')
}
// Get daily_reports by date
exports.getFundsByDate = (req, res) => {
    const CreateDate = req.body.date;
    daily_reportingModel.find({ date: moment(CreateDate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')
}
// Get daily_reports by date and shop_id
exports.getFundsByDateAndShopId = (req, res) => {
    const CreateDate = req.body.date;
    daily_reportingModel.find({shop_id:req.body.shop_id, date: moment(CreateDate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult, count: foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).populate('manager_id')
    .populate('shop_id')
    .populate('balance_account_id')
    .populate({
        path: 'balance_account_id',
        populate: {
          path: 'daily_assigned_fund_id',
          model: 'daily_Assigned_fund',
        }
      })
      .populate({
        path: 'balance_account_id',
        populate: {
          path: 'expenses_id',
          model: 'expenses',
        }
      })
    .populate('turnover_id')
    .populate('winning_id')
}

// Delete 
exports.deletedaily_reporting = (req, res) => {
    const daily_reportingId = req.params.daily_reportingsId;
    daily_reportingModel.findByIdAndDelete(daily_reportingId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createdaily_reporting = async (req, res) => {
    const Createddate = req.body.date;
    const daily_reporting = new daily_reportingModel({
        _id: mongoose.Types.ObjectId(),
        date: moment(Createddate).format("DD/MM/YYYY"),
        manager_id: req.body.manager_id,
        balance_account_id: req.body.balance_account_id,
        turnover_id: [],
        winning_id: [],
        status: req.body.status,
        shop_id:req.body.shop_id,
        ismodified: false,
        modified_at: null,
        comments_for_manager: req.body.comments_for_manager,

    });
    daily_reporting.save((error, result) => {
        if (error) {
            res.send(error)
        } else {

            res.json({ data: result, message: "Created Successfully" })
        }
    })



}
// Update status
exports.updatedaily_reporting = async (req, res) => {
    const updateData = {
        status: req.body.status,
        comments_for_manager:req.body.comments_for_manager
    }
    const options = {
        new: true
    }
    daily_reportingModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}
// Update Editable Access
exports.updatedaily_reportingEditable = async (req, res) => {
    const Modifieddate = req.body.modified_at;
    const updateData = {
        balance_account_id: req.body.balance_account_id,
        ismodified:true,
        modified_at:moment(Modifieddate).format("DD/MM/YYYY")
    }
    const options = {
        new: true
    }
    daily_reportingModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}
// Update 
exports.updateturnoverId = async (req, res) => {
    const updateData1 = {
        $push: {
            turnover_id: req.body.turnover_id,
        }
    }
    const options1 = {
        new: true
    }
    daily_reportingModel.findByIdAndUpdate(req.body._id, updateData1, options1, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Updated Successfully" })
        }
    })

}
// Update 
exports.updatewinningId = async (req, res) => {
    const updateData1 = {
        $push: {
            winning_id: req.body.winning_id,

        }
    }
    const options1 = {
        new: true
    }
    daily_reportingModel.findByIdAndUpdate(req.body._id, updateData1, options1, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Updated Successfully" })
        }
    })

}



