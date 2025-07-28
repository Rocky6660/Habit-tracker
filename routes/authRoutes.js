//It contains the HTTP routes (like /register, /login) that the frontend can call to perform authentication — like registering a user or logging them in.

const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authController")


//express.router lets us define a mini Express app just for routing
//keeps authentication routes from other routes
//we export this router later and pluf it into server.js or app.js

const User = require('../models/User');

//we defined the schema & model in models/User.js
//Now, to register or login a user, we will need to interact with 
//MongoDB -- so we import the User model
//without importing the model, we cant use functions like User.findone ()
//or user.create()

router.post("/register", registerUser);
router.post("/login", loginUser);

//this defines a postAPI endpoint at the touer /register
//this function when execute when a client like a frontend or postman makes a post request to /register
//async is used because we will uses await inside (for database operations)
//req is the request object, res is the response object

module.exports = router;