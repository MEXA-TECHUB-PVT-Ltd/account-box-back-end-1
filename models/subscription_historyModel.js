const mongoose = require("mongoose");
const subscription_historySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tycoon_id:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    subscription_plans_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription_plans'
    },
    transiction_id: String,
    start_date: String,
    end_date: String,
    status: String,
}
);
module.exports = mongoose.model("subscription_history", subscription_historySchema);