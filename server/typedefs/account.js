const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type Account {
        balance:Int!
        owner:User!
        id:ID!
    }

    extend type Query{
        bankBalance(owner:String!):Int!
    }
    
    extend type Mutation{
        createAccount(balance:Int!, owner:String!):Account
        deposit(amount:Int!, owner:String!):Account
        spend(amount:Int!, owner:String!):Account        
    }
    `
}