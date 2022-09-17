const db = require("../models/projectModels");

const signupController = {};

signupController.checkDuplicate = (req, res, next) => {
  const { username } = req.body;
  const text = `SELECT * from public.user WHERE username = $1`;
  const values = [username];
  db.query(text, values).then((data) => {
    if (data.rows.length === 0) {
      next(); // if current user not exist. move to the next middleware
    } else {
      console.log("user name is duplicate->", username);
      return res.sendStatus(406); // return stops the rest of the middleware
    }
  });
};

signupController.signup = (req, res, next) => {
  const { username, password } = req.body;
  const text = `INSERT INTO public.user(username, password) VALUES($1, $2) RETURNING *`;
  const values = [username, password];
  db.query(text, values)
    .then((data) => {
      res.locals.data = data.rows[0]; // success signup and send back to react fetch
      next();
    })
    .catch((e) => {
      console.log("error message catched", e);
      return res.status(406).json(e);
    });
};

module.exports = signupController;
