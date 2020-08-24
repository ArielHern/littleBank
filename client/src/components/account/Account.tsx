import React from 'react'
import { Container, Divider, Table, Button } from 'semantic-ui-react'
import moment from 'moment';

import { Transaction } from '../../graphql/types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { TRANSACTIONS_HISTORY, ACCOUNT_INFO } from '../../graphql/queries';



const AccountDisplay: React.FC = () => {
    //Get id from url
    const { id } = useParams();

    const { data, loading } = useQuery(TRANSACTIONS_HISTORY, {
        variables: { id }
    });

    const { data: account } = useQuery(ACCOUNT_INFO, {
        variables: { id }
    });


    const formatDateFrom = (date: Date) => {
        return moment(date).format('MM-DD-YYYY');
    }
    const buttonStyle = {
        marginTop: "10px"
    }

    if (loading) return null;

    return (
        <div>
            <Container>
                <hr />
                <h2>{account?.accountInfo.name}</h2>
                <hr />
                <h5>Balance: ${account?.accountInfo.balance}</h5>
                <Container>
                    <div>
                        {data ? (
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Type</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {data.transactions.edges.map((transaction: Transaction, index: number) => {
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

                        )
                            : <div> not Transactions</div>}
                    </div>
                    <Button style={buttonStyle} size="small" color="teal">New Transaction</Button>
                </Container>
            </Container >
        </div >
    )
}

export default AccountDisplay;