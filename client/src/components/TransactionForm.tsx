import React from 'react';
import { useMutation } from '@apollo/client'
import { Container, Divider, TextArea, Form, Button } from 'semantic-ui-react';

import { DEPOSIT, SPEND } from '../graphql/queries';


const TransactionForm: React.FC = () => {
    const [deposit] = useMutation(DEPOSIT)
    const [spend] = useMutation(SPEND)
    const [transactionType, setTransactionType] = React.useState('')
    const [amount, setAmount] = React.useState(0)

    const options = [
        { key: 'd', text: 'Deposit', value: 'deposit' },
        { key: 's', text: 'Spend', value: 'spend' },
    ]

    const handleTransaction = (e: React.SyntheticEvent<HTMLElement, Event>, data: any): void => {
        e.preventDefault();
        setTransactionType(data.value);
    }

    const handleMemo = (e: React.FormEvent<HTMLTextAreaElement>): void | undefined => {
        //setMemo(e.target.value);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        switch (transactionType) {
            case 'deposit':
                deposit({ variables: { amount } });
                break;
            case 'spend':
                spend({ variables: { amount } });
                break;
            default:
                break;
        }
    }


    return (
        <Container textAlign='left'>
            <Divider />
            <Form>
                <Form.Group widths={8}>
                    <Form.Input
                        fluid label='Amount'
                        placeholder='Amount'
                        onChange={({ target }) => setAmount(parseFloat(target.value))} />
                    <Form.Select
                        fluid
                        label='Type'
                        options={options}
                        placeholder='Type'
                        onChange={handleTransaction}
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
    )
}

export default TransactionForm;