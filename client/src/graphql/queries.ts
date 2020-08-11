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

export const DEPOSIT = gql`
mutation deposit($amount:Float!){
    deposit(amount:$amount){
        balance
    }
}
`


export const SPEND = gql`
mutation spend($amount:Float!){
    spend(amount:$amount){
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