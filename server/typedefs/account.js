const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type Account {
        balance:Int!
        owner:User!
        id:ID!
    }

    extend type Query{
        balance:Int!
    }
    
    extend type Mutation{
        createAccount(balance:Int!):Account
        deposit(amount:Int!):Account
        spend(amount:Int!):Account        
    }
    `
}