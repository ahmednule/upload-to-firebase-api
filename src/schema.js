import { gql } from "apollo-server-express";

const typeDefs = gql`
type User{
    id: ID!
    email: String!
    name: String
    password:String
} 
`