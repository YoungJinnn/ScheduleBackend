const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
    User_id: {type: mongoose.Schema.Types.ObjectId},
    Title: String,
    StartDate: Date,
    EndDate: Date,
    Details: String,
    State: String
}, {versionKey: false, timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema, 'Schedule');
