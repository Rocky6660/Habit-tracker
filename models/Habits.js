const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String, 
        default: "",
    },
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
    isCompleted: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

module.exports = mongoose.model("Habits", HabitSchema);