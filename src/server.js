const express = require("express");
const bodyParser = require("body-parser");

const appServer = express();

appServer.use(bodyParser.json);

appServer.post("/signup", (req, res) => {
  res.json(req.body);
});

appServer.get("/login", (req, res) => {
  res.json(req.body);
});

appServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
