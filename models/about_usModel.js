const mongoose = require("mongoose");
const about_usSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    about_us: String,
}
);
module.exports = mongoose.model("about_us", about_usSchema);