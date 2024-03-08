const express = require("express");
const router = express.Router();
const { Server } = require("socket.io");

const {
  findNearbyUsers,
  addUser,
  removeUser,
  getUser,
} = require("../utils/handleUsers");

const User = require("../model/User");

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("enter-name", ({ name, location }) => {
    const user = new User(socket.id, name, location);
    addUser(user);
  });

  socket.on("find-nearby-users", () => {
    const nearbyUsers = findNearbyUsers(getUser(socket.id));
    console.log(nearbyUsers);
  });

  socket.on("leave-session", () => {
    console.log("leave-session");
    removeUser(socket.id);
  });
  // socket._onclose();
});

io.listen(4000);

module.exports = router;
