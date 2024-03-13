require("dotenv/config");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const mongoDB = process.env.CONNECTION_STRING;

const typeDefs = require("./graphQL/typeDefs.js");
const resolvers = require("./graphQL/resolvers.js");
const context = require("./graphQL/context.js");

async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res, pubsub }) => ({ req, res, pubsub }), // Add pubsub to context
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  // WebSocket server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });

  mongoose
    .connect(mongoDB)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.error(err);
    });
}
startServer();
