const { query } = require("express");
const db = require("../models/projectModels");

const projectController = {};

projectController.test = (req, res, next) => {
  const text = `SELECT * from public.user`;
  db.query(text).then(data => {
    res.locals.data = data;
    next();
  });
};

projectController.signup = (req, res, next) => {
  const {username, password} = req.body;
  const text = `INSERT INTO public.user(username, password) VALUES($1, $2) RETURNING *`;
  const values = [username,password];
  db.query(text, values).then(data => {
    res.locals.data = data;
    next();
  });
};

module.exports = projectController;
