const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type User {
        name:String!
        id:ID!
    }
    
    extend type Mutation {
        createUser(name:String!):User
    }
    `
}