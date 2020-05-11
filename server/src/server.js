require("dotenv").config();
const express = require("express");
const http = require("http");
const io = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user");

const salt = 10;

(async () => {
  const appServer = express();
  const chatServer = http.createServer(appServer);
  const chatSocket = io(chatServer);

  appServer.use(cors());
  appServer.use(bodyParser.urlencoded({ extended: false }));
  appServer.use(bodyParser.json());

  await mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  appServer.post("/signup", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new UserModel({
      username: req.body.username,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(result => {
        res.status(200).json({ message: "success", result });
      })
      .catch(err => {
        if (err.code === 11000)
          res.status(400).json({ message: "username already taken" });
        else {
          res.status(500).json({ message: "failed to register" });
        }
      });
  });

  appServer.post("/signin", async (req, res) => {
    await UserModel.findOne({ username: req.body.username })
      .then(result => {
        if (!result) {
          res.status(404).json({ message: "this user is not found" });
        } else {
          bcrypt.compare(req.body.password, result.password, (err, valid) => {
            valid
              ? res.status(200).json({ message: "success", result })
              : res.status(400).json({ message: "incorrect password" });
          });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "failed to login" });
      });
  });

  chatSocket.on("connection", socket => {
    socket.on("userEnter", user => {
      socket.emit("welcome", {
        sender: "Chat Room",
        message: `Welcome to the this Chat Room ${user}`,
      });

      socket.broadcast.emit("userJoined", {
        sender: "Chat Room",
        message: `${user} has joined the Chat`,
      });
    });

    socket.on("chatMessage", msg => {
      chatSocket.emit("message", msg);
    });
  });

  appServer.listen(3000, () => {
    console.log("server is running on port 3000");
  });

  chatServer.listen(3001, () => {
    console.log("chat server is running on port 3001");
  });
})();
