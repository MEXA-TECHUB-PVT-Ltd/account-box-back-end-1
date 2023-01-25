const mongoose = require("mongoose");
const winningsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    tycoon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    name: String,
    amount: String,
    created_at: String,

}
);
module.exports = mongoose.model("winnings", winningsSchema);