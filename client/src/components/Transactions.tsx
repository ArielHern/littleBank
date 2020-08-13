import React from 'react'
import { Container, Table } from 'semantic-ui-react'
import moment from 'moment';

import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { TRANSACTIONS_HISTORY, TRANSACTION_CHANGED } from '../graphql/queries';

interface ITransaction {
    date: Date,
    amount: number,
    type: string,
    memo: string
    id: string,
}

const Transactions: React.FC = () => {

    const { loading, data, error } = useQuery(TRANSACTIONS_HISTORY);

    //Update cached
    const client = useApolloClient()
    const updateCacheWith = (addedTransaction: ITransaction) => {
        const includedIn = (set: ITransaction[], object: ITransaction) =>
            set.map((b: { id: string; }) => b.id).includes(object.id)

        const dataInStore = client.readQuery({ query: TRANSACTIONS_HISTORY })
        if (!includedIn(dataInStore.me.transactions, addedTransaction)) {
            client.writeQuery({
                query: TRANSACTIONS_HISTORY,
                data: { me: dataInStore.me.transactions.concat(addedTransaction) }
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
            <br />
            <h3>Transactions history</h3>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {data.me.transactions.map((transaction: ITransaction, index: any) => {
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
