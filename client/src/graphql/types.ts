

export interface User {
    username: string,
    name: string,
    passwordHash: string,
    accounts: Account[],
    id: string
}

export interface Account {
    balance: number,
    name: string,
    owner: User,
    transactions: Transaction[],
    id: string,
}

export interface Transaction {
    createdAt: Date,
    amount: number,
    type: string,
    memo: String,
    forAccount: Account,
    id: string
}