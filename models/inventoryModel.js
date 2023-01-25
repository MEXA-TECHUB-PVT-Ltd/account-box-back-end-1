const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
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
    serial_no: String,
    equipment_name: String,
    quantity: String,
    created_by: String,
}
);
module.exports = mongoose.model("inventory", inventorySchema);