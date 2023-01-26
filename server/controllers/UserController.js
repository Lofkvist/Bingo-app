const User = require("../models/UserModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const idValidMongooseId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Entered id is invalid" });
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { firstName, challenges, password } = req.body;

  try {

    const user = await User.create({ firstName, password, challenges });

    const token = jwt.sign(
      { id: user._id, firstName: firstName },
      process.env.JWT_SECRET,
      { expiresIn: 3000 }
    );

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST: login user
const LoginUser = async (req, res) => {
  const { firstName, password } = req.body;

  const userWithFirstName = await User.findOne({ firstName: firstName }).catch(
    (err) => console.log({ error: err })
  );

  if (!userWithFirstName || userWithFirstName.password !== password) {
    return res.status(400).json({ error: "Password or email does not match" });
  }

  const token = jwt.sign(
    { id: userWithFirstName._id, firstName: userWithFirstName.firstName },
    process.env.JWT_SECRET,
    { expiresIn: 3000 }
  );

  res
    .status(200)
    .json({
      token: token,
      firstName: userWithFirstName.firstName,
      challenges: userWithFirstName.challenges,
      _id: userWithFirstName._id
    });
};

// GET: Authenticate user
const isAuthenticated = async (req, res) => {
  console.log("Authenticated");
};

// UPDATE: challenge isCompleted = true
const setChallengeTrue = async (req, res) => {
  const { userId, challengeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Entered id is invalid" });
  }
  if (!mongoose.Types.ObjectId.isValid(challengeId)) {
    return res.status(404).json({ error: "Entered id is invalid" });
  }

  const user = await User.updateOne(
    { _id: userId },
    { $set: { "challenges.$[element].isCompleted": true } },
    { arrayFilters: [{ "element._id": challengeId }] }
  );

  res.status(200).json(user);
};

// UPDATE: challenge isCompleted = false
const setChallengeFalse = async (req, res) => {
  const { userId, challengeId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Entered id is invalid" });
  }
  if (!mongoose.Types.ObjectId.isValid(challengeId)) {
    return res.status(404).json({ error: "Entered id is invalid" });
  }

  const user = await User.updateOne(
    { _id: userId },
    { $set: { "challenges.$[element].isCompleted": false } },
    { arrayFilters: [{ "element._id": challengeId }] }
  );

  res.status(200).json(user);
};

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Valid id?
    idValidMongooseId(id);

    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  setChallengeTrue,
  setChallengeFalse,
  isAuthenticated,
  LoginUser,
};
