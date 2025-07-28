const Habits = require("../models/Habits");

const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    const userId = req.user.id;

    if (!title || title.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters long." });
    }

    const habit = new Habits({
      title,
      description,
      frequency,
      createdBy: userId,
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    console.error("Error in createHabit:", err);
    res
      .status(500)
      .json({ messsage: "Error creating habit", err: err.message || err });
  }
};

const getHabits = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habits.find({ createdBy: userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching habits" });
  }
};

const updateHabit = async (req, res) => {
  try {
    const habit = await Habits.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!habit) {
      return res
        .status(404)
        .json({ message: "Habit not found or unauthorized" });
    }

    const updatedHabit = await Habits.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: "Error updating Habit", err });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const userId = req.user.id;
    const habitId = req.params.id;

    const habit = await Habits.findByIdAndDelete({
      _id: habitId,
      createdBy: userId,
    });

    if (!habit) {
      return res
        .status(404)
        .json({ message: "Habit not found or unauthorized" });
    }

    res.json({ message: "Habit deleted successfully" });
  } catch (err) {
    console.error("Error deleting habit", err);
    res.status(500).json({ message: "Error Deleting Habit", err });
  }
};

const toggleCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habits.findById(id);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found." });
    }

    if (habit.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    habit.isCompleted = !habit.isCompleted;
    await habit.save();

    res.status(200).json({
      message: "Habit completion status toggled.",
      isCompleted: habit.isCompleted,
    });
  } catch (err) {
    console.error("Toggle error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleCompletion,
};
