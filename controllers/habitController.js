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

const getHabits = async (req,res) => {
    try {
        const userId = req.user.id;
        const habits = await Habits.find({createdBy : userId});
        res.json(habits);
    } catch(err){
        res.status(500).json({message: "Server error while fetching habits"});
    }
};

module.exports = {createHabit, getHabits};