const mongoose = require("mongoose");
const shopSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_no: String,
    tycoon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    name: String,
    img: String,
    created_at: String,
    assigned_funds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'daily_Assigned_fund'
        }
    ],
    shop_products: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'

    }],
    shop_cashiers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cashier'
        }
    ]
    // shop_details:Array
}
);
module.exports = mongoose.model("shop", shopSchema);