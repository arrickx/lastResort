const db = require("../models/projectModels");

const pageController = {};

pageController.newPost = (req, res , next) => {
  const {title, text, user_id} = req.body
  // console.log(req.body);
  // console.log('title ->', title);
  // console.log('text ->',text);
  // console.log('user_id ->',user_id);

  const sql = `INSERT INTO public.post(title, text, user_id) VALUES($1, $2, $3) RETURNING *`;
  const values = [title, text, user_id];
  db.query(sql, values)
    .then((data) => {
      console.log(data.rows[0]);
      res.locals.data = data.rows[0];
      next();
    })
    .catch((e) => {
      console.log("error message catched", e);
      return res.status(406).json(e);
    });

  res.locals.data = req.body;
  return next();
}

module.exports = pageController;