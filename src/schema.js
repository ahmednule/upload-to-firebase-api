import { gql } from "apollo-server-express";
import userResolvers from "./resolvers/userResolvers.js";

const typeDefs = gql`
  type User{
    id: Int!
    email: String!
    name: String
    password: String
  } 

  type AuthPayLoad{
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: Int!): AuthPayLoad
  }

  type Mutation {
    signup(email: String!, name: String, password: String!): AuthPayLoad
    login(email: String!, password: String!): AuthPayLoad
  }
`

export const resolvers = {
    Query: {
        ...userResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}

export default typeDefs