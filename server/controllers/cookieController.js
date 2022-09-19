const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setSSIDCookie = async(req, res, next) => {
  // console.log('setSSIDCookie .env ->',process.env.PRIVATE_KEY) // print the key
  const ssid = jwt.sign({username: req.body.username}, process.env.PRIVATE_KEY, { expiresIn: 10 }); // 10 sec
  
  res.cookie('ssid', ssid, { httpOnly: true, secure: true});

  res.locals.ssid = ssid;

  return next();
}
module.exports = cookieController;