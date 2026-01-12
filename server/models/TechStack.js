const mongoose = require('mongoose');

const TechStackSchema = new mongoose.Schema({
    category: { type: String, required: true }, // e.g. "Frontend", "Backend"
    items: { type: [String], required: true } // e.g. ["React", "CSS"]
});

module.exports = mongoose.model('TechStack', TechStackSchema);
