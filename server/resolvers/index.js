const { merge } = require('lodash')

const { resolvers: userResolvers } = require('./user');
const { resolvers: accountResolvers } = require('./account');
const { resolvers: tokenResolvers } = require('./token');
const { resolvers: transactionResolvers } = require('./transaction');


const resolvers = merge(
    userResolvers,
    accountResolvers,
    tokenResolvers,
    transactionResolvers,
)

module.exports = {
    resolvers
}