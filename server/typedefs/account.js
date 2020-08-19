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
        balance:Float!
    }
    
    extend type Mutation{
        createAccount(balance:Int!, name:String!):Account!
        deposit(name: String!, amount:Float!, memo:String):Account
        spend(name: String!, amount:Float!, memo:String):Account        
    }
    extend  type Subscription{
        balanceChanged:Account!
    }
    `
}