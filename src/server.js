require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

(async () => {
  const appServer = express();
  appServer.use(bodyParser.urlencoded({ extended: false }));
  appServer.use(bodyParser.json());

  await mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  appServer.post("/signup", (req, res) => {
    res.json(req.body);
  });

  appServer.post("/signin", (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

  appServer.listen(3000, () => {
    console.log("server is running on port 3000");
  });
})();
