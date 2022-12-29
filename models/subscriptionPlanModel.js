const mongoose = require("mongoose");
const subscriptionPlansSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    no_of_shops: String,
    price_per_month: String,
    is_free_trail: Boolean,
}
);
module.exports = mongoose.model("subscription_plans", subscriptionPlansSchema);