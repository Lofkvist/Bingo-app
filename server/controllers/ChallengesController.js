const Challenge = require("../models/ChallengeModel");
const mongoose = require('mongoose')

// GET all challenges
const getAllChallenges = async (req, res) => {
  try {
    const allChallenges = await Challenge.find({});
    res.status(200).json(allChallenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// POST a new challenge
const createChallenge = async (req, res) => {
  const { challenge, about } = req.body;

  try {
    const newChallenge = await Challenge.create({ challenge, about });
    res.status(200).json(newChallenge);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  createChallenge,
  getAllChallenges
};
