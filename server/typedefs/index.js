const { gql } = require('apollo-server');

const { typeDef: userTypeDef } = require('./user');
const { typeDef: accountTypeDef } = require('./account');
const { typeDef: tokenTypeDef } = require('./token');
const { typeDef: transactionTypeDef } = require('./transaction');

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`
const Subscription = gql`
  type Subscription {
    _empty: String
  }
`

module.exports = {
    typeDefs: [
        Query,
        Mutation,
        Subscription,
        userTypeDef,
        accountTypeDef,
        tokenTypeDef,
        transactionTypeDef
    ]
}