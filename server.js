var http = require("http");
var { Server } = require("socket.io");
var express = require("express");
var app = express();
var cors = require("cors");
var server = http.createServer(app);
app.use(cors());
var io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let users = {};
app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.on("messageVachindi", function (msg) {
    console.log(msg);
    users[socket.id] = msg.username;
    msg.users = users;
    io.emit("messageVachindi", msg);
  });
  socket.on("disconnect", function (msg) {
    let leftusername = users[socket.id];
    delete users[socket.id];
    io.emit("messageVachindi", {
      message: "Disconnected",
      username: leftusername,
      users,
    });
  });
  socket.on("personalChat", function (msg) {
    console.log(msg);
    console.log(socket.id);
    io.to(msg.socid).emit("personalMessage", { ...msg, senderId: socket.id });
  });
});

server.listen(3900, () => {
  console.log("running on " + 3900);
});
