import React from 'react'
import { Container, Table, Button } from 'semantic-ui-react'
import moment from 'moment';

import { Transaction } from '../../graphql/types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { TRANSACTIONS_HISTORY, ACCOUNT_INFO } from '../../graphql/queries';
import TransactionForm from '../transaction/TransactionForm';



const AccountDisplay: React.FC = () => {
    const [newTransaction, setNewTransactions] = React.useState<boolean>(false);

    //Get id from url
    const { id } = useParams();

    const { data, loading, fetchMore } = useQuery(TRANSACTIONS_HISTORY, {
        variables: { id }
    });

    const { data: account } = useQuery(ACCOUNT_INFO, {
        variables: { id }
    });


    const formatDateFrom = (date: Date) => {
        return moment(date).format('MM-DD-YYYY');
    }
    const buttonStyle = {
        marginBottom: "10px"
    }
    const toggleTransaction = () => {
        setNewTransactions(!newTransaction);
    }

    if (loading) return null;

    //console.log(data.transactions.pageInfo.endCursor)

    let { edges } = data.transactions

    const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
        if (
            e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
            e.currentTarget.scrollHeight
        ) {
            console.log('bottom reach');
            loadMoreTransactions()
        }

    }

    const loadMoreTransactions = () => {
        //fetchMore({
        //    variables: {
        //        cursor: data.transactions.pageInfo.endCursor
        //    },
        //    updateQuery: (previousResult: any, { fetchMoreResult }) => {
        //        //const previousEntries = previousResult.transactions.edges
        //        //const newTransactions = fetchMoreResult.transactions.edges
        //        //const newCursor = fetchMoreResult.transactions.pageInfo.endCursor

        //        //return {
        //        //    cursor: newCursor,
        //        //    edges: [...newTransactions, ...previousEntries]

        //        //};
        //        return fetchMoreResult ? fetchMoreResult : previousResult
        //    }
        //}
        //)
    }
    console.log(loadMoreTransactions());

    return (
        <div>
            {data && (
                <Container fluid>
                    <h2>{account?.accountInfo.name}</h2>
                    <hr />
                    <h5>Balance: ${account?.accountInfo.balance}</h5>
                    {newTransaction ? null : <Button onClick={toggleTransaction} style={buttonStyle} size="small" color="teal">New Transaction</Button>}

                    {newTransaction ? <TransactionForm toggleTransaction={toggleTransaction} id={id} /> : null}
                    <Container>
                        <div style={{ width: "100%", height: "200px", overflow: "hidden" }} >
                            {data ? (
                                <div style={{ height: "200px", overflowY: "scroll", marginRight: "-30px" }} onScroll={handleScroll}>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Date</Table.HeaderCell>
                                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                                <Table.HeaderCell>Type</Table.HeaderCell>
                                                <Table.HeaderCell>Description</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {edges?.map((transaction: Transaction, index: number) =>
                                            (
                                                <React.Fragment key={index}>
                                                    <Table.Body>
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
                                                </React.Fragment>
                                            )
                                        )
                                        }
                                    </Table>
                                </div>
                            )
                                : <div> No Transactions</div>}
                        </div>
                    </Container>
                </Container >
            )}

        </div >
    )
}

export default AccountDisplay;