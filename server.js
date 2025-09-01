var http = require("http");
var { Server } = require("socket.io");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
let users = {};
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.on("messageVachindi", function (msg) {
    console.log(msg);
    users[socket.id] = msg.username;
    io.emit("messageVachindi", msg);
  });
  socket.on("disconnect", function (msg) {
    console.log(users[socket.id], msg);
    io.emit("messageVachindi", {
      message: "Disconnected",
      username: users[socket.id],
    });
  });
});

server.listen(3900, () => {
  console.log("running on " + 3900);
});
