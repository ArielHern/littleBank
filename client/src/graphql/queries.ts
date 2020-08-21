import { gql } from '@apollo/client'


export const LOGIN = gql`
mutation login($username:String!, $password:String!){
    login(username:$username, password:$password){
        value
    }
}
`

export const BALANCE = gql`
query{
    balance
}
`
export const TRANSACTIONS_HISTORY = gql`
query($cursor: String) {
    transactions(cursor: $cursor){
        edges {
            createdAt
            amount
            type
            memo
            id
        }
        pageInfo{
            endCursor
            hasNextPage
        }
    }
  }  
`
export const ME = gql`
query {
  me {
    username
    name
    accounts {
      id
      name
      balance
      transactions{
        amount
        type
        createdAt
        memo
      }
    }
  }
}

`

export const DEPOSIT = gql`
mutation deposit($amount:Float!, $memo:String){
    deposit(amount:$amount, memo:$memo){
        balance
    }
}
`

export const SPEND = gql`
mutation spend($amount:Float!, $memo:String){
    spend(amount:$amount, memo:$memo){
        balance
    }
}
`

export const BALANCE_CHANGED = gql`
 subscription {
    balanceChanged{
        balance        
    }
}
`

export const TRANSACTION_CHANGED = gql`
 subscription {
    transactionChanged{
        createdAt
        amount
        type
        memo
        id
    }
}
`
