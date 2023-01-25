const mongoose = require("mongoose");
const debtsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    tycoon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    name: String,
    amount: String,
    threshold_date: String,
    created_at: String,
    is_created_by_manager:Boolean,
    debt_status: {
        type: String,
        enum: ['completed', 'ongoing']
    },
}
);
module.exports = mongoose.model("debts", debtsSchema);