const express = require("express");

const projectController = require("../controllers/projectController");
const signupController = require("../controllers/signupController")

const router = express.Router();

router.get("/", projectController.test, (req, res) =>
  res.status(200).json([...res.locals.data.rows])
);

router.post("/signup",signupController.checkDuplicate, signupController.signup, (req, res) => 
  res.status(200).json(res.locals.data)
);

module.exports = router;
