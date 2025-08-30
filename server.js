var http = require("http");
var { Server } = require("socket.io");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
let liveViwers = 0;
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.on("disconnect", () => {
    liveViwers--;
    io.emit("liveCount", { liveViwers });
  });
  liveViwers++;
  io.emit("liveCount", { liveViwers });
  console.log("connected");
});

server.listen(3900, () => {
  console.log("running on " + 3900);
});
