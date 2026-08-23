const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Hardware', 'Software', 'Network', 'Wi-Fi', 'Printer', 'Login Problem', 'Internet', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical']
    },
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'In Progress', 'Resolved', 'Closed']
    },
    response: {
        type: String,
        default: ''
    },
    resolvedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);
