const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type Account {
        balance:Float!
        name:String!
        owner:User!
        transactions:[Transaction!]!   
        id:ID!
    }

    extend type Query{
        accountInfo(id:String!): Account!
    }
    
    extend type Mutation{
        createAccount(balance:Int!, name:String!):Account!
        deposit(id:String!, amount:Float!, memo:String):Account
        spend(id:String!, amount:Float!, memo:String):Account        
    }
    extend  type Subscription{
        balanceChanged:Account!
    }
    `
}