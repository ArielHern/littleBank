import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Container } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import TransactionForm from './components/TransactionForm';
import LoadingPage from './components/LoadingPage';
import Transaction from './components/Transactions';

import { BALANCE, BALANCE_CHANGED } from './graphql/queries';
import Transactions from './components/Transactions';


function App() {
    const [token, setToken] = React.useState<string>('');
    const [AccountBalance, setAccountBalance] = React.useState(0);

    const { loading, data, error } = useQuery(BALANCE, {
        onCompleted: (data) => setAccountBalance(data.balance),
        onError: (error) => console.log(error.graphQLErrors[0].message)
    });

    React.useEffect(() => {
        const token = localStorage.getItem('littleBank-user-token')
        if (token) setToken(token)
    }, [setToken])

    useSubscription(BALANCE_CHANGED, {
        onSubscriptionData: ({ subscriptionData }) => {
            setAccountBalance(subscriptionData.data.balanceChanged.balance)
        }
    })

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm
                    setToken={setToken}
                />
            </div>
        )
    }
    if (loading && !data) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <Container textAlign="left"><h1>{`Balance: $${AccountBalance}`}</h1></Container>
            <TransactionForm />
            <Transactions />
        </div>

    );

}

export default App;
