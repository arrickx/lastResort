const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
}

app.use("/api", apiRouter);

app.listen(3000);
