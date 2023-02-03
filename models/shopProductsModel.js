const mongoose = require("mongoose");
const shopProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    tycoon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    created_at: String,
}
);
module.exports = mongoose.model("shopProduct", shopProductSchema);