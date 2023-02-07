const mongoose = require("mongoose");
const cashierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone_no: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: String,
    created_at: String,
    tycoon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
}
);
module.exports = mongoose.model("cashier", cashierSchema);