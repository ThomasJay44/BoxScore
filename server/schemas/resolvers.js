const NBA = require("../models/NBA");
const MLB = require("../models/MLB");
const request = require("request-promise");

module.exports = {
  Query: {
    createNBAData: async (root, args, ctx) => {
      const nbaUrl =
        "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";
      const nbaData = await request({ url: nbaUrl, json: true });

      const newNBA = await NBA.findOneAndUpdate(
        {},
        { $set: { games: nbaData } },
        { new: true, upsert: true }
      );

      return newNBA;
    },

    createMLBData: async (root, args, ctx) => {
      const mlbUrl =
        "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json";
      const mlbData = await request({ url: mlbUrl, json: true });

      const newMLB = await MLB.findOneAndUpdate(
        {},
        { $set: { games: mlbData } },
        { new: true, upsert: true }
      );

      return newMLB;
    },
  },
};
