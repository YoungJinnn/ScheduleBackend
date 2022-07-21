const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Id: String,
    Name: String,
    Phone: String,
    Password: String
}, {versionKey: false, timestamps: true });

module.exports = mongoose.model('User', userSchema, 'User');

