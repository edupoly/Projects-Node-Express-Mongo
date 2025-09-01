var http = require("http");
var { Server } = require("socket.io");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
let liveCount = 0;
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.emit("liveCount", { liveCount });
  console.log("connected");
  socket.on("incCount", (socket) => {
    console.log("Socket based counter increment");
    liveCount++;
    io.emit("liveCount", { liveCount });
  });
});

server.listen(3900, () => {
  console.log("running on " + 3900);
});
