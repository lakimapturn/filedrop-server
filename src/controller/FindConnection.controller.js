const express = require("express");
const router = express.Router();
const io = require("../middleware/Socket.middleware");

const {
  findNearbyUsers,
  addUser,
  removeUser,
  getUser,
} = require("../utils/handleUsers");

const User = require("../model/User");

io.on("connection", (socket) => {
  socket.on("enter-name", ({ name, location }) => {
    console.log("hello");
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

module.exports = router;
