import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./src/schema.js";
import bcrypt from "bcryptjs";
import prisma from "./src/context.js";
import jwt from "jsonwebtoken"