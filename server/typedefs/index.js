const { gql } = require('apollo-server')

const { typeDef: userTypeDef } = require('./user')
const { typeDef: accountTypeDef } = require('./account')


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
        accountTypeDef
    ]
}