import { gql } from '@apollo/client'


export const LOGIN = gql`
mutation login($username:String!, $password:String!){
    login(username:$username, password:$password){
        value
    }
}
`

export const ACCOUNT_INFO = gql`
query($id: String!) {
  accountInfo(id: $id) {
    balance
    name
  }
}

`
export const TRANSACTIONS_HISTORY = gql`
query($cursor: String, $id: String!) {
    transactions(cursor: $cursor, id: $id) {
    edges {
      createdAt
      amount
      type
      memo
      id
    }
    pageInfo {
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
mutation deposit($id: String!, $amount: Float!, $memo: String) {
  deposit(id: $id, amount: $amount, memo: $memo) {
    balance
  }
}
`

export const SPEND = gql`
mutation spend($id: String!, $amount: Float!, $memo: String) {
  spend(id: $id, amount: $amount, memo: $memo) {
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
