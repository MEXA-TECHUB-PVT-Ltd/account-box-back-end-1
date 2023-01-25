const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_type:{
        type: String,
        enum: ['manager', 'tycoon']
    },
    notification_type:{
        type: String,
        enum: ['Report edit request', 
        'Send daily report',
        'Remainder for cash deposit',
        'Edit request has been approved',
        'Report is unapproved']
    },
    from: String,
    to: String,
    msgContent: String,
    dateTime: String,
    readStatus: Boolean,
    date:String
}
);
module.exports = mongoose.model("notification", notificationSchema);