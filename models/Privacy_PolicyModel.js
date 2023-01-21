const mongoose = require("mongoose");
const privacy_policySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    privacy_policy: String,
}
);
module.exports = mongoose.model("privacy_policy", privacy_policySchema);