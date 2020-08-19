const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    scalar Date

    type Transaction {
        createdAt: Date!
        amount: Float!
        type: String!
        memo: String
        forAccount: Account!
        id: ID!
    }

    type TransactionConnection {
        edges:[Transaction!]!
        pageInfo: PageInfo!
    }

    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String!
    }

    extend type Query {
        transactions(cursor: String, limit: Int, name:String!): TransactionConnection!
    }
      
      extend type Mutation {
        createTrasaction(name:String!, amount: Float!, type: String!, memo: String): Transaction!
      }
      
      extend type Subscription {
        transactionChanged: Transaction!
      }      
    `
}