import { useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import LoadingPage from './components/LoadingPage';
import LoginForm from './components/LoginForm';
import TransactionForm from './components/transaction/TransactionForm';
import Transactions from './components/transaction/Transactions';
import { BALANCE, BALANCE_CHANGED } from './graphql/queries';


interface Balance {
    balance: number
}

function App() {
    const [token, setToken] = React.useState<string>('');
    const [showTransactions, setShowTransactions] = React.useState<boolean>(false);
    const [AccountBalance, setAccountBalance] = React.useState(0);
    const { loading, data } = useQuery<Balance>(BALANCE, {
        onCompleted: (data) => setAccountBalance(Math.round(data.balance)),
        onError: (error) => console.log(error.graphQLErrors[0].message)
    });

    React.useEffect(() => {
        const token = localStorage.getItem('littleBank-user-token')
        if (token) setToken(token)
    }, [setToken])

    useSubscription(BALANCE_CHANGED, {
        onSubscriptionData: ({ subscriptionData }) => {
            setAccountBalance(subscriptionData.data.balanceChanged.balance.toFixed(2))
        }
    })

    const showHideTransactions = () => {
        setShowTransactions(!showTransactions);
    }

    if (!token) {
        return (
            <div style={{ width: "50%", margin: "60px auto" }}>
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
            <Container>
                <div style={{ marginTop: "20px" }}>
                    <h3>Transactions history <Button
                        size="mini"
                        color={showTransactions ? "yellow" : "green"}
                        onClick={showHideTransactions}>
                        {showTransactions ? "Hide" : "View"}
                    </Button></h3>
                    {showTransactions ? <Transactions /> : null}
                </div>
            </Container>

        </div>

    );

}

export default App;
