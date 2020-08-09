const app = require("express")();
const socket = require("socket.io");
const mongoose = require("mongoose");

const config = require("./config");

// mongoose.connect(config.DATABASE, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

const server = app.listen(config.PORT, () => {
  console.log("Connected on Port: " + config.PORT);
});

const io = socket(server);

io.on("connection", async (socket) => {
  socket.on("join", ({ room }) => {
    socket.join(room);
    socket.in(room).emit("get_message", socket.id + " welcome to " + room);
  });

  socket.on("send_message", ({ msg, room }) => {
    console.log({ msg, room });
    io.in(room).emit("get_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user DCed");
  });
});

app.get("/", (req, res) => {
  res.json({
    msg: "Yellowww !",
  });
});

var Redis = require("ioredis");
var redis = new Redis();
// var pub = new Redis();

redis.subscribe("laravel_database_private-create_room");

redis.on("message", function (channel, message) {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  // console.log("Receive message %s from channel %s", message, channel);
  data = JSON.parse(message)["data"];
  console.log(data);
});
