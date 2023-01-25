const mongoose = require("mongoose");
const managersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    name: String,
    photo: String,
    created_at: String,
    shop_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    }]
}
);
module.exports = mongoose.model("managers", managersSchema);