require("dotenv").config();

const express = require("express");

const { testController } = require("../controllers/projectController");
const { checkDuplicate, signup } = require("../controllers/signupController");
const { validateLogin } = require("../controllers/loginController");
const { setSSID, removeSSID, isLoggedIn } = require("../controllers/sessionController");
const { newPost, getAllPosts, getPost, updatePost, deletePost } = require("../controllers/pageController")

const router = express.Router();

router.get("/", isLoggedIn, testController, (req, res) =>
  res.status(200).json([...res.locals.data.rows])
);

router.post("/signup", checkDuplicate, signup, setSSID, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.post("/login", validateLogin, setSSID, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.get("/auth", isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.get("/logout", removeSSID, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post("/new", isLoggedIn, newPost, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.get("/feed", getAllPosts, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.get("/feed/:id", getPost, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.patch("/feed/:id", updatePost, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.delete("/feed/:id", deletePost, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
