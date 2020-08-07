const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type User {
        username:String!
        name:String!
        passwordHash:String!
        id:ID!
    }

    extend type Query{
        me:User
    }
    
    extend type Mutation {
        createUser(username:String!, password:String!, name:String!):User
    }
    `
}