import React from 'react'
import { Container, Table } from 'semantic-ui-react'
import moment from 'moment';

import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { TRANSACTIONS_HISTORY, TRANSACTION_CHANGED } from '../graphql/queries';

interface Transaction {
    date: Date,
    amount: number,
    type: string,
    memo: string
    id: string,
}

interface TransactionData {
    transactions: Transaction[]
}

const Transactions: React.FC = () => {

    const { data, loading, error } = useQuery<TransactionData>(TRANSACTIONS_HISTORY);

    //Update cached
    const client = useApolloClient()
    const updateCacheWith = (addedTransaction: Transaction) => {
        const includedIn = (set: Transaction[], object: Transaction) =>
            set.map((b) => b.id).includes(object.id)

        const dataInStore = client.readQuery({ query: TRANSACTIONS_HISTORY })
        if (!includedIn(dataInStore.transactions, addedTransaction)) {
            client.writeQuery({
                query: TRANSACTIONS_HISTORY,
                data: { transactions: dataInStore.transactions.concat(addedTransaction) }
            })
        }
    }

    useSubscription(TRANSACTION_CHANGED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedTransaction = subscriptionData.data.transactionChanged
            updateCacheWith(addedTransaction)

        }
    })


    const formatDateFrom = (date: Date) => {
        return moment(date).format('MM-DD-YYYY');
    }

    if (loading) return <h1>loading...</h1>
    return (

        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {data?.transactions.map((transaction: Transaction, index: any) => {
                    return (
                        <Table.Body key={index}>
                            <Table.Row key={transaction.id}>
                                <Table.Cell >{formatDateFrom(transaction.date)}</Table.Cell>
                                <Table.Cell>{transaction.amount}</Table.Cell>
                                <Table.Cell>{transaction.type}</Table.Cell>
                                {transaction.memo
                                    ? <Table.Cell>{transaction.memo}</Table.Cell>
                                    : <Table.Cell></Table.Cell>
                                }

                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>
        </Container>

    )

}
export default Transactions
