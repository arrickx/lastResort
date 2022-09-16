const { query } = require('express');
const db = require('../models/projectModels');

const projectController = {};
projectController.test = (req, res, next) => {
  const sqlQuery = `SELECT * from public.user`
  db.query(sqlQuery)
    .then(data => {
      res.locals.data = data
      next();
    })
}

module.exports = projectController;