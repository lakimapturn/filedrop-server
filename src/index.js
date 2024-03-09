const express = require("express");
const cors = require("cors");

const app = require("./middleware/ExpressApp.middleware");
const server = require("./middleware/Server.middleware");

const findConnection = require("./controller/FindConnection.controller");

app.get("/", (req, res) => {
  res.send("hello");
});

// const app = express();

// allow requests from any origin (so our web application can easily communicate with our server)
// app.use(cors({ origin: "*" }));

// handle JSON requests and responses nicely
// app.use(express.json());

// app.listen(8000);
