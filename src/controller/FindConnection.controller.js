const express = require("express");
const router = express.Router();
const io = require("../middleware/Socket.middleware");

const {
  findNearbyUsers,
  addUser,
  removeUser,
  getUser,
  emitFindNearbyUsersSuccess,
} = require("../utils/handleUsers");

const User = require("../model/User");
const Room = require("../model/Room");
const connections = require("../utils/connections");

io.on("connection", (socket) => {
  socket.on("enter-name", ({ name, location }) => {
    console.log("hello");
    const user = new User(socket.id, name, location);
    addUser(user);
  });

  socket.on("start-application", ({ name, location }) => {
    console.log("start-application");
    const user = new User(socket.id, name, location);
    addUser(user);
    // notify nearby users that a new user has joined
    const nearbyUsers = findNearbyUsers(user, (nearbyUser) => {
      socket.to(nearbyUser.id).emit("add-user", user);
    });
    emitFindNearbyUsersSuccess(socket, nearbyUsers);
  });

  socket.on("find-nearby-users", () => {
    const nearbyUsers = findNearbyUsers(getUser(socket.id));
    console.log(nearbyUsers);
  });

  socket.on("leave-session", () => {
    console.log("leave-session");
    removeUser(socket);
  });

  socket.on("create-connection", ({ receiver }) => {
    const user = getUser(receiver.id);
    if (connections[socket.id]) {
      connections[socket.id].add(user);
    }
    connections[socket.id] = [user];

    socket.emit("create-room-success");
  });

  socket.on("close-room", (userId) => {
    if (connections?.length === 1) {
      delete connections[socket.id];
    } else {
      connections[socket.id] = connections[socket.id].filter(
        (user) => user.id !== userId
      );
    }
  });

  socket.on("send-file", ({ selectedUsers, file }) => {
    // connections[socket.id].forEach((person) => {
    //   socket.to(person.id).emit("receive-file", { file: file });
    // });

    selectedUsers.forEach((person) => {
      socket.to(person.id).emit("receive-file", { file: file });
    });
  });

  socket.on("share-page", ({ selectedUsers, page }) => {
    console.log(selectedUsers, page);
    selectedUsers.forEach((user) => {
      socket.to(user.id).emit("receive-page", { page: page });
    });
  });
  // socket._onclose();
});

module.exports = router;
