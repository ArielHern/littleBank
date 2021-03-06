const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type User {
        username:String!
        name:String!
        passwordHash:String! 
        accounts:[Account!]!   
        id:ID!
    }

    extend type Query{
        me:User
    }
    `
}