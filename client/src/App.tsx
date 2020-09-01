import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Container } from 'semantic-ui-react';
import LoadingPage from './components/LoadingPage';
import LoginForm from './components/LoginForm';
import { ME, BALANCE_CHANGED } from './graphql/queries';

import { User } from './graphql/types';
import NavBar from './components/navigation/NavBar';

interface IMe {
    me: User
}

function App() {
    const [token, setToken] = React.useState<string>('');
    const [AccountBalance, setAccountBalance] = React.useState(0);
    //const { loading, data } = useQuery<Balance>(BALANCE, {
    //    onCompleted: (data) => setAccountBalance(Math.round(data.balance)),
    //    onError: (error) => console.log(error.graphQLErrors[0].message)
    //});

    const { data, loading } = useQuery<IMe>(ME)


    React.useEffect(() => {
        const token = localStorage.getItem('littleBank-user-token')
        if (token) setToken(token)
    }, [setToken])

    useSubscription(BALANCE_CHANGED, {
        onSubscriptionData: ({ subscriptionData }) => {
            setAccountBalance(subscriptionData.data.balanceChanged.balance.toFixed(2))
        }
    })


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
        <Container>
            <NavBar />
        </Container>

    );

}

export default App;
