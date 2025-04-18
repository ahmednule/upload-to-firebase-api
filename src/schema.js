import { gql } from "apollo-server-express";



const typeDefs = gql`
type User{
    id: ID!
    email: String!
    name: String
    password:String
} 

type AuthPayLoad{
    token: String!
    user: User!
}
type Query{
    me: User
}
type Mutation{

}
`
export default typeDefs