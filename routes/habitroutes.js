const express = require('express');
const router = express.Router();
const {createHabit} = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createHabit);

module.exports = router;