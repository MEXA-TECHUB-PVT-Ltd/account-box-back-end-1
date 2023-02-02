const mongoose = require("mongoose");
const daily_Assigned_fundSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   tycoon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    amount: String,
    date: String,
    dateTime:String
}
);
module.exports = mongoose.model("daily_Assigned_fund", daily_Assigned_fundSchema);