const db = require("../models/projectModels");

const projectController = {};

projectController.testController = (req, res, next) => {
  const text = `SELECT * from public.user`;
  db.query(text).then((data) => {
    res.locals.data = data;
    next();
  });
};

module.exports = projectController;
