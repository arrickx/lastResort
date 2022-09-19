const jwt = require("jsonwebtoken");
const sessionController = {};

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

module.exports = sessionController;
