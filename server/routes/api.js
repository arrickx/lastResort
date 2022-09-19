require("dotenv").config();

const express = require("express");

const { testController } = require("../controllers/projectController");
const { checkDuplicate, signup } = require("../controllers/signupController");
const { validateLogin } = require("../controllers/loginController");
const { setSSIDCookie } = require("../controllers/cookieController");
const { isLoggedIn } = require("../controllers/sessionController");

const router = express.Router();

router.get("/", isLoggedIn, testController, (req, res) =>
  res.status(200).json([...res.locals.data.rows])
);

router.post("/signup", checkDuplicate, signup, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.post("/login", validateLogin, setSSIDCookie, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.get("/auth", isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.data)
})

module.exports = router;
