import { ApolloServer, gql } from "apollo-server-express";
import typeDefs, {resolvers} from "./src/schema.js";
import bcrypt from "bcryptjs";
import prisma from "./src/context.js";
import jwt from "jsonwebtoken"
import express from "express"

async function startServer() {
  const app = express()

  const server = new ApolloServer({
      typeDefs, resolvers
  })

  await server.start();
  
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error("Error starting the server:", err);
});