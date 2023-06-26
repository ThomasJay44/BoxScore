const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NBASchema = new mongoose.Schema(
  {
    games: Schema.Types.Mixed
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("NBA", NBASchema);