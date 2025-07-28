const express = require('express');
const router = express.Router();
const {createHabit, getHabits, updateHabit, deleteHabit, toggleCompletion} = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createHabit);
router.get('/gethabits', authMiddleware, getHabits);
router.put('/update/:id', authMiddleware, updateHabit);
router.delete("/delete/:id", authMiddleware, deleteHabit);
router.patch("/toggle/:id", authMiddleware, toggleCompletion)
module.exports = router;