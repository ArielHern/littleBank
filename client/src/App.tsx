import React from 'react';
import { useQuery } from '@apollo/client'

import { BALANCE } from './graphql/queries';

import { Container } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import TransactionForm from './components/TransactionForm'
import { formatDollarsToCents, formatCentsToDollars } from './utils';


function App() {
    const [token, setToken] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const { loading, data, error } = useQuery(BALANCE)

    const [balance, setBalance] = React.useState(15000)
    const [memo, setMemo] = React.useState('')


    React.useEffect(() => {
        const token = localStorage.getItem('littleBank-user-token')
        if (token) setToken(token)
    }, [setToken])


    const options = [
        { key: 'd', text: 'Deposit', value: 'deposit' },
        { key: 's', text: 'Spend', value: 'spend' },
    ]

    const bankTransaction = (amount: number, type: string) => {
        switch (type) {
            case 'deposit':
                const depositAmount = formatDollarsToCents(amount);
                console.log('transaction memo', memo);
                setBalance(balance + depositAmount);
                break;
            case 'spend':
                const spendAmount = formatDollarsToCents(amount);
                setBalance(balance - spendAmount);
                console.log('transaction memo', memo);
                break;
            default:
                break;
        }
    }

    const getBalance = () => {
        if (loading) return 'loading balance...'

        return `Balance: $${data.balance}`
    }

    const notify = (message: string) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage('')
        }, 10000)
    }



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

    return (
        <div>
            <Container textAlign="left"><b>{getBalance()}</b></Container>
            <TransactionForm
                options={options}
            />
        </div>
    );

}



export default App;
