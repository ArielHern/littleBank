import React from 'react';
import { Container, Divider, TextArea, Form, Button } from 'semantic-ui-react';

import LoginForm from './components/LoginForm';
import { formatDollarsToCents, formatCentsToDollars } from './utils';


function App() {
    const [token, setToken] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const [amount, setAmount] = React.useState(0)
    const [type, setType] = React.useState('')
    const [balance, setBalance] = React.useState(15000)
    const [memo, setMemo] = React.useState('')


    React.useEffect(() => {
        const token = localStorage.getItem('littleBank-user-token')
        if (token) setToken(token)
    }, [])


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

    const handleDropdown = (e: any, data: any) => {
        setType(data.value)
    }
    const handleMemo = (e: any, data: any) => {
        setMemo(data.value)
    }
    const handleSubmit = () => {
        bankTransaction(amount, type)
    }

    const cashBalance = () => {
        return formatCentsToDollars(balance);
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
            <Container textAlign="left"><b>Balance:${cashBalance()}</b></Container>
            <Container textAlign='left'>
                <Form>
                    <Form.Group widths={8}>
                        <Form.Input fluid label='Amount' placeholder='Amount' onChange={({ target }) => setAmount(parseFloat(target.value))} />
                        <Form.Select
                            fluid
                            label='Type'
                            options={options}
                            placeholder='Type'
                            onChange={handleDropdown}
                        />
                    </Form.Group>
                    <TextArea
                        style={{ width: "300px" }}
                        rows={2}
                        placeholder='Memo (optional)'
                        onChange={handleMemo}
                    />
                </Form>
                <Divider />
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </Container>


        </div>
    );

}



export default App;
