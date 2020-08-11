import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Container } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import TransactionForm from './components/TransactionForm';
import { BALANCE, BALANCE_CHANGED } from './graphql/queries';


function App() {
    const [token, setToken] = React.useState<string>('');
    const { loading, error } = useQuery(BALANCE, {
        onCompleted: (data) => setAccountBalance(data.balance)
    })
    const [AccountBalance, setAccountBalance] = React.useState(0);

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
    if (loading) {
        return <h1>loading...</h1>
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <Container textAlign="left"><h1>{`Balance: $${AccountBalance}`}</h1></Container>
            <TransactionForm />
        </div>

    );

}



export default App;
