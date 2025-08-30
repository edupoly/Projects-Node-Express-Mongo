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
});
app.get("/incCount", (req, res) => {
  liveCount++;
  io.emit("liveCount", { liveCount });
  res.send("Count Inc");
});
server.listen(3900, () => {
  console.log("running on " + 3900);
});
