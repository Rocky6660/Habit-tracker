const express = require('express');
const router = express.Router();
const {createHabit, getHabits} = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createHabit);
router.get('/gethabits', authMiddleware, getHabits);

module.exports = router;