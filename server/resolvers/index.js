const { merge } = require('lodash')

const { resolver: userResolvers } = require('./user')
const { resolver: accountResolvers } = require('./account')


const resolvers = merge(
    userResolvers,
    accountResolvers
)

module.exports = {
    resolvers
}