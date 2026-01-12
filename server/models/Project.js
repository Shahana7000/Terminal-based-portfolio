const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techBucket: { type: [String], default: [] }, // e.g. ["React", "Node"]
    link: { type: String }, // Github or Live link
    command: { type: String } // command to trigger this project detail if specific
});

module.exports = mongoose.model('Project', ProjectSchema);
