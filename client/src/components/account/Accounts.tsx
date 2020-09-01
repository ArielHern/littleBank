import React from 'react'
import { Container, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Account } from '../../graphql/types';

const Accounts: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
    return (
        <div>
            {accounts.map((acc) =>
                <div key={acc.name}>
                    <Container>
                        <b><Link to={`/accounts/${acc.id}`}>{acc.name}</Link></b> - ${acc.balance}
                    </Container>

                </div>

            )}
            <div>
                <Table basic="very" celled style={{ width: "400px", height: "100px", marginTop: "20px" }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Last Transactions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {accounts.map((acc) =>
                        acc.transactions.slice(0, 4).map((transaction: any, index: number) =>
                            (
                                <React.Fragment key={index}>
                                    <Table.Body >
                                        <Table.Row key={transaction.id}>
                                            <Table.Cell>{transaction.amount}</Table.Cell>
                                            <Table.Cell>{transaction.type}</Table.Cell>
                                            {transaction.memo
                                                ? <Table.Cell>{transaction.memo}</Table.Cell>
                                                : <Table.Cell></Table.Cell>
                                            }
                                        </Table.Row>
                                    </Table.Body>
                                </React.Fragment>
                            )
                        )
                    )}
                </Table>
            </div>
        </div>

    )
}

export default Accounts;

