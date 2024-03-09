const app = require("./ExpressApp.middleware");

const server = require("http").createServer(app);

server.listen(4000);

module.exports = server;
