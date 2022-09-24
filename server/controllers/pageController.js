const db = require("../models/projectModels");

const pageController = {};

pageController.getAllPosts = (req, res, next) => {
  const text = `SELECT * FROM public.post WHERE create_time > NOW() - interval '2 hours' ORDER BY (_id) desc`;
  db.query(text).then((data) => {
    res.locals.data = data.rows;
    next();
  });
};

pageController.newPost = (req, res, next) => {
  const { title, text, user_id } = req.body;
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
};

pageController.getPost = (req, res, next) => {
  const text = `SELECT * FROM public.post WHERE _id=$1`;
  const values = [req.params.id];
  // console.log('post id from request ->',req.params.id)
  db.query(text, values).then((data) => {
    res.locals.data = data.rows;
    next();
  });
  // res.locals.data = req.body;
  // return next();
};

pageController.updatePost = (req, res, next) => {
  const { title, text, post_id, creator, currentUserId } = req.body;
  // console.log('title ->', title);
  // console.log('text ->',text);
  // console.log('post_id ->',post_id);
  // console.log('creator ->',creator);
  // console.log('currentUserId ->',currentUserId);
  const sql = `UPDATE public.post SET title=$1, text=$2 WHERE _id=$3 RETURNING *`;
  const values = [title, text, post_id];

  if (creator !== currentUserId && currentUserId !== null) res.status(401).json('unable to edit');
  db.query(sql, values).then((data) => {
    res.locals.data = data.rows;
    next();
  });

};

pageController.deletePost = (req, res, next) => {
  const { post_id, creator, currentUserId } = req.body;
  // console.log("creator ->", creator);
  // console.log("currentUserId ->", currentUserId);
  // console.log("post_id ->", post_id);
  if (creator !== currentUserId && currentUserId !== null) res.status(401).json('unable to delete');
  const text = `DELETE FROM public.post WHERE _id=$1 RETURNING *`;
  const values = [post_id];

  db.query(text, values).then((data) => {
    if (data.rows.length !== 1) return res.sendStatus(410)
    res.locals.data = data.rows;
    next();
  });

};

module.exports = pageController;
