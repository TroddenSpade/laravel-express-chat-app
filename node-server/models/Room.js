const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({});

const Room = mongoose.model("Room", RoomSchema);

module.exports = { Room };
