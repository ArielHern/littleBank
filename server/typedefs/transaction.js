const { gql } = require('apollo-server');

module.exports = {
    typeDef: gql`
    scalar Date

    type Transaction {
        date: Date
        amount:Float!
        type:String!
        memo:String
        owner:User!
    }
    
    extend type Mutation{
        createTrasaction(
            amount:Float!
            type:String!
            memo:String
        ):Transaction

    }
    `
}