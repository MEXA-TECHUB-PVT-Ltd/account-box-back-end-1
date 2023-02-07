const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: String,
    created_at: String,
    tycoon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
}
);
module.exports = mongoose.model("products", productSchema);