const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
});

module.exports = mongoose.model("User", UserSchema);

//We import the Mongoose library and assign it to the constant mongoose.
//Then, we define a UserSchema using new mongoose.Schema() — this outlines the structure of user documents in the database, specifying that each user has a name, email, and password, all of which are strings.
//Finally, we create and export a Mongoose model named "User" based on the UserSchema. This model lets us interact with the MongoDB users collection in a structured and validated way.
