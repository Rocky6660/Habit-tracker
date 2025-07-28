const express = require('express');
const router = express.Router();
const {createHabit, getHabits, updateHabit} = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createHabit);
router.get('/gethabits', authMiddleware, getHabits);
router.put('/update/:id', authMiddleware, updateHabit);

module.exports = router;