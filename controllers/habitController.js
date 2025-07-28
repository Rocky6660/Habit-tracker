const Habits = require("../models/Habits");


const createHabit = async (req, res) => {
    try {
        const {title, description, frequency} = req.body;
        const userId = req.user.id;

        const habit =new Habits({
            title,
            description,
            frequency,
            createdBy: userId,
        });

        await habit.save();
        res.status(201).json(habit);
    } catch(err){
        console.error("Error in createHabit:", err);
        res.status(500).json({messsage: "Error creating habit", err: err.message || err});
    }
};

module.exports = {createHabit};