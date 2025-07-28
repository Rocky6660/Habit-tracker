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

const updateHabit = async (req,res) => {
    try {
        const habit = await Habits.findOne({_id: req.params.id, createdBy: req.user.id});

        if(!habit){
            return res.status(404).json({message: "Habit not found or unauthorized"});
        }

        const updatedHabit = await Habits.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(updatedHabit);
    } catch(err){
        res.status(500).json({message: "Error updating Habit", err})
    }
};

module.exports = {createHabit, getHabits, updateHabit};