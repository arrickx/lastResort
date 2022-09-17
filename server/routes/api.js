const express = require("express");

const { testController } = require("../controllers/projectController");
const { checkDuplicate, signup } = require("../controllers/signupController");

const router = express.Router();

router.get("/", testController, (req, res) =>
  res.status(200).json([...res.locals.data.rows])
);

router.post("/signup", checkDuplicate, signup, (req, res) =>
  res.status(200).json(res.locals.data)
);

module.exports = router;
