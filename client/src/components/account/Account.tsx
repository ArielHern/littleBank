import React from 'react'
import { Container, Divider, Table } from 'semantic-ui-react'
import moment from 'moment';


interface account {
    name: string,
    balance: number
}

const Account: React.FC<{ account: any }> = ({ account }) => {
    const { accounts } = account

    const formatDateFrom = (date: Date) => {
        return moment(date).format('MM-DD-YYYY');
    }


    return (
        <div>
            <Divider />
            <Container>
                {accounts.map((acc: any) =>
                    <div>
                        <h2>{acc.name}</h2>
                        <h3>Balance: ${acc.balance}</h3>

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
                                {acc.transactions.map((transaction: any, index: any) => {
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
                        </Container>
                    </div>

                )}
            </Container>

        </div>
    )
}

export default Account;