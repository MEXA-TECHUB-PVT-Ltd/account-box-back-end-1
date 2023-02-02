const mongoose = require("mongoose");
const balance_accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    daily_assigned_fund_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'daily_Assigned_fund'
    },
    daily_assigned_fund:String,
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    cash_balance: String,
    admin_balance: String,
    expenses_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expenses'
    }],
    expenses_amount:String,
    shortage_status: Boolean,
    shortage_amount: String,
    date: String,
    dateTime:String,
}
);
module.exports = mongoose.model("balance_account", balance_accountSchema);