const { gql } = require('apollo-server');

module.exports = {
    typeDefs: gql`
    type Account {
        balance:Int!
        owner:User!
        id:ID!
    }

    extend type Query{
        accountBalance:Int!
    }
    
    extend type Mutation{
        deposit(amount:Int!):Account
        spend(amount:Int!):Account        
    }
    `
}