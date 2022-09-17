const db = require("../models/projectModels");

const loginController = {};

loginController.validateLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `SELECT * from public.user WHERE username = $1`;
  const values = [username];

  const output = await db.query(text, values);
  const authPassword = output.rows[0].password;

  // check if username exist
  if (output.rows.length !== 0) {
    // console.log(output.rows); // contain username and password info
    if (password === authPassword) {
      console.log("password match");
      res.locals.data = req.body;
      next();
    } else {
      console.log("password NOT match !");
      return res.sendStatus(406);
    }
  } else {
    console.log("invalid username");
    return res.sendStatus(406); // return stops the rest of the middleware
  }
};

module.exports = loginController;
