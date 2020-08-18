import React from 'react'
import { Container, Table, Button } from 'semantic-ui-react'
import moment from 'moment';

import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { TRANSACTIONS_HISTORY, TRANSACTION_CHANGED } from '../../graphql/queries';


interface PageInfo {
    hasNextPage: Boolean
    endCursor: String
}

interface Transaction {
    createdAt: Date,
    amount: number,
    type: string,
    memo: string
    id: string,
}

interface TransactionData {
    edges: Transaction[],
    pageInfo: PageInfo
}

const Transactions: React.FC = () => {
    const { loading, error, data, fetchMore } = useQuery(TRANSACTIONS_HISTORY);

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
            console.log(addedTransaction);
            //updateCacheWith(addedTransaction)
        }
    })

    const formatDateFrom = (date: Date) => {
        return moment(date).format('MM-DD-YYYY');
    }
    if (!data) return <h2>No transactions</h2>

    //extract transactions from data
    const { transactions } = data

    if (loading) return <h1>loading...</h1>

    const { edges, pageInfo } = transactions


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
                {edges.map((transaction: Transaction, index: any) => {
                    return (
                        <Table.Body key={index}>
                            <Table.Row key={transaction.id}>
                                <Table.Cell >{formatDateFrom(transaction.createdAt)}</Table.Cell>
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
            <Button disabled={!pageInfo.hasNextPage} onClick={() => {
                const { endCursor } = pageInfo

                fetchMore({
                    variables: { cursor: endCursor }
                    //updateQuery: (preResult, { fetchMoreResult }) => {
                    //    fetchMoreResult.transactions.edges = [
                    //        ...preResult.transactions.edges,
                    //        ...fetchMoreResult.transactions.edges
                    //    ]
                    //    return fetchMoreResult;

                    //}
                })
            }}>More</Button>
        </Container>

    )

}
export default Transactions
