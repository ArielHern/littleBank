const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    scalar Date

    type Transaction {
        date: Date
        amount: Float!
        type: String!
        memo: String
        owner: User!
        id: ID!
      }

    extend type Query {
        transactions(cursor: String, limit: Int):[Transaction!]!   
    }
      
      extend type Mutation {
        createTrasaction(amount: Float!, type: String!, memo: String): Transaction
      }
      
      extend type Subscription {
        transactionChanged: Transaction!
      }      
    `
}