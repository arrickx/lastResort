const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('hello', 'world');
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
}

module.exports = cookieController;