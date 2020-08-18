import { useMutation } from '@apollo/client';
import React from 'react';
import { Button, Container, Divider, Form, FormProps, TextArea, DropdownProps } from 'semantic-ui-react';
import { DEPOSIT, SPEND } from '../../graphql/queries';

interface Transaction {
    amount: number;
    transactionType: string;
    memo: string
}

const TransactionForm: React.FC = () => {
    const [deposit] = useMutation(DEPOSIT)
    const [spend] = useMutation(SPEND)
    const [transactionType, setTransactionType] = React.useState('')
    const [memo, setMemo] = React.useState('')
    const [amount, setAmount] = React.useState(0)


    const options = [
        { key: 'd', text: 'Deposit', value: 'deposit' },
        { key: 's', text: 'Spend', value: 'spend' },
    ]


    const handleTransaction = (e: React.SyntheticEvent<HTMLElement>, data: any): void => {
        e.preventDefault();
        setTransactionType(data.value);

    }

    const handleMemo = (e: React.FormEvent<HTMLTextAreaElement>, data: any): void | undefined => {
        e.preventDefault();
        setMemo(data.value);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        switch (transactionType) {
            case 'deposit':
                deposit({ variables: { amount, memo } });
                break;
            case 'spend':
                spend({ variables: { amount, memo } });
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        e.preventDefault()
        setMemo('');
        setTransactionType('');
        setAmount(0);

    }

    return (
        <Container textAlign='left'>
            <Divider />
            <Form onSubmit={handleFormSubmit}>
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
            <Button type="submit" color="green" onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default TransactionForm;