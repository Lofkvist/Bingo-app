const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User with name, challenges given and their quiz answers
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  challenges: [{ description: String, isCompleted: Boolean }],
});

module.exports = mongoose.model("User", UserSchema);
