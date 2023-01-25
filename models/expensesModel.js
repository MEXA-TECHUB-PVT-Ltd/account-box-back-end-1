const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    tycoon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },

    reason_of_amount: String,
    amount: String,
    created_at: String,
}
);
module.exports = mongoose.model("expenses", expensesSchema);