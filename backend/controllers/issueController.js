const Issue = require('../models/Issue');

const createIssue = async (req, res) => {
    try {
        const { title, category, description, priority } = req.body;

        if (!title || !category || !description || !priority) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Generate Ticket ID
        const lastIssue = await Issue.findOne().sort({ createdAt: -1 });
        let nextIdNumber = 1001;
        if (lastIssue && lastIssue.ticketId && lastIssue.ticketId.startsWith('IT-')) {
            const lastIdNumber = parseInt(lastIssue.ticketId.split('-')[1]);
            if (!isNaN(lastIdNumber)) {
                nextIdNumber = lastIdNumber + 1;
            }
        }
        const ticketId = `IT-${nextIdNumber}`;

        const issue = await Issue.create({
            ticketId,
            userId: req.user.id,
            title,
            category,
            description,
            priority
        });

        res.status(201).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyIssues = async (req, res) => {
    try {
        const issues = await Issue.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('userId', 'name email');

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        // Only allow admin/solver or the user who created it
        if (req.user.role === 'user' && issue.userId._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this issue' });
        }

        res.status(200).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateIssue = async (req, res) => {
    try {
        const { status, response } = req.body;
        
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        if (status) issue.status = status;
        if (response !== undefined) issue.response = response;
        
        if (status === 'Resolved' || status === 'Closed') {
            issue.resolvedAt = new Date();
        }

        const updatedIssue = await issue.save();
        res.status(200).json(updatedIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createIssue,
    getMyIssues,
    getAllIssues,
    getIssueById,
    updateIssue
};
