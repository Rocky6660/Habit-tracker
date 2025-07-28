//we are gonna define the variables here
// we are going to do that by 
// const is variable type
//then variable name
//then require("<particular dependency it is basesd on>")
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitroutes');

dotenv.config(); //We are loading the .env variables through this

const app = express();
app.use(cors());


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
    console.log("Server running on port 5000");
});
})
.catch((err) => console.error("MongoDB connection error:", err));