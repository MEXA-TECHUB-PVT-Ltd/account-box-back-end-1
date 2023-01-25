const mongoose = require("mongoose");
const cashierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    gross_commission: String,
    net_comission: String,
    monthly_commision: String,
    yearly_commision: String,
    date_created: String,
}
);
module.exports = mongoose.model("comission", cashierSchema);