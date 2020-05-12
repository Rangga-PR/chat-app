require("dotenv").config();
const express = require("express");
const http = require("http");
const io = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./model/user");
const {
  joinChatRoom,
  leftChatRoom,
  getCurrentUser,
  getRoomUsers,
} = require("./helper/userhelper");

const salt = 10;
const botName = "Chat Room";

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
      .then((result) => {
        res.status(200).json({ message: "success", result });
      })
      .catch((err) => {
        if (err.code === 11000)
          res.status(400).json({ message: "username already taken" });
        else {
          res.status(500).json({ message: "failed to register" });
        }
      });
  });

  appServer.post("/signin", async (req, res) => {
    await UserModel.findOne({ username: req.body.username })
      .then((result) => {
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
      .catch((err) => {
        res.status(500).json({ message: "failed to login" });
      });
  });

  chatSocket.on("connection", (socket) => {
    socket.on("joinChat", (username) => {
      const user = joinChatRoom(socket.id, username);
      const users = getRoomUsers();

      chatSocket.emit("userPopulation", users);

      socket.emit("welcome", {
        sender: botName,
        message: `Welcome to the this Chat Room ${user.username}`,
      });

      socket.broadcast.emit("userJoined", {
        sender: botName,
        message: `${user.username} has joined the Chat`,
      });
    });

    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      console.log(user);
      chatSocket.emit("message", { sender: user.username, message: msg });
    });

    socket.on("disconnect", () => {
      const user = leftChatRoom(socket.id);
      if (user) {
        chatSocket.emit("userLeft", {
          sender: botName,
          message: `${user.username} has left the chat`,
        });
      }

      const users = getRoomUsers();
      chatSocket.emit("userPopulation", users);
    });
  });

  appServer.listen(process.env.PORT || 3000, () => {
    console.log("app server is running");
  });

  chatServer.listen(process.env.CHAT_PORT || 3001, () => {
    console.log("chat server is running");
  });
})();
