const express = require("express");
const router = express.Router();

// import middleware
const { verifyJWT } = require('../middlewares/verifyJWT')

// import controllers
const { createUser,
  getAllUsers,
  getUser,
  setChallengeTrue,
  setChallengeFalse,
  isAuthenticated,
  LoginUser } = require("../controllers/UserController");
const { createChallenge, getAllChallenges } = require('../controllers/ChallengesController')

// POST a challenge
router.post("/challenge", createChallenge)

// GET all challenges
router.get("/allChallenges", getAllChallenges)

// POST a completed challenge
router.post("/newChallenge", (req, res) => {
  res.json({ message: "POST a challenge completion" });
});

// POST a new user
router.post("/user/new", createUser);

// GET user authentication
router.get("/user/authenticate", verifyJWT, isAuthenticated)

// POST login user
router.post("/user/login", LoginUser)

// GET all users
router.get("/user/getall", getAllUsers);

// GET singel user
router.get("/user/get/:id", getUser);

// UPDATE user challenge status to true
router.patch("/user/true/:userId/:challengeId", setChallengeTrue);

// UPDATE user challenge status to true
router.patch("/user/false/:userId/:challengeId", setChallengeFalse);

module.exports = router;
