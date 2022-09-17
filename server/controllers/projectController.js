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

projectController.checkDuplicate = (req, res, next) => {
  const {username} = req.body;
  const text = `SELECT * from public.user WHERE username = $1`;
  const values = [username];
  db.query(text, values).then(data => {
    if (data.rows.length ===0) {
      console.log('not duplicate->', username);
      res.locals.data = req.body; // set the req.body send it back to api
      next();
    } else {
      console.log('is duplicate->', username);
      return res.sendStatus(406); // return stops the rest of the middleware
    }
  });
}
module.exports = projectController;
