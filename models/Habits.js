const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: String,
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "daily",
    },
    completedDates : {
        type: [Date],
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Habits", HabitSchema);