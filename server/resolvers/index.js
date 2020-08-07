const { merge } = require('lodash')

const { resolvers: userResolvers } = require('./user');
const { resolvers: accountResolvers } = require('./account');
const { resolvers: tokenResolvers } = require('./token');


const resolvers = merge(
    userResolvers,
    accountResolvers,
    tokenResolvers
)

module.exports = {
    resolvers
}