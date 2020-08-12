import React from 'react'
import { Container, Table } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { TRANSACTIONS_HISTORY } from '../graphql/queries';

interface ITransaction {
    date: Date,
    amount: number,
    type: string,
    memo: string
    id: string,
}

const Transactions: React.FC = () => {

    const { loading, data, error } = useQuery(TRANSACTIONS_HISTORY);


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
                                <Table.Cell >{transaction.date}</Table.Cell>
                                <Table.Cell>{transaction.amount}</Table.Cell>
                                <Table.Cell>{transaction.type}</Table.Cell>
                                <Table.Cell>{transaction.memo}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>
        </Container>

    )

}
export default Transactions
