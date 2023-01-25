const mongoose = require("mongoose");
const cashierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gross_commission: String,
    net_comission: String,
    monthly_commision: String,
    yearly_commision: String,
    date: String,
}
);
module.exports = mongoose.model("comission", cashierSchema);