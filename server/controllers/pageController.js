const db = require("../models/projectModels");

const pageController = {};

pageController.newPost = (req, res , next) => {
  console.log(req.body);
  
  res.locals.data = req.body;
  return next();
}

module.exports = pageController;