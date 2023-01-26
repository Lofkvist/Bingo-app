const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  challenge: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model("Challenge", ChallengeSchema);