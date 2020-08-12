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
query {
    me {
      transactions {
        date
        amount
        type
        memo
        id
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

