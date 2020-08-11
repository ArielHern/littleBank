const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    type Account {
        balance:Float!
        owner:User!
        id:ID!
    }

    extend type Query{
        balance:Float!
    }
    
    extend type Mutation{
        createAccount(balance:Int!):Account
        deposit(amount:Float!):Account
        spend(amount:Float!):Account        
    }
    extend  type Subscription{
        balanceChanged:Account!
    }
    `
}