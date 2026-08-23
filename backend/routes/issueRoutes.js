const express = require('express');
const router = express.Router();
const {
    createIssue,
    getMyIssues,
    getAllIssues,
    getIssueById,
    updateIssue
} = require('../controllers/issueController');
const { protect, adminOrSolver } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createIssue)
    .get(protect, adminOrSolver, getAllIssues);

router.route('/my').get(protect, getMyIssues);

router.route('/:id')
    .get(protect, getIssueById)
    .put(protect, adminOrSolver, updateIssue);

module.exports = router;
