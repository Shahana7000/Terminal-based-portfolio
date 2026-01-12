const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    link: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Resume', ResumeSchema);
