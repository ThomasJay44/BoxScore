const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true
  })
  .then(() => console.log("DB connected!"))
  .catch(err => console.log(err));

// Create an instance of ApolloServer with your typeDefs and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Listening on ${url}`);
});
