const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('hello', 'world');
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
}

cookieController.setSSIDCookie = async(req, res, next) => {
  // console.log('setSSIDCookie .env ->',process.env.PRIVATE_KEY) // print the key
  const ssid = jwt.sign({username: req.body.username}, process.env.PRIVATE_KEY, { expiresIn: 10 });
  console.log(ssid);
}
module.exports = cookieController;