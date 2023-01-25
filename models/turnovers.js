const mongoose = require("mongoose");
const turnoversSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    cashier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cashier'
    },
    amount: String,
    created_at: String,
    dateTime:String

}
);
module.exports = mongoose.model("turnovers", turnoversSchema);