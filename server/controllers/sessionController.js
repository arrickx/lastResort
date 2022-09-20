const jwt = require("jsonwebtoken");
const sessionController = {};

sessionController.setSSID = async(req, res, next) => {
  // console.log('id from signup ->', res.locals.id);
  // console.log('setSSIDCookie .env ->',process.env.PRIVATE_KEY) // print the key
  const ssid = jwt.sign({username: req.body.username}, process.env.PRIVATE_KEY, { expiresIn: '1h' }); // 10 sec
  
  res.cookie('ssid', ssid, { httpOnly: true, secure: true});
  res.cookie('user_id', res.locals.id, { secure: true});
  res.locals.ssid = ssid;

  return next();
}

sessionController.isLoggedIn = async (req, res, next) => {
  jwt.verify(req.cookies.ssid, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.status(400).json("token exipired");
        return res.status(401).json("sorry token not verified");
      }

      res.locals.data = 'is logged in!';
      return next();
    }
  );
};

sessionController.removeSSID = (req, res, next) => {
  res.clearCookie('ssid')
  res.clearCookie('user_id')
  res.locals.data = 'logout successfuly'
  return next();
}

module.exports = sessionController;
