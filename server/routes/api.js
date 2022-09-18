const express = require("express");

const { testController } = require("../controllers/projectController");
const { checkDuplicate, signup } = require("../controllers/signupController");
const { validateLogin } = require("../controllers/loginController");
const { setCookie } = require("../controllers/cookieController")

const router = express.Router();

router.get("/", testController, (req, res) =>
  res.status(200).json([...res.locals.data.rows])
);

router.post("/signup", checkDuplicate, signup, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.post("/login", validateLogin, setCookie, (req, res) =>
  res.status(200).json(res.locals.data)
);

module.exports = router;
